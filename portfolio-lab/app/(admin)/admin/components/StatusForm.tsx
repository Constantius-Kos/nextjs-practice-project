'use client';
import { useState } from "react";
import { updateStatus } from "../actions";
import { Session } from "next-auth";

interface Props {
    session: Session | null
}
// Доступні статуси
const STATUS_OPTIONS = ["ONLINE", "BUSY", "OFFLINE"] as const;
function StatusForm({ session }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndicator, setSelectedIndicator] = useState<typeof STATUS_OPTIONS[number]>("ONLINE");
    const isDisabled = session?.user?.role !== 'admin'
    console.log(session);

    return (
        <div className="border border-gold-amber/30 rounded-xl w-80 h-80 p-4 bg-gold-custom  shadow-gold-glow m-auto ">
            <form action={async (formData) => { await updateStatus(formData); }} className=" flex flex-col gap-4">

                {/* 1. Поле для введення коментаря */}
                <input
                    type="text"
                    name="text"
                    spellCheck="false"
                    placeholder="Введіть статус..."
                    className="block w-full text-center py-1.5 border border-amber-500/20 bg-black text-amber-500/80 font-jetBrains-mono text-sm focus:outline-none focus:border-amber-500 focus:shadow-[0_0_8px_rgba(245,158,11,0.4)] transition-all duration-300 rounded-md"
                />
                {/* 2. Прихований інпут для передачі обраного значення у форму */}
                <input type="hidden" name="indicator" value={selectedIndicator} />
                {/* 3. Головна обгортка для кастомного селекту */}
                <div className=" relative w-full font-jetBrains-mono text-xs">

                    {/* Кнопка-перемикач, яка показує поточний статус */}

                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full relative py-2 px-4 text-center border border-amber-500/30 bg-black text-amber-500/80 hover:bg-amber-500/10 hover:border-amber-500 transition-all rounded-md flex items-center justify-between cursor-pointer"
                    >
                        <span className="flex-1 text-center">{selectedIndicator}</span>
                        {/* Маленька стрілочка, що обертається */}
                        <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                            ▼
                        </span>
                    </button>

                    {/* Випадаюче меню (показується тільки якщо isOpen === true) */}
                    {isOpen && (
                        <div className="absolute left-0 right-0 mt-1.5 z-50 bg-black border border-amber-500/40 rounded-md shadow-[0_4px_20px_-5px_rgba(245,158,11,0.3)] overflow-hidden">
                            {STATUS_OPTIONS.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => {
                                        setSelectedIndicator(option);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full py-2 text-center transition-all cursor-pointer block hover:bg-amber-500/10 hover:text-amber-400 focus:outline-none focus:text-gold
                                    ${selectedIndicator === option ? "bg-amber-500/20 text-amber-300 font-bold" : "text-amber-500/60"}
                                    `}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <button className="rounded-full px-3 py-1 text-xs w-fit self-center lg:w-fit lg:px-4 text-center border border-amber-500  font-jetBrains-mono text-amber-500/80 hover:cursor-pointer disabled:border-gray-400/50 disabled:text-gray-400/50  disabled:cursor-not-allowed" type="submit" disabled={isDisabled}>Update</button>
            </form>
        </div>
    );
}
export default StatusForm;