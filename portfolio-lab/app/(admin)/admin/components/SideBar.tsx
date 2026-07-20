import Link from "next/link"
function SideBar() {
    return (
        <div className="debug-purple flex items-center  gap-2 p-2 overflow-auto lg:min-w-40 lg:max-w-60 lg:w-1/6 lg:flex-col   ">
            <Link href="?tab=status" scroll={false} replace className="rounded-full px-2 py-1 text-xs w-fit lg:w-full text-center border border-amber-500  font-jetBrains-mono text-amber-500/80 hover:cursor-pointer ">Status</Link> <Link href="?tab=test" scroll={false} replace className="rounded-full px-2 py-1 text-xs w-fit whitespace-nowrap  shrink-0  lg:w-full text-center border border-amber-500  font-jetBrains-mono text-amber-500/80 hover:cursor-pointer ">Хуй пизда Джигурда</Link><Link href="?tab=test" scroll={false} replace className="rounded-full px-2 py-1 text-xs w-fit whitespace-nowrap shrink-0  lg:w-full text-center border border-amber-500  font-jetBrains-mono text-amber-500/80 hover:cursor-pointer ">Хуй пизда Джигурда</Link>
            <Link href="?tab=test" scroll={false} replace className="rounded-full px-2 py-1 text-xs w-fit whitespace-nowrap shrink-0  lg:w-full text-center border border-amber-500  font-jetBrains-mono text-amber-500/80 hover:cursor-pointer ">Хуй пизда Джигурда</Link><Link href="?tab=test" scroll={false} replace className="rounded-full px-2 py-1 text-xs w-fit whitespace-nowrap shrink-0  lg:w-full text-center border border-amber-500  font-jetBrains-mono text-amber-500/80 hover:cursor-pointer ">Хуй пизда Джигурда</Link>
        </div>
    )
}

export default SideBar