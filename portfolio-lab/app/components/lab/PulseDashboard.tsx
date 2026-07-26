import { StatusIndicator } from "@prisma/client";
import { getStatus } from "@/app/lib/data/getStatus";
import { STATUS_MAP } from "@/app/lib/constants/status";

async function PulseDashboard() {

    // 1. Отримуємо поточний статус із бази даних MongoClient
    const status = await getStatus()
    // 2. Зчитуємо індикатор. Якщо запису в БД ще немає, 
    // використовуємо автозгенерований Prisma значення за замовчуванням: 'OFFLINE'
    const indicator = status?.indicator || StatusIndicator.OFFLINE
    // 3. Дістаємо зі словника конфігурацію під наш індикатор
    const config = STATUS_MAP[indicator]
    // 4. Визначаємо фінальний текст статусу.
    // Якщо у базі є кастомний текст (наприклад, "Коджу портфоліо"), беремо його.
    // Якщо в базі порожньо, використовуємо назву статусу з конфігу (наприклад, "OFFLINE").
    const statusText = status?.text || config.label
    const date = status?.updatedAt.toLocaleDateString()
    console.log(status);
    // return (
    //     <div className="debug-purple ">
    //         DevStatus:   {statusText}
    //     </div>
    // )
    const isLongText = statusText.length > 10;

    return (
        <div className={`flex items-center w-full gap-2.5 px-3.5 py-1.5 rounded-full border border-amber-500 bg-zinc-950/40 backdrop-blur-md  font-mono  transition-all duration-500  ${config.glowClass} lg:w-2/3  `}>

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
            <span className="tracking-wide uppercase text-[10px] lg:text-xs  mr-1 border-r border-amber-500/20 pr-2">
                {config.label}
            </span>
            {/* 1. Обгортка, яка ховає текст, що виходить за межі */}
            <div className={`flex-1 overflow-hidden min-w-0 flex ${isLongText ? "justify-start lg:justify-center" : "justify-center"}`}>

                <span className={`inline-block whitespace-nowrap  font-sans tracking-normal select-none text-xs lg:text-sm ${isLongText ? "animate-marquee-single" : ""
                    }`}>
                    <span className="text-[9px] mr-1">{date}:</span>
                    {statusText}
                </span>
            </div>
        </div>
    );
}



export default PulseDashboard