import type { searchParamsType } from "@/types/serachParamsType"
import SideBar from "./components/SideBar"
import AdminContent from "./components/AdminContent"

import { Suspense } from "react"

interface IAdmiPageProps {
    searchParams: searchParamsType
}
function AdminPage({ searchParams }: IAdmiPageProps) {


    return (
        <div className="debug-red flex flex-col lg:flex-row flex-1 p-3 gap-2 ">
            <SideBar />
            <Suspense fallback={<div className="debug-purple flex items-center justify-center flex-1 ">Loading content...</div>}>
                <AdminContent searchParams={searchParams} />
            </Suspense>
        </div>
    )
}

export default AdminPage