import { db } from "@/app/lib/prisma"
import { cacheLife, cacheTag } from "next/cache"


async function getLogs() {
    'use cache'
    cacheTag('logs')
    cacheLife('infinite')
    const logs = await db.log.findMany({ orderBy: { createdAt: 'desc' }, take: 10 })
    return logs

}
async function AccessLogs() {
    const logs = await getLogs()
    console.log(logs);
    return (
        <div className="flex flex-col gap-4 p-4 border border-amber-500/30 rounded-lg bg-black/40 backdrop-blur-md  w-full h-full shadow-[0_0_20px_-10px_var(--gold-deep)]">
            {/* Заголовок віджета */}
            <h3 className=" font-mono text-amber-500 self-center">[ACCESS LOG MONITOR]</h3>

            {/* Контейнер для списку - саме він буде скролитись */}
            <ul className=" list-disc pl-5 overflow-y-auto flex-1 flex flex-col gap-3 pr-2 text-gold-amber Scrollbar-thin scrollbar-thumb-amber-500/20">
                {logs.length !== 0 && logs.map((log) => <li className="border-b border-dashed border-gold-amber" key={log.id}>
                    <span>{log.author}:</span>
                    <span className="ml-2">{log.message}</span></li>)}
            </ul>

        </div>
    )
}

export default AccessLogs