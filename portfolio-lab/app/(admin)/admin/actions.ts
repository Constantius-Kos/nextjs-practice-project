'use server'
import { db } from "@/app/lib/prisma";
import { revalidatePath, updateTag } from "next/cache";

export async function updateStatus(formData: FormData): Promise<void> {
    const indicatorValue = formData.get('indicator') as 'ONLINE' | 'BUSY' | 'OFFLINE'
    const textValue = formData.get('text') as string

    await db.status.updateMany({
        data: {
            indicator: indicatorValue,
            text: textValue
        }
    }
    )
    // revalidatePath('/')
    updateTag('status')
}