import { auth } from "@/app/lib/auth"
import AccessLogModerator from "./AccessLogModerator"
import StatusForm from "./StatusForm"
import type { searchParamsType } from '@/types/serachParamsType'
interface IAdminContentProps {
    searchParams: searchParamsType
}

async function AdminContent({ searchParams }: IAdminContentProps) {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const { tab } = await searchParams
    const session = await auth()

    return (
        <div className=" p-2 flex  flex-1">
            {tab === 'status' && <StatusForm session={session} />}
            {tab === 'logs' && <AccessLogModerator />}
        </div>
    )
}

export default AdminContent