import { db } from "@/app/lib/prisma"
async function PulseDashboard() {
    const status = await db.status.findFirst()

    const statusText = status?.text || 'Offline'

    return (
        <div className="debug-purple ">
            DevStatus:   {statusText}
        </div>
    )
}

export default PulseDashboard