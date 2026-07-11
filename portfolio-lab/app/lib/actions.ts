'use server'

import { db } from './prisma'
import { revalidatePath, revalidateTag, updateTag } from 'next/cache'

export async function createLogAction(formData: FormData) {
    const author = (formData.get('author') as string || '').trim()
    const message = (formData.get('message') as string || '').trim()

    if (author.length < 2 || message.length < 3) return



    await db.log.create({
        data: { author, message }
    })
    // revalidatePath('/')
    // revalidateTag('logs', 'infinite')
    updateTag('logs')
}
