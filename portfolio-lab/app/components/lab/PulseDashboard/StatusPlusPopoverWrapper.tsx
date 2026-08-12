'use client'
import { useEffect, useRef } from "react"
import type { Status } from "@prisma/client"
import { useState } from "react"
import StatusHistoryList from "./StatusHistoryList"

interface IProps {
    history: Status[] | null
    children: React.ReactNode
}

function StatusPusPopoverWrapper({ history, children }: IProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const popoverRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        // 1. Функція, яка перевіряє, куди влучив клік
        const handleClickOutside = (event: MouseEvent) => {
            // Якщо посилання існує і клікнутий елемент НЕ всередині popoverRef
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        // 2. Якщо меню відкрите - вішаємо слухача на весь документ
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        // 3. Обов'язкове прибирання (cleanup): знімаємо слухача при закритті або unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]); // Ефект перезапускається тільки коли змінюється isOpen

    return (
        <div className=" relative  min-w-0 w-full  sm:w-3/4 sm:mx-auto" ref={popoverRef}>

            <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                {children}
            </div>



            <StatusHistoryList history={history} isOpen={isOpen} />
        </div>
    )
}

export default StatusPusPopoverWrapper
