import { db } from "@/app/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"
import AccessLogs from "./AccessLogs"

async function getLogs() {
    'use cache'
    cacheTag('logs')
    cacheLife('infinite')
    const logs = await db.log.findMany({ orderBy: { createdAt: 'desc' }, take: 10 })
    return logs

}

async function AccessLogsContainer() {
    const logs = await getLogs()
    return (
        <div>
            <AccessLogs logs={logs} />
        </div>
    )
}

export default AccessLogsContainer