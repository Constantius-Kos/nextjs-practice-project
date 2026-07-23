'use client'
import type { Log } from "@prisma/client"
import { Session } from "next-auth"
import { Fragment, useTransition } from "react"
import DeleteLogButton from "./DeleteLogButton"
import { toast } from "sonner"
import { deleteLog } from "../actions"
interface Props {
    logs: Log[],
    session: Session | null
}

function AccessLogTable({ logs, session }: Props) {
    const [isPending, startTransition] = useTransition()

    const isAdmin = session?.user?.role === 'admin'
    function handleClick(logId: Log['id']): void {
        startTransition(async () => {
            const result = await deleteLog(logId)
            if (result.success) {
                toast.success('Log deleted successfully!', {

                    style: {
                        backgroundColor: 'black',
                        borderColor: 'rgba(245, 158, 11, 0.3)', // бурштинова рамка
                        color: '#fbbf24',                      // золотистий текст
                        fontFamily: 'monospace',
                    },
                    classNames: {
                        closeButton: '!bg-black !border-amber-500/50 !text-amber-400 hover:!bg-amber-500/20'
                    }
                });
            } else {
                toast.error('Failed to delete log.');
            }
        })

    }

    return (
        <div className="flex flex-col w-full h-fit p-px  rounded-t-2xl">
            <div className=" flex items-center justify-center  rounded-t-2xl border" > Шапка</div>
            <div className=" grid grid-cols-[1fr_3fr_6fr_1fr] " >
                <div className=" flex border border-gold-amber  border-t-0   items-center justify-center  min-h-0  overflow-auto scrollbar-custom  ">№</div>
                <div className=" flex border border-gold-amber border-t-0 border-l-0   items-center justify-center  min-h-0  overflow-auto scrollbar-custom ">Author</div>
                <div className=" flex border border-gold-amber border-t-0 border-l-0   items-center justify-center  min-h-0     overflow-auto scrollbar-custom">Text</div>
                <div className=" flex lg:hidden border border-gold-amber border-t-0 border-l-0   items-center justify-center  min-h-0   overflow-auto scrollbar-custom">*</div>
                <div className="hidden lg:flex  border border-gold-amber border-t-0 border-l-0   items-center justify-center  min-h-0   overflow-auto scrollbar-custom">Action</div>
            </div>
            <div className=" grid grid-cols-[1fr_3fr_6fr_1fr] ">
                {logs?.map((log, i) => (<Fragment key={log.id}>
                    <div className=" flex border border-gold-amber border-t-0   items-center justify-center py-2 max-h-20 overflow-auto scrollbar-custom  ">{i + 1}</div>
                    <div className=" flex border border-gold-amber border-t-0 border-l-0   items-center justify-center py-2 max-h-20 overflow-auto scrollbar-custom ">{log.author}</div>
                    <div className=" flex border border-gold-amber border-t-0 border-l-0  justify-center p-2 max-h-20    overflow-auto scrollbar-custom min-w-0 break-all text-center ">{log.message}</div>
                    <div className=" flex border border-gold-amber border-t-0 border-l-0   items-center justify-center py-2 max-h-20  overflow-auto scrollbar-custom"><DeleteLogButton disabled={isPending} isAdmin={isAdmin} onDelete={() => handleClick(log.id)} /></div>
                </Fragment>
                )
                )
                }

            </div>
        </div>
    )
}

export default AccessLogTable
