import { HttpResponse, http } from "msw";
import { db } from "./db";
import { response } from "./utils";

interface PledgeRequestBody {
  optionId: string;
  pledgeAmount: number;
}

export const handlers = [
  http.get("/project/:projectId", ({ params }) => {
    const projectId = String(params.projectId);
    const project = db.project.findFirst({
      where: {
        id: {
          equals: projectId,
        },
      },
    });
    return response(project);
  }),
  http.post("/project/:projectId", ({ params }) => {
    const projectId = String(params.projectId);
    const project = db.project.update({
      where: {
        id: {
          equals: projectId,
        },
      },
      data: {
        isBookmarked: (prevValue: boolean) => !prevValue,
      },
    });
    return response(project);
  }),
  http.post("/project/:projectId/pledge", async ({ request, params }) => {
    const projectId = String(params.projectId);
    const body = (await request.json()) as PledgeRequestBody | null;
    if (!body || !body.optionId || typeof body.pledgeAmount !== "number") {
      return new HttpResponse("Error", { status: 500 });
    }

    db.option.update({
      where: {
        id: {
          equals: body.optionId,
        },
      },
      data: {
        amountLeft: (prevValue: number) => prevValue - 1,
      },
    });
    const project = db.project.update({
      where: {
        id: {
          equals: projectId,
        },
      },
      data: {
        funded: (prevValue: number) => prevValue + body.pledgeAmount,
      },
    });
    return response(project, { delay: 3000 });
  }),
  http.get("/project/:projectId/options", ({ params }) => {
    const projectId = String(params.projectId);
    const options = db.option.findMany({
      where: {
        projectId: {
          equals: projectId,
        },
      },
    });
    return response(options);
  }),
];
