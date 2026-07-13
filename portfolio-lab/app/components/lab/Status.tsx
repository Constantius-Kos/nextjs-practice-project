import { db } from "@/app/lib/prisma"
async function Status() {
    const status = await db.status.findFirst()

    const statusText = status?.text || 'Offline'

    return (
        <div className="debug-purple ">
            Status:   {statusText}
        </div>
    )
}

export default Status