import { http } from "msw";
import { response } from "./utils";
import { db } from "./db";

export const handlers = [
  http.get("/project/:projectId", (req) => {
    const projectId = String(req.params.projectId);
    const project = db.project.findFirst({
      where: {
        id: {
          equals: projectId,
        },
      },
    });
    return response(project);
  }),
  http.post("/project/:projectId", (req) => {
    const projectId = String(req.params.projectId);
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
  http.get("/project/:projectId/options", (req) => {
    const projectId = String(req.params.projectId);
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
