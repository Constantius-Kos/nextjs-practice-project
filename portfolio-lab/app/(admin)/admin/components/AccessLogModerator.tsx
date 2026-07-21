import getLogs from "@/app/lib/data/getLogs"

async function AccessLogModerator() {

    const logs = await getLogs() || []
    return (
        <div className="debug-1 w-full h-full">

        </div>
    )
}

export default AccessLogModerator