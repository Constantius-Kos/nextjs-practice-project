import Link from "next/link"
function SideBar() {
    return (
        <div className="flex items-center  gap-2 p-2 overflow-auto lg:min-w-40 lg:max-w-60 lg:w-1/6 lg:flex-col   ">
            <Link href="/admin?tab=status" scroll={false} replace className="rounded-full px-2 py-1 text-xs w-fit lg:w-full text-center border  bg-gold-custom font-jetBrains-mono hover:cursor-pointer ">Status</Link> <Link href="/admin?tab=logs" scroll={false} replace className="rounded-full px-2 py-1 text-xs w-fit whitespace-nowrap  shrink-0  lg:w-full text-center border  bg-gold-custom  font-jetBrains-mono hover:cursor-pointer ">Logs</Link><Link href="?tab=test" scroll={false} replace className="rounded-full px-2 py-1 text-xs w-fit whitespace-nowrap shrink-0  lg:w-full text-center border  bg-gold-custom font-jetBrains-mono hover:cursor-pointer ">TEST</Link>
            <Link href="?tab=test" scroll={false} replace className="rounded-full px-2 py-1 text-xs w-fit whitespace-nowrap shrink-0  lg:w-full text-center border  bg-gold-custom font-jetBrains-mono hover:cursor-pointer ">TEST</Link><Link href="?tab=test" scroll={false} replace className="rounded-full px-2 py-1 text-xs w-fit whitespace-nowrap shrink-0  lg:w-full text-center border  bg-gold-custom font-jetBrains-mono hover:cursor-pointer ">TEST</Link>
        </div>
    )
}

export default SideBar