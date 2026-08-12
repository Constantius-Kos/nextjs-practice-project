// Клієнтський компонент з отриманням серверного компонента PulseDashboard пропсом  як слота statusSlot
'use client'
import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from 'next/navigation';

interface IMobileHeader {
    statusSlot: React.ReactNode
    loginSlot: React.ReactNode
}

function MobileHeader({ statusSlot, loginSlot }: IMobileHeader) {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') || 'profile'; // Дефолтне значення — 'terminal'

    return (
        <header className=" sticky grid grid-cols-[3rem_1fr_7rem] top-0 left-0 w-full  h-14  z-10  lg:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className=" flex flex-col justify-center items-center h-14 gap-1.5 z-10 cursor-pointer"
                aria-label="Toggle Menu"
            >
                {/* Верхня смужка */}
                <div className={`w-7 h-0.5 bg-amber-500 transition-all duration-400 ${isOpen
                    ? 'rotate-45 translate-y-2' // Коли меню відкрите: повертаємо та зміщуємо вниз
                    : ''
                    }`} />
                {/* Середня смужка */}
                <div className={`w-6 h-0.5 bg-amber-500 transition-all duration-400 ${isOpen
                    ? 'opacity-0 scale-x-0' // Коли відкрите: зникає
                    : ''
                    }`} />
                {/* Нижня смужка */}
                <div className={`w-7 h-0.5 bg-amber-500 transition-all duration-400 ${isOpen
                    ? '-rotate-45 -translate-y-2' // Коли відкрите: повертаємо в інший бік та зміщуємо вгору
                    : ''
                    }`} />
            </button>
            <div className=" h-full flex min-w-0 items-center  ">

                {statusSlot}
            </div>
            <div className=" h-full flex items-center self-end justify-end">
                {loginSlot}
            </div>

            {isOpen && (
                <div className="fixed  top-14 left-2 right-2  bottom-4 bg-black/50 backdrop-blur-md z-40 flex flex-col justify-between p-8 rounded-3xl font-mono border border-amber-500/40 ">


                    {/* Верхня інформаційна панель */}
                    <div className="text-[10px] text-amber-500/80 flex justify-between uppercase tracking-widest">
                        <span>[System: Online]</span>
                        <span>[Security: Level-1]</span>
                    </div>
                    {/* Основний блок посилань */}
                    <nav className="flex flex-col gap-6 t">
                        {/* Лінк на профіль */}
                        <Link
                            href="/?view=profile"
                            onClick={() => setIsOpen(false)}
                            className={`text-lg tracking-wider transition-all duration-200 py-3 ${currentView === 'profile'
                                ? 'text-amber-500 font-bold border-l-2 border-r-2 border-amber-500 px-4'
                                : 'text-amber-500/60 hover:text-amber-500'
                                }`}
                        >
                            {currentView === 'profile' ? '> ' : ''} [01. DEV_PROFILE]
                        </Link>
                        {/* Лінку на Термінал */}
                        <Link
                            href="/?view=terminal"
                            onClick={() => setIsOpen(false)} // Закриваємо меню при натисканні
                            className={`text-lg tracking-wider transition-all duration-200 py-3 ${currentView === 'terminal'
                                ? 'text-amber-500 font-bold border-l-2 border-r-2 border-amber-500 px-4' // Активний
                                : 'text-amber-500/60 hover:text-amber-500' // Неактивний
                                }`}
                        >
                            {currentView === 'terminal' ? '> ' : ''} [02. LAB_TERMINAL]
                        </Link>
                        {/* Лінк на Логи */}
                        <Link
                            href="/?view=logs"
                            onClick={() => setIsOpen(false)}
                            className={`text-lg tracking-wider transition-all duration-200 py-3 ${currentView === 'logs'
                                ? 'text-amber-500 font-bold border-l-2 border-r-2 border-amber-500 px-4'
                                : 'text-amber-500/60 hover:text-amber-500'
                                }`}
                        >
                            {currentView === 'logs' ? '> ' : ''} [03. ACCESS_LOGS]
                        </Link>{/* Лінк на проекти */}
                        <Link
                            href="/?view=projects"
                            onClick={() => setIsOpen(false)}
                            className={`text-lg tracking-wider transition-all duration-200 py-3 ${currentView === 'projects'
                                ? 'text-amber-500 font-bold border-l-2 border-r-2 border-amber-500 px-4'
                                : 'text-amber-500/60 hover:text-amber-500'
                                }`}
                        >
                            {currentView === 'projects' ? '> ' : ''} [04. PROJECT_HUB]
                        </Link>
                    </nav>
                    {/* Нижня інформаційна панель */}
                    <div className="text-center text-[10px] text-amber-500 uppercase tracking-tighter">
                        © 2026 Lab Portfolio v1.0.0
                    </div>
                </div>
            )}
        </header>

    )
}

export default MobileHeader