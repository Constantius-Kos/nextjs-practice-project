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
    <div className="debug-red p-1  flex flex-col  bg-zinc-50 font-sans dark:bg-black h-[calc(100dvh-3.5rem)] overflow-auto">

      <main className='debug-gold p-1 flex  flex-col flex-1     gap-2 w-full   bg-white dark:bg-black overflow-auto md:grid md:grid-cols-12 md:gap-4'>

        <section className={`${currentView !== 'logs' ? ' hidden' : ''}   flex flex-col gap-4 p-2 w-ful md:flex md:col-span-3`}>
          <Suspense>
            <AccessLogsContainer />
          </Suspense>
        </section>

        <section className={`${currentView !== 'terminal' ? ' hidden' : ''}  p-2  md:flex self-start md:col-span-9`}>
          <Suspense fallback={<div>Loading Terminal...</div>}>
            <Terminal />
          </Suspense>
        </section>


      </main>
    </div>
  );
}
