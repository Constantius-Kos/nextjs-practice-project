import type { StatusIndicator } from "@prisma/client";
// Описуємо структуру значень для кожного статусу
export interface StatusConfig {
    bgClass: string;     // Клас кольору фону для LED-маячка
    glowClass: string;   // Клас кумулятивного світіння капсули
    label: string;       // Текст для відображення користувачу
    duration: string;    // Тривалість імпульсу анімації (inline style)
}
// Створюємо словник із суворою перевіркою ключів
export const STATUS_MAP: Record<StatusIndicator, StatusConfig> = {
    ONLINE: {
        bgClass: "bg-emerald-500",
        glowClass: "shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]",
        label: "ONLINE",
        duration: "1.2s", // Швидкий імпульс
    },
    BUSY: {
        bgClass: "bg-amber-500",
        glowClass: "shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)]",
        label: "BUSY",
        duration: "2.4s", // Повільний імпульс
    },
    OFFLINE: {
        bgClass: "bg-red-500",
        glowClass: "shadow-[0_0_15px_-3px_rgba(239,68,68,0.2)]",
        label: "OFFLINE",
        duration: "0s", // Без імпульсу (просто горить або згасло)
    },
};