import { getLatestComits } from "@/app/lib/github"
import TypewriterEffect from "./TypewritterEffect";
async function Terminal() {
    const commits = await getLatestComits()
    const commitLines = commits.map(c => ({
        text: `${new Date(c.commit.author.date).toLocaleDateString()}: ${c.commit.message}`,
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
        <div className="w-full max-w-2xl mx-auto rounded-lg border border-gold-deep/50 bg-[#0a0a0a]/80 backdrop-blur-md overflow-hidden shadow-[0_0_40px_-10px_var(--gold-deep)]">

            {/* 2. Шапка терміналу */}
            <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-xs text-white/40 font-mono">bash — 80x24</div>
                <div className="border border-dashed border-amber-50 w-12" /> {/* для балансу центрування */}
            </div>
            {/* 3. Область виводу тексту */}
            <div className="relative p-6 font-jetBrains-mono text-sm sm:text-base min-h-75 ">
                <div className="absolute inset-0 pointer-events-none scan-lines" />
                <TypewriterEffect lines={allLines} />
                {/* Сюди ми потім додамо логіку друку тексту */}
                {/* <div className="flex gap-2 text-primary">
                    <span className="opacity-50">$</span>
                    <span>system.init()</span>
                </div>
                <div className="mt-2 text-white/60">
                    {commits.map((c, i) =>
                        <div key={i}>
                            <span>{new Date(c.commit.author.date).toLocaleDateString()}:</span>
                            <span> {c.commit.message}</span>
                        </div>
                    )}
                </div> */}
            </div>
        </div>
    )
}

export default Terminal