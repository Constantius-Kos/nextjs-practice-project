import { db } from '@/app/lib/prisma'
import { cacheTag, cacheLife } from 'next/cache'
import type { Status } from '@prisma/client'

export async function getStatusHistory(): Promise<Status[] | null> {
    'use cache'
    try {
        cacheTag('status')
        cacheLife('infinite')
        const statusHistory = await db.status.findMany({ take: 10, orderBy: { updatedAt: 'desc' } })
        return statusHistory
    } catch (error) {
        console.error('[STATUS_HISTORY_ERROR]:', error)
        return []
    }
}

