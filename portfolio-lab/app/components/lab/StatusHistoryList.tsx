import type { Status } from "@prisma/client"
import StatusBadge from "./StatusBadge";
interface Iprops {
    history: Status[] | null
    isOpen: boolean
}

function StatusHistoryList({ history, isOpen }: Iprops) {
    console.log('StatusHistoryList: history:', history);
    return (
        <div className={` absolute flex flex-col top-full mt-2 left-0 w-full h-60 overflow-y-scroll scrollbar-custom z-20 bg-transparent transition-all duration-300 ease-out origin-top ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'} `}>
            {/* <div className="debug-red-1 text-center font-jetBrains-mono mb-2">Status history:</div> */}
            <ul className="">
                {history?.map((s) => <li key={s.id} className=" scale-75">
                    <StatusBadge status={s} />
                </li>
                )
                }
            </ul>
        </div>

    )
}

export default StatusHistoryList
