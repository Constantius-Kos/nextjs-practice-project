import { Suspense } from "react";
import Terminal from "../components/lab/Terminal";
import AccessLogsContainer from "../components/lab/AccessLogsContainer";
import DevProfile from "../components/lab/DevProfile";
import { PROJECTS_DATA } from "../data/projectsData";
import ProjectIcon from "../components/lab/ProjectIcon";


interface PageProps {
  searchParams: Promise<{ view?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentView = resolvedSearchParams.view || 'profile';
  const isProfile = currentView === 'profile';
  const isTerminal = currentView === 'terminal';
  const isLogs = currentView === 'logs';
  const isProjets = currentView === 'projects'
  return (



    <div className=" w-full flex-1 flex flex-col  lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-3 lg:min-h-0 ">

      <section className={`${!isProfile ? ' hidden' : ''} debug-cyan   animate-fade-in flex  flex-col h-full gap-4  w-ful lg:flex lg:col-span-3 lg:row-span-2  lg:min-h-0 scrollbar-none `}>
        <DevProfile />
      </section>

      <section className={`${(isProfile || isProjets) ? ' hidden' : ''} debug-cyan  gap-2  h-full   lg:flex  lg:col-span-9 lg:h-[60dvh] lg:text-xs lg:gap-3 `}>

        <div className={`${!isTerminal ? ' hidden' : ''}  animate-fade-in h-[70dvh] lg:flex lg:h-full flex-1 p-1 lg:p-px`}>
          <Suspense fallback={null}>
            <Terminal />
          </Suspense>
        </div>

        <div className={`${!isLogs ? ' hidden' : ''}  animate-fade-in h-full lg:w-1/3  p-2 lg:flex lg:p-0 `}>

          <Suspense fallback={null}>
            <AccessLogsContainer />
          </Suspense>
        </div>

      </section >

      <section className={`${!isProjets ? ' hidden' : ''} @container debug-cyan gap-3 p-3   animate-fade-in grid grid-cols-5 content-start  h-full    lg:col-span-9 lg:flex lg:overflow-y-auto lg:flex-wrap lg:justify-center lg:p-1 lg:gap-2 lg:items-start scrollbar-custom `}>
        {PROJECTS_DATA.map((p, i) => {
          return (
            <>
              <ProjectIcon key={p.slug} project={p} />
              <ProjectIcon key={p.slug} project={p} />
              <ProjectIcon key={p.slug} project={p} />
              <ProjectIcon key={p.slug} project={p} />
              <ProjectIcon key={p.slug} project={p} />
              <ProjectIcon key={p.slug} project={p} />
              <ProjectIcon key={p.slug} project={p} />
              <ProjectIcon key={p.slug} project={p} />
              <ProjectIcon key={p.slug} project={p} />
              <ProjectIcon key={p.slug} project={p} />
              <ProjectIcon key={p.slug} project={p} />
              <ProjectIcon key={p.slug} project={p} />
              <ProjectIcon key={p.slug} project={p} />


            </>
          )
        })}

      </section>
    </div>





  );
}
