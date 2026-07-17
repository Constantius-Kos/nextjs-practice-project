import { getLatestComits } from "@/app/lib/github"
import TypewriterEffect from "./TypewritterEffect";
async function Terminal() {
    const commits = await getLatestComits()
    const commitLines = commits.map(c => ({
        text: `${new Date(c.commit.author.date).toLocaleDateString('uk-UA')}: ${c.commit.message}`,
        className: "text-gold-amber"
    }));
    // Об'єднуємо: спочатку ініціалізація, потім — розпаковуємо комміти
    const allLines = [
        { text: 'system.init()', prefix: '$', className: 'text-gold-amber' },
        ...commitLines
    ];
    // console.log('Terminal.tsx:', commits, '***Terminal.tsx***');
    return (
        // 1. Головна "коробка" з рамкою та розмиттям фону
        <div className="p-2 w-full  rounded-lg border border-gold-deep/50 bg-[#0a0a0a]/80 backdrop-blur-md shadow-[0_0_12px_-5px_var(--gold-deep)] flex flex-col h-full overflow-hidden ">5

            {/* 2. Шапка терміналу */}
            <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5 rounded-t-md">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-xs text-white/40 font-mono">bash — 80x24</div>
                <div className="border border-dashed border-amber-50 w-12" /> {/* для балансу центрування */}
            </div>
            {/* 3. Область виводу тексту */}
            <div className="relative flex-1 min-h-0 md:flex-1 md:min-h-0 ">

                {/* CRT Скло (лінії): нерухоме, зафіксоване на 100% висоти та ширини батька */}
                <div className="absolute inset-0 pointer-events-none scan-lines z-20" />

                {/* Внутрішній скрол-контейнер: саме тут знаходиться текст і скрол */}
                <div className="h-full overflow-y-auto scrollbar-custom p-3 font-jetBrains-mono text-sm sm:text-base lg:p-6">
                    <TypewriterEffect lines={allLines} />
                </div>
            </div>

        </div>
    )
}

export default Terminal