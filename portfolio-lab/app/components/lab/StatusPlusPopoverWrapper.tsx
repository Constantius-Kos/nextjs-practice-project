'use client'

import type { Status } from "@prisma/client"
import { useState } from "react"
import StatusHistoryList from "./StatusHistoryList"

interface IProps {
    history: Status[] | null
    children: React.ReactNode
}

function StatusPusPopoverWrapper({ history, children }: IProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div className="debug-1 relative lg:w-3/4">

            <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                {children}
            </div>


            {isOpen && <StatusHistoryList history={history} />}
        </div>
    )
}

export default StatusPusPopoverWrapper
