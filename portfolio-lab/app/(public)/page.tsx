import { Suspense } from "react";
import Terminal from "../components/lab/Terminal";
import LogForm from "../components/lab/LogForm";
import AccessLogs from "../components/lab/AccessLogs";
interface PageProps {
  searchParams: Promise<{ view?: string }>;
}
export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentView = resolvedSearchParams.view || 'terminal';
  return (
    <div className="debug m-1 p-4 flex flex-col  bg-zinc-50 font-sans dark:bg-black">
      <main className="debug flex  flex-col flex-1    items-center    bg-white dark:bg-black ">
        <section className="debug flex flex-col gap-4 p-2 w-full ">
          <LogForm />
          <Suspense>
            <AccessLogs />
          </Suspense>
        </section>
        <Suspense fallback={<div>Loading Terminal...</div>}>
          <Terminal />
        </Suspense>
      </main>
    </div>
  );
}
