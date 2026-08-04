'use server'

import { db } from './prisma'
import { updateTag } from 'next/cache'
import { signIn, signOut } from '@/app/lib/auth'

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

export async function loginWithGithub() {
    await signIn("github")
}
export async function loginWithGoogle() {
    await signIn("google")
}

export async function logout() { await signOut() }