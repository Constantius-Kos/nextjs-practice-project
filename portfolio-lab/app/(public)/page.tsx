import { Suspense } from "react";
import Terminal from "../components/lab/Terminal";
import AccessLogsContainer from "../components/lab/AccessLogsContainer";
import DevProfile from "../components/lab/DevProfile";
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



    <div className="w-full flex-1 flex flex-col overflow-auto lg:overflow-hidden lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-2 p-1">

      <section className={`${!isProfile ? ' hidden' : ''} debug-1 animate-fade-in flex  flex-col h-full gap-4  w-ful lg:flex lg:col-span-3 lg:row-span-2  lg:min-h-0 lg:overflow-scroll scrollbar-none`}>
        <DevProfile />
      </section>

      <section className={`${(isProfile || isProjets) ? ' hidden' : ''} debug-cyan-1 gap-2  h-full overflow-hidden p-2  lg:flex  lg:col-span-9 lg:h-[60dvh]`}>

        <div className={`${!isTerminal ? ' hidden' : ''} debug-blue animate-fade-in h-[60dvh] lg:flex lg:h-full flex-1 p-2`}>
          <Suspense fallback={null}>
            <Terminal />
          </Suspense>
        </div>

        <div className={`${!isLogs ? ' hidden' : ''} debug-cyan animate-fade-in h-full lg:w-1/4 p-2 lg:flex `}>
          <Suspense fallback={null}>
            <AccessLogsContainer />
          </Suspense>
        </div>

      </section >

      <section className={`${!isProjets ? ' hidden' : ''} debug-cyan-1 animate-fade-in gap-2  h-full overflow-hidden p-2  lg:flex   lg:col-span-9 `}>

      </section>
    </div>





  );
}
