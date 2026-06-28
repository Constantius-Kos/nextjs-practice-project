'use client';
import { createLogAction } from '@/app/lib/actions';
import { useTransition } from 'react';
import { useState } from 'react';
// Шар 1: Скелет - Типізація та структура JSX
export default function LogForm() {
    const [author, setAuthor] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [isPending, startTransition] = useTransition();

    // Функція-заглушка для обробки форми (Muscles будуть пізніше)
    async function handleSubmit(formData: FormData) {
        console.log("Form data capture:", Object.fromEntries(formData));
        startTransition(async () => {
            await createLogAction(formData);
            // Після авейту можна скинути поля форми
            setAuthor('');
            setMessage('');
        });
    }

    return (
        <form action={handleSubmit} className="flex flex-col gap-4 p-4 border border-amber-500/30 rounded-lg bg-black/40 backdrop-blur-md shadow-lg shadow-amber-500/10">
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
                    placeholder="Anonymous Admin"
                    className="bg-transparent border-b border-amber-500/20 focus:border-amber-500 text-amber-400 font-mono outline-none py-1 transition-all"
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
                    className="bg-transparent border border-amber-500/20 focus:border-amber-500 text-amber-400 font-mono outline-none p-2 rounded-sm transition-all resize-none"
                />
            </div>

            <button
                type="submit"
                disabled={isPending || !author || !message}
                className="mt-2 py-2 px-4 bg-amber-600/20 enabled:hover:bg-amber-600/40 text-amber-500 font-mono text-sm border border-amber-600/50  tracking-widest transition-all enabled:active:scale-95 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed "
            >
                {isPending ? '> Executing...' : '> Execute / Log'}
            </button>
        </form>
    );
}
