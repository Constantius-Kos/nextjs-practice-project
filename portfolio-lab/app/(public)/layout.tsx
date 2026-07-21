import { Suspense } from "react";
// 
export default function Layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <div>

        <Suspense fallback={<div className="flex-1 flex items-center justify-center text-amber-500 font-mono">Loading laboratory console...</div>}>
            {children}
        </Suspense></div>
}
