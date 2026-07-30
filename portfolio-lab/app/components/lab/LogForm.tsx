'use client';
import { createLogAction } from '@/app/lib/actions';
import { useTransition } from 'react';
import { useState } from 'react';
import type { Log } from '@prisma/client'

interface LogFormProps {
    addOptimisticLog: (newLog: Log) => void
}


export default function LogForm({ addOptimisticLog }: LogFormProps) {
    const [author, setAuthor] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(formData: FormData) {
        // console.log("Form data capture:", Object.fromEntries(formData));
        startTransition(async () => {
            const tempLog: Log = {
                id: Math.random().toString(), // тимчасовий випадковий ID
                author: author,              // ім'я з інпуту
                message: message,            // повідомлення з textarea
                createdAt: new Date()        // поточний час
            }
            addOptimisticLog(tempLog)
            await createLogAction(formData);
            // Після авейту можна скинути поля форми
            setAuthor('');
            setMessage('');
        });
    }

    const isValid = author.trim().length >= 2 && message.trim().length >= 3

    return (
        <form action={handleSubmit} className="flex bg-gold-custom flex-col gap-4 p-4 border border-gold-deep/50 rounded-lg  backdrop-blur-md shadow-gold-glow lg:shadow-gold-glow lg:p-2 lg:gap-1 ">
            <div className="flex flex-col gap-1">
                <label htmlFor="author" className="text-xs uppercase tracking-tighter text-amber-500 font-mono">
                    [Identify Your Identity]
                </label>
                <input
                    name="author"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    placeholder="Nickname"
                    className="bg-black border-b border-amber-500/20 focus:border-amber-500 text-amber-400 font-mono outline-none p-2 transition-all"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-xs uppercase tracking-tighter text-amber-500 font-mono">
                    [Entry Payload]
                </label>
                <textarea
                    name="message"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={3}
                    placeholder="Enter log data..."
                    className="bg-black border border-amber-500/20 focus:border-amber-500 text-amber-400 font-mono outline-none p-2 rounded-sm transition-all resize-none scrollbar-custom"
                />
            </div>

            <button
                type="submit"
                disabled={isPending || !isValid}
                className="mt-2 py-2 px-4 bg-amber-600/20 enabled:hover:bg-amber-600/40 text-amber-500 font-mono text-sm border border-amber-600/50  tracking-widest transition-all enabled:active:scale-95 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed lg:text-xs lg:p-1"
            >
                {isPending ? '> Executing...' : '> Execute / Log'}
            </button>
        </form>
    );
}
