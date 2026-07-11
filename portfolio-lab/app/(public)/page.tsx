import { Suspense } from "react";
import Terminal from "../components/lab/Terminal";
import AccessLogsContainer from "../components/lab/AccessLogsContainer";
interface PageProps {
  searchParams: Promise<{ view?: string }>;
}
export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentView = resolvedSearchParams.view || '';
  return (


    <main className=' p-1 flex  flex-col flex-1 h-[calc(100dvh-3.5rem)] overflow-auto    w-full   bg-white dark:bg-black md:overflow-hidden md:grid md:grid-cols-12 md:gap-4'>

      <section className={`${currentView !== 'logs' ? ' hidden' : ''}  animate-fade-in  flex flex-col h-full gap-4 p-2 w-ful md:flex md:col-span-3 md:h-full md:min-h-0`}>
        <Suspense>
          <AccessLogsContainer />
        </Suspense>
      </section>

      <section className={`${currentView !== 'terminal' ? ' hidden' : ''}  animate-fade-in h-[60dvh] overflow-hidden p-2  md:flex  md:col-span-9 md:h-[30dvh]`}>
        <Suspense fallback={<div>Loading Terminal...</div>}>
          <Terminal />
        </Suspense>
      </section>


    </main>

  );
}
