'use server'
import { Prisma } from "@prisma/client";
import { db } from "@/app/lib/prisma";
import { updateTag } from "next/cache";
import type { Log } from "@prisma/client";
import { auth } from "@/app/lib/auth";
import type { BaseActionResponse } from "@/types/BaseActionResponse";

export async function updateStatus(formData: FormData): Promise<BaseActionResponse> {
    // 1. Авторизація
    const session = await auth();
    if (session?.user?.role !== 'admin') {
        console.warn(`[AUTH_WARN] 🔒 Unauthorized attempt to update status by user: ${session?.user?.email || 'Guest'}`);
        return {
            success: false,
            error: "Недостатньо прав для виконання цієї дії."
        };
    }
    const indicatorValue = formData.get('indicator') as 'ONLINE' | 'BUSY' | 'OFFLINE';
    const textValue = (formData.get('text') as string || '').trim();
    // 2. Базова валідація вхідних даних
    if (!indicatorValue || !['ONLINE', 'BUSY', 'OFFLINE'].includes(indicatorValue)) {
        console.warn(`[VALIDATION_WARN] Invalid indicator value: ${indicatorValue}`);
        return { success: false, error: "Некоректний тип індикатора." };
    }
    // 3. Виконання мутації в БД з описом помилок
    try {
        await db.status.create({
            data: {
                indicator: indicatorValue,
                text: textValue
            }
        });
        updateTag('status');
        console.info(`[STATUS_SUCCESS] Status updated to '${indicatorValue}' by admin: ${session.user.email}`);

        return { success: true, message: "Статус успішно оновлено!" };
    } catch (error) {
        // Детальний лог на СЕРВЕРІ для розробника
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(`[DB_ERROR] Prisma Known Error [Code: ${error.code}]:`, error.message);
        } else if (error instanceof Prisma.PrismaClientValidationError) {
            console.error(`[DB_ERROR] Prisma Validation Error:`, error.message);
        } else {
            console.error(`[SYSTEM_ERROR] Unexpected error in updateStatus:`, error);
        }
        // Безпечне повідомлення на КЛІЄНТ
        return {
            success: false,
            error: "Помилка при збереженні в базу даних. Спробуйте пізніше."
        };
    }
}

export async function deleteLog(logId: Log['id']): Promise<BaseActionResponse> {

    // 1. Авторизація
    const session = await auth();
    if (session?.user?.role !== 'admin') {
        console.warn(`[AUTH_WARN] 🔒 Unauthorized attempt to delete log by user: ${session?.user?.email || 'Guest'}`);
        return {
            success: false,
            error: "Недостатньо прав для виконання цієї дії."
        };
    }
    try {
        await db.log.delete({
            where: { id: logId }
        });
        updateTag('logs')

        // console.info(`[LOG_DELETE_SUCCESS] Log ${logId} deleted by admin: ${session.user.email}`);
        console.log('deleteLog: лог видалений');
        return { success: true };
    } catch (error) {
        // Детальний лог на СЕРВЕРІ для розробника
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(`[DB_ERROR] Prisma Known Error [Code: ${error.code}]:`, error.message);
        } else if (error instanceof Prisma.PrismaClientValidationError) {
            console.error(`[DB_ERROR] Prisma Validation Error:`, error.message);
        } else {
            console.error(`[SYSTEM_ERROR] Unexpected error in deleteLog:`, error);
        }
        // Безпечне повідомлення на КЛІЄНТ
        return {
            success: false,
            error: "Помилка видалення логу. Спробуйте пізніше."
        };
    }

}

