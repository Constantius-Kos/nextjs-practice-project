import getLogs from "@/app/lib/data/getLogs"
import AccessLogs from "./AccessLogs"


async function AccessLogsContainer() {
    const logs = await getLogs()
    return (
        <>
            <AccessLogs logs={logs} />
        </>
    )
}

export default AccessLogsContainer