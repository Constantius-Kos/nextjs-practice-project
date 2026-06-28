'use server'

import { db } from './prisma'
import { revalidatePath, revalidateTag, updateTag } from 'next/cache'

export async function createLogAction(formData: FormData) {
    const author = formData.get('author') as string
    const message = formData.get('message') as string

    if (!author || !message) return

    // ТИМЧАСОВО: кидаємо помилку, щоб побачити її в браузері
    await db.log.create({
        data: { author, message }
    })
    // revalidatePath('/')
    // revalidateTag('logs', 'infinite')
    updateTag('logs')
}
