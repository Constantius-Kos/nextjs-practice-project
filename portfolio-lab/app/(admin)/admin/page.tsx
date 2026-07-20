import SideBar from "./components/SideBar"
import StatusForm from "./components/StatusForm"
import { auth } from "@/app/lib/auth"
interface Iprops {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


async function AdminPage({ searchParams }: Iprops) {
    const { tab } = await searchParams


    return (
        <div className="debug-red flex flex-col lg:flex-row flex-1 p-3 gap-2 ">
            <SideBar />
            <div className="debug-purple flex items-center justify-center flex-1">

                {tab === 'status' && <StatusForm />}
            </div>
        </div>
    )
}

export default AdminPage