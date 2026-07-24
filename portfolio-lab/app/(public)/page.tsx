import { Suspense } from "react";
import Terminal from "../components/lab/Terminal";
import AccessLogsContainer from "../components/lab/AccessLogsContainer";
interface PageProps {
  searchParams: Promise<{ view?: string }>;
}
export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentView = resolvedSearchParams.view || 'terminal';
  return (


    <main className=' p-1 flex  flex-col flex-1 h-[calc(100dvh-3.5rem)] overflow-auto    w-full   lg:overflow-hidden lg:grid lg:grid-cols-12 lg:gap-4'>

      <section className={` ${currentView !== 'logs' ? ' hidden' : ''}  animate-fade-in  flex flex-col h-full gap-4  w-ful lg:flex lg:col-span-3 lg:h-full lg:min-h-0 lg:overflow-scroll scrollbar-none`}>
        <Suspense>
          <AccessLogsContainer />
        </Suspense>
      </section>

      <section className={`${currentView !== 'terminal' ? ' hidden' : ''} debug-cyan-1 gap-2 animate-fade-in h-[60dvh] overflow-hidden p-2  lg:flex  lg:col-span-9 lg:h-[60dvh]`}>

        <Suspense fallback={<div>Loading Terminal...</div>}>
          <Terminal />
        </Suspense>
      </section>


    </main>

  );
}
