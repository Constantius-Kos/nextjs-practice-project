import { db } from "@/app/lib/prisma"

import { StatusIndicator } from "@prisma/client";
// Описуємо структуру значень для кожного статусу
interface StatusConfig {
    bgClass: string;     // Клас кольору фону для LED-маячка
    glowClass: string;   // Клас кумулятивного світіння капсули
    label: string;       // Текст для відображення користувачу
    duration: string;    // Тривалість імпульсу анімації (inline style)
}
// Створюємо словник із суворою перевіркою ключів
const STATUS_MAP: Record<StatusIndicator, StatusConfig> = {
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
async function PulseDashboard() {
    // 1. Отримуємо поточний статус із бази даних MongoClient
    const status = await db.status.findFirst()
    // 2. Зчитуємо індикатор. Якщо запису в БД ще немає, 
    // використовуємо автозгенерований Prisma значення за замовчуванням: 'OFFLINE'
    const indicator = status?.indicator || StatusIndicator.OFFLINE
    // 3. Дістаємо зі словника конфігурацію під наш індикатор
    const config = STATUS_MAP[indicator]
    // 4. Визначаємо фінальний текст статусу.
    // Якщо у базі є кастомний текст (наприклад, "Коджу портфоліо"), беремо його.
    // Якщо в базі порожньо, використовуємо назву статусу з конфігу (наприклад, "OFFLINE").
    const statusText = status?.text || config.label
    console.log(status);
    // return (
    //     <div className="debug-purple ">
    //         DevStatus:   {statusText}
    //     </div>
    // )
    const isLongText = statusText.length > 10;
    return (
        <div className={`flex items-center w-full gap-2.5 px-3.5 py-1.5 rounded-full border border-amber-500 bg-zinc-950/40 backdrop-blur-md  font-mono text-amber-500/80 transition-all duration-500  ${config.glowClass} lg:max-w-1/2  `}>

            {/* Контейнер для LED-маячка */}
            <span className="relative flex h-2 w-2">

                {/* 1. Коло імпульсу (відображається тільки якщо тривалість не "0s") */}
                {config.duration !== "0s" && (
                    <span
                        className={`absolute inline-flex h-full w-full rounded-full  animate-ping ${config.bgClass}  `}
                        style={{ animationDuration: config.duration }}
                    />
                )}

                {/* 2. Внутрішнє статичне ядро вогника */}
                <span className={`relative inline-flex rounded-full h-2 w-2  ${config.bgClass}`} />
            </span>

            {/* Текстова мітка статусу з бази даних */}
            <span className="tracking-wide uppercase text-[10px] lg:text-xs text-amber-500/80 mr-1 border-r border-amber-500/20 pr-2">
                {config.label}
            </span>
            {/* 1. Обгортка, яка ховає текст, що виходить за межі */}
            <div className={`flex-1 overflow-hidden min-w-0 flex ${isLongText ? "justify-start lg:justify-center" : "justify-center"}`}>

                <span className={`inline-block whitespace-nowrap text-amber-500/80 font-sans tracking-normal select-none text-xs lg:text-sm ${isLongText ? "animate-marquee-single" : ""
                    }`}>
                    {statusText}
                </span>
            </div>
        </div>
    );

}

export default PulseDashboard