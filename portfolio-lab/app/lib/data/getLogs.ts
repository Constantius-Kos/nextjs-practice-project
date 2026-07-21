import { db } from "@/app/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"

async function getLogs() {
    'use cache'
    cacheTag('logs')
    cacheLife('infinite')
    const logs = await db.log.findMany({ orderBy: { createdAt: 'desc' }, take: 10 })
    return logs

}
export default getLogs