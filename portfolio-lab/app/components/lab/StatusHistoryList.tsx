import type { Status } from "@prisma/client"
import StatusBadge from "./StatusBadge";
interface Iprops {
    history: Status[] | null
}

function StatusHistoryList({ history }: Iprops) {
    console.log('StatusHistoryList: history:', history);
    return (
        <div className=" absolute flex flex-col top-full mt-2 left-0 w-full h-60 z-20 bg-transparent ">
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
