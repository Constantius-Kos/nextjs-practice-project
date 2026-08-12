import { getStatus } from "@/app/lib/data/getStatus";
import { getStatusHistory } from "@/app/lib/data/getStatusHistory";
import StatusPlusPopoverWrapper from "./StatusPlusPopoverWrapper";
import StatusBadge from "./StatusBadge";
async function PulseDashboard() {

    // 1. Отримуємо поточний статус із бази даних MongoClient
    const status = await getStatus()
    const history = await getStatusHistory()
    // console.log('PulseDashboard: history', history);



    return (
        <StatusPlusPopoverWrapper history={history} >
            <StatusBadge status={status} />
        </StatusPlusPopoverWrapper>
    );
}



export default PulseDashboard