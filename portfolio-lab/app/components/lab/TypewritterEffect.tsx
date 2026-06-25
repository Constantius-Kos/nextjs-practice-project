'use client'

import { useState, useEffect } from 'react'
import TerminalRow from './TerminalRow'
// Описуємо тип для одного рядка
export interface TypewriterLine {
    text: string
    prefix?: string
    className?: string
}

interface TypewriterEffectProps {
    lines: TypewriterLine[]
    speed?: number
}

function TypewriterEffect({ lines, speed = 50 }: TypewriterEffectProps) {
    const [visibleLines, setVisibleLines] = useState<TypewriterLine[]>([])
    const [currentLineIndex, setCurrentLineIndex] = useState(0)
    const [currentText, setCurrentText] = useState('')

    useEffect(() => {
        // Якщо всі рядки надруковані — зупиняємось
        if (currentLineIndex >= lines.length) return

        const currentLine = lines[currentLineIndex]

        if (currentText.length < currentLine.text.length) {
            // Друкуємо поточний рядок по одному символу
            const timeout = setTimeout(() => {
                setCurrentText(currentLine.text.slice(0, currentText.length + 1))
            }, speed)
            return () => clearTimeout(timeout)
        } else {
            // Рядок завершено: додаємо його в історію і переходимо до наступного
            const timeout = setTimeout(() => {
                setVisibleLines(prev => [...prev, currentLine])
                setCurrentText('')
                setCurrentLineIndex(prev => prev + 1)
            }, 500) // невеличка пауза між рядками для реалізму
            return () => clearTimeout(timeout)
        }
    }, [currentText, currentLineIndex, lines, speed])

    return (
        <div className="space-y-1 text-gold-amber   ">
            {/* 1. Рядки, які вже надруковані повністю */}
            {visibleLines.map((line, i) => (
                <TerminalRow key={i} text={line.text} prefix={line.prefix} className={line.className} />

            ))}

            {/* 2. Рядок, який друкується зараз + миготливий курсор */}
            {currentLineIndex < lines.length && (
                <TerminalRow text={currentText} prefix={lines[currentLineIndex].prefix} className='text-white' cursor />

            )}
        </div>
    )
}

export default TypewriterEffect
