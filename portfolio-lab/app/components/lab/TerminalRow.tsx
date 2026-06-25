'use client'

interface TerminalRowProps {
    text: string,
    prefix?: string,
    className?: string,
    cursor?: boolean
}

function TerminalRow({ text, prefix, className, cursor = false }: TerminalRowProps) {
    return (
        <div className={`flex gap-2 text-glow ${className}`}>
            {prefix && (
                <span className="opacity-50 ">{prefix}</span>
            )}

            <span >{text}
                {cursor && <span className="inline-block w-1 h-5 bg-gold-amber shadow-[0_0_8px_var(--color-gold-amber)] animate-pulse ml-1 align-middle" />}
            </span>
        </div>
    )
}

export default TerminalRow