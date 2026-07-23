// Серверний компонент з імпортом клієнтського батона
// import { auth } from "@/app/lib/auth";
import PulseDashboard from "./PulseDashboard"
import LoginButtonContainer from "./LoginButtonContainer";
import Link from "next/link";



async function Header() {
    // const session = await auth()
    // console.log('session:', session);
    return (
        <div className=" p-1 hidden  items-center justify-center lg:grid lg:grid-cols-3 gap-3  lg:w-full lg:h-16">
            <div className=" h-full flex items-center">
                <Link href={'/'} className=" font-mono text-amber-500 ml-4">[LAB_v1.0]</Link></div>
            <div className=" h-full flex items-center justify-center ">
                <PulseDashboard />
            </div>

            <div className=" flex h-full items-center justify-end pr-1 ">
                <LoginButtonContainer />
            </div>
        </div>
    )
}

export default Header