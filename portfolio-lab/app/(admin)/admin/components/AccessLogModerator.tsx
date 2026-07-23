import getLogs from "@/app/lib/data/getLogs"
import { auth } from "@/app/lib/auth";
import AccessLogTable from "./AccessLogTable";
async function AccessLogModerator() {
    const session = await auth()
    const logs = await getLogs() || []
    console.log('AccessLogModerator: logs:', logs);
    return (
        <AccessLogTable logs={logs} session={session} />
    )
}

export default AccessLogModerator