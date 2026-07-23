'use server'
import { db } from "@/app/lib/prisma";
import { updateTag } from "next/cache";
import type { Log } from "@prisma/client";

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

export async function deleteLog(logId: Log['id']): Promise<{ success: boolean }> {
    try {
        await db.log.delete({
            where: { id: logId }
        });
        updateTag('logs')
        console.log('deleteLog: лог видалений');
        return { success: true };
    } catch (error) {
        console.error("Error deleting log:", error);
        return { success: false };
    }

}

