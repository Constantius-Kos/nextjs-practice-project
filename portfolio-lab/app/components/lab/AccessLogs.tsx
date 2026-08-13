'use client'
import { useOptimistic } from 'react'
import type { Log } from '@prisma/client'
import LogForm from './LogForm'


type AccessLogsProps = {
    logs: Log[]
}

function AccessLogs({ logs }: AccessLogsProps) {
    const [optimisticLogs, addOptimisticLog] = useOptimistic(
        logs,
        (state, newLog: Log) => [newLog, ...state]
    )

    return (
        <div className=' flex flex-col h-full w-full   gap-4 p-2  lg:shrink-0 lg:p-px  '>
            <LogForm addOptimisticLog={addOptimisticLog} />
            <div className="flex flex-col flex-1  min-h-0  gap-4 p-2 border  border-gold-deep/50 rounded-lg bg-gold-custom   w-full shadow-gold-glow lg:shadow-gold-glow  ">
                {/* Заголовок віджета */}
                <h3 className=" font-mono text-amber-500 self-center">[ACCESS LOG MONITOR]</h3>

                {/* Контейнер для списку - саме він буде скролитись */}
                <ul className="  font-jetBrains-mono pl-2 overflow-y-auto  flex flex-col gap-3 pr-2 text-gold-amber scrollbar-custom  ">
                    {optimisticLogs.length !== 0 && optimisticLogs.map((log) => <li className="flex flex-wrap border-b border-dashed border-gold-amber 
               nth-1:opacity-100 
               nth-2:opacity-90 
               nth-3:opacity-80 
               nth-4:opacity-70 
               nth-5:opacity-60 
               nth-6:opacity-50 
               nth-7:opacity-40 
               nth-[n+8]:opacity-35
               " key={log.id}>
                        < span  >
                            <span className='text-[9px] mr-1'>
                                {log.createdAt.toLocaleDateString()}
                            </span>
                            {log.author}:</span>
                        <span className="ml-1  break-all min-w-0">{log.message}</span></li>)}
                </ul>
            </div >
        </div >
    )
}

export default AccessLogs