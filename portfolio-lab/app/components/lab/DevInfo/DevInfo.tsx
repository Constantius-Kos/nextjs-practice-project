'use client'
import { useState } from "react"
import StackList from "./StackList"
import EducationList from "./EducationList"
function DevInfo() {
    const [infoPage, setInfopage] = useState<number>(2)

    function changeInfoPage(n: number): void {
        setInfopage(n)
    }

    return (
        <div className="border border-gold-deep/50 shadow-gold-glow bg-gold-custom rounded-lg flex flex-col gap-1 flex-1 p-1 relative overflow-hidden min-h-0 ">
            <div className=" flex h-fit justify-evenly p-2 text-xs lg:p-px lg:gap-1 ">
                <button className={`${infoPage === 1 ? 'text-glow bg-amber-500/40  ' : ' bg-amber-500/20 cursor-pointer'}  rounded-lg font-jetBrains-mono p-1   w-1/2 lg:p-px`} onClick={() => changeInfoPage(1)}>Stack</button>
                {/* <div className="border-l border-l-gold-deep/50"></div> */}
                <button className={`${infoPage === 2 ? 'text-glow bg-amber-500/40   ' : ' bg-amber-500/20 cursor-pointer'}  rounded-lg  font-jetBrains-mono p-1   w-1/2 lg:p-px `} onClick={() => changeInfoPage(2)}>Education</button>
            </div>
            <div className={`flex flex-1 p-1 overflow-hidden ${infoPage === 1 ? 'animate-slide-let' : 'animate-slide-right'}  min-h-0  lg:p-0 `} key={infoPage}>{infoPage === 1 ? <StackList /> : <EducationList />}</div>

        </div >
    )
}

export default DevInfo
