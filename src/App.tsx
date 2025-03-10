import {
  BookmarkButton,
  Card,
  Divider,
  MobileMenu,
  Option,
  ProgressBar,
  ProjectModal,
  StatsDisplay,
} from "./components";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@radix-ui/themes";
import { formatToUSD } from "./lib/utils";
import { menu } from "./constants";
import { option as optionTypes } from "./components/Option";
import { useParams } from "react-router";

const getData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

function App() {
  const { projectId } = useParams();
  const [isBookmarkedOptimistic, setIsBookmarkedOptimistic] = useState(false);

  const project = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getData(`/project/${projectId}`),
  });
  const options = useQuery({
    queryKey: ["options", projectId],
    queryFn: () => getData(`/project/${projectId}/options`),
  });
  const mutation = useMutation({
    mutationFn: (data: { isBookmarked: boolean }) => {
      return fetch(`/project/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onMutate: ({ isBookmarked }) => {
      // Actualiza el estado de manera optimista
      setIsBookmarkedOptimistic(isBookmarked);
    },
    onError: () => {
      // Revertir el estado si hay un error
      setIsBookmarkedOptimistic((prev) => !prev);
    },
    onSettled: () => {
      // Refrescar los datos principales después de la mutación
      project.refetch();
    },
  });

  useEffect(() => {
    if (project.data?.isBookmarked !== undefined) {
      setIsBookmarkedOptimistic(project.data.isBookmarked);
    }
  }, [project.data?.isBookmarked]);

  return (
    <>
      <header className="h-[300px] w-full bg-hero-mobile bg-cover bg-top sm:bg-hero-desktop">
        <div className="bg-gradient-to-b from-black/70 to-transparent pt-8">
          <nav className="inset-0 mx-6 flex items-center justify-between xl:mx-auto xl:max-w-6xl">
            <svg width="128" height="20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.272 20c2.69 0 5.022-1.4 6.202-3.54L9.88 14.402c-.439.96-1.454 1.537-2.662 1.537-1.783 0-3.1-1.29-3.1-3.184 0-1.893 1.317-3.183 3.1-3.183 1.208 0 2.196.576 2.662 1.537l3.595-2.086c-1.18-2.113-3.54-3.512-6.202-3.512C3.101 5.51 0 8.666 0 12.755 0 16.845 3.101 20 7.272 20zm11.367-.384v-6.202c0-2.717 2.415-3.403 4.116-3.129V5.62c-1.728 0-3.567.878-4.116 2.717V5.895h-4.116v13.72h4.116zM30.116 20c4.034 0 7.272-3.156 7.272-7.245s-3.238-7.244-7.272-7.244c-4.034 0-7.272 3.155-7.272 7.244 0 4.09 3.238 7.245 7.272 7.245zm0-4.007c-1.784 0-3.156-1.29-3.156-3.238s1.372-3.238 3.156-3.238 3.156 1.29 3.156 3.238c0 1.949-1.372 3.238-3.156 3.238zm15.181 3.623l2.196-7.327 2.195 7.327h3.842l4.39-13.721h-4.39l-1.976 7.354-2.14-7.354h-3.842l-2.14 7.354-1.977-7.354h-4.39l4.39 13.72h3.842zM64.156 20c1.839 0 3.183-.631 4.089-1.674v1.29h4.116V.406h-4.116v6.778c-.906-1.042-2.25-1.673-4.089-1.673-3.595 0-6.559 3.155-6.559 7.244 0 4.09 2.964 7.245 6.559 7.245zm.823-3.897c-1.893 0-3.265-1.29-3.265-3.348s1.372-3.348 3.265-3.348c1.894 0 3.266 1.29 3.266 3.348s-1.372 3.348-3.266 3.348zm14.66 3.513v-9.77h2.552V5.895H79.64c0-1.592 1.016-2.058 2.552-1.921V.022c-4.555-.274-6.668 2.03-6.668 5.873h-1.839v3.951h1.839v9.77h4.116zm8.266.384c1.811 0 3.184-.659 3.925-1.674v1.29h4.116V5.895H91.83v7.491c0 1.949-1.043 2.827-2.553 2.827-1.317 0-2.387-.796-2.387-2.497V5.895h-4.116v8.424c0 3.705 2.36 5.681 5.131 5.681zm14.44-.384v-7.492c0-1.948 1.044-2.826 2.553-2.826 1.317 0 2.387.795 2.387 2.497v7.82h4.117v-8.424c0-3.705-2.36-5.68-5.132-5.68-1.811 0-3.183.658-3.924 1.673v-1.29h-4.117v13.722h4.117zm17.02.384c1.84 0 3.184-.631 4.09-1.674v1.29h4.116V.406h-4.116v6.778c-.906-1.042-2.25-1.673-4.09-1.673-3.594 0-6.558 3.155-6.558 7.244 0 4.09 2.964 7.245 6.559 7.245zm.824-3.897c-1.893 0-3.265-1.29-3.265-3.348s1.372-3.348 3.265-3.348c1.894 0 3.266 1.29 3.266 3.348s-1.372 3.348-3.266 3.348z"
                fill="#FFF"
                fillRule="nonzero"
              />
            </svg>

            <div className="hidden gap-8 md:flex">
              {menu.map((link, index) => (
                <a key={index} href="#" className="text-sm text-white">
                  {link}
                </a>
              ))}
            </div>

            <MobileMenu />
          </nav>
        </div>
      </header>

      <main className="mx-6 -translate-y-14 md:mx-auto md:max-w-[728px]">
        <Card className="relative mb-6">
          {!project.isLoading && (
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd">
                  <circle fill="#000" cx="28" cy="28" r="28" />
                  <g fillRule="nonzero">
                    <path
                      d="M15.565 28.565a1.93 1.93 0 012.606-.113l.122.113 10.142 10.142a1.93 1.93 0 01-2.606 2.84l-.122-.112-10.142-10.142a1.93 1.93 0 010-2.728z"
                      fill="#444"
                    />
                    <path
                      d="M36.19 17.48c1.006-.996 2.706-.34 2.805 1.026l.005.126v10.736c0 .9-.737 1.629-1.646 1.629a1.64 1.64 0 01-1.642-1.507l-.005-.122v-6.805l-8.043 7.957c-1.006.996-2.707.34-2.806-1.026l-.004-.126v-6.805L16.81 30.52a1.66 1.66 0 01-2.224.095l-.105-.095a1.616 1.616 0 01-.096-2.2l.096-.103L25.336 17.48c1.006-.996 2.707-.34 2.806 1.026l.004.126v6.804l8.043-7.956z"
                      fill="#FFF"
                    />
                  </g>
                </g>
              </svg>
            </div>
          )}

          <Skeleton loading={project.isLoading} className="mb-6 mt-8 md:mt-9">
            <h1 className="mx-auto mb-6 max-w-48 pt-8 text-center text-xl font-bold md:max-w-full md:pt-9 md:text-3xl">
              {project.data?.title}
            </h1>
          </Skeleton>

          <Skeleton
            loading={project.isLoading}
            className="mb-7 h-8 md:mb-9 md:h-6"
          >
            <p className="mb-7 text-center text-sm text-dark-gray md:mb-9 md:text-base">
              {project.data?.subtitle}
            </p>
          </Skeleton>

          <Skeleton loading={project.isLoading}>
            <div className="flex justify-between">
              <ProjectModal buttonText="Back this project" />

              <BookmarkButton
                pressed={isBookmarkedOptimistic}
                onClick={() => {
                  mutation.mutate({
                    isBookmarked: !isBookmarkedOptimistic,
                  });
                }}
              />
            </div>
          </Skeleton>
        </Card>

        <Card className="mb-6">
          {project.data && (
            <>
              <div className="mb-8 flex flex-col items-center md:mb-9 md:flex-row">
                <StatsDisplay
                  type="currency"
                  value={project.data.funded}
                  description={`of ${formatToUSD(project.data.goal)} backed`}
                />
                <Divider />
                <StatsDisplay
                  type="number"
                  value={project.data.backersCount}
                  description="total backers"
                />
                <Divider />
                <StatsDisplay
                  type="number"
                  value={project.data.daysLeft}
                  description="days left"
                />
              </div>
              <ProgressBar
                value={(project.data.funded / project.data.goal) * 100}
              />
            </>
          )}
        </Card>

        <Card>
          <h3 className="mb-7 text-lg font-bold md:mb-10 md:text-xl">
            About this project
          </h3>

          <Skeleton loading={project.isLoading} className="h-20">
            <p className="mb-9 whitespace-pre-line text-sm leading-6 text-dark-gray md:mb-11 md:text-base md:leading-7">
              {project.data?.description}
            </p>
          </Skeleton>

          {options.data && (
            <div className="flex flex-col gap-6">
              {options.data.map((option: optionTypes) => {
                if (option.noShowMainScreen) return;
                return <Option key={option.id} option={option} />;
              })}
            </div>
          )}
        </Card>
      </main>
    </>
  );
}

export default App;
