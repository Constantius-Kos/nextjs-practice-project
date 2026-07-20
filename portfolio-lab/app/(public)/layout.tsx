import { Suspense } from "react";
import MobileHeader from "../components/lab/MobileHeader";
import Header from "../components/lab/Header";
import PulseDashboard from "../components/lab/PulseDashboard";
import LoginButtonContainer from "../components/lab/LoginButtonContainer";
export default function Layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <div>  <Suspense fallback={<div className="h-16 bg-black"></div>}>
        <Header />
    </Suspense>
        <Suspense fallback={<div className="h-14 bg-black" />} >
            <MobileHeader statusSlot={<PulseDashboard />} loginSlot={<LoginButtonContainer />} />
        </Suspense>
        <Suspense fallback={<div className="flex-1 flex items-center justify-center text-amber-500 font-mono">Loading laboratory console...</div>}>
            {children}
        </Suspense></div>
}
