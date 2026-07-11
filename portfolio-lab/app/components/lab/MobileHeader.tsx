'use client'
import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from 'next/navigation';
function MobileHeader() {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') || ''; // Дефолтне значення — 'terminal'

    return (
        <header className="sticky  top-0 left-0 w-full  h-14 bg-black z-10 md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col justify-center items-center w-10 h-14 gap-1.5 z-50 cursor-pointer"
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
            {isOpen && (
                <div className="fixed inset-0 top-14 left-0 w-full h-[calc(100vh-3.5rem)] bg-black/95 backdrop-blur-md z-40 flex flex-col justify-between p-8 font-mono border-t border-amber-500/20">

                    {/* Верхня інформаційна панель */}
                    <div className="text-xs text-amber-500/50 flex justify-between uppercase tracking-widest">
                        <span>[System: Online]</span>
                        <span>[Security: Level-1]</span>
                    </div>
                    {/* Основний блок посилань */}
                    <nav className="flex flex-col gap-6 text-center">
                        {/* Лінку на Термінал */}
                        <Link
                            href="/?view=terminal"
                            onClick={() => setIsOpen(false)} // Закриваємо меню при натисканні
                            className={`text-lg tracking-wider transition-all duration-200 py-3 ${currentView === 'terminal'
                                ? 'text-amber-500 font-bold border-l-2 border-r-2 border-amber-500 px-4' // Активний
                                : 'text-amber-500/60 hover:text-amber-500' // Неактивний
                                }`}
                        >
                            {currentView === 'terminal' ? '> ' : ''} [01. TERMINAL_HERO]
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
                            {currentView === 'logs' ? '> ' : ''} [02. ACCESS_LOGS]
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