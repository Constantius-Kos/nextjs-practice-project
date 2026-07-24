import type { Status } from "@prisma/client"
import { cacheTag, cacheLife } from "next/cache"
import { db } from '@/app/lib/prisma'

export async function getStatus(): Promise<Status | null> {
    'use cache'
    cacheTag('status')
    cacheLife('infinite')
    const status = await db.status.findFirst()
    return status
}
