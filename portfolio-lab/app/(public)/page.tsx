import { Suspense } from "react";
import Terminal from "../components/lab/Terminal";
import LogForm from "../components/lab/LogForm";
import AccessLogs from "../components/lab/AccessLogs";
export default function Home() {
  return (
    <div className="debug m-1 flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="debug flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32  px-16 bg-white dark:bg-black ">
        <section className="debug flex gap-4 p-2 ">
          <LogForm />
          <Suspense>
            <AccessLogs />
          </Suspense>
        </section>
        {/* <Suspense fallback={<div>Loading Terminal...</div>}>
          <Terminal />
        </Suspense> */}
      </main>
    </div>
  );
}
