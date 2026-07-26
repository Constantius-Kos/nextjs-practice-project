import { Suspense } from "react";
// 
export default function Layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <main className="flex-1 min-h-0 w-full flex flex-col overflow-auto">
        <Suspense fallback={null}>
            {children}
        </Suspense>
    </main>
}
