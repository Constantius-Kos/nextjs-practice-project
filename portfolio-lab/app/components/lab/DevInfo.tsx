'use client'
import { useState } from "react"
function DevInfo() {
    const [infoPage, setInfopage] = useState<number>(2)

    function changeInfoPage(n: number): void {
        setInfopage(n)
    }

    return (
        <div className="border border-gold-deep/50 shadow-gold-glow bg-gold-custom rounded-lg flex-1">
            <div className=" flex h-10 justify-evenly p-2  ">
                <button className={`${infoPage === 1 ? 'text-glow  ' : ' bg-amber-500/20 cursor-pointer'} rounded-lg font-jetBrains-mono   w-1/3`} onClick={() => changeInfoPage(1)}>Stack</button>
                {/* <div className="border-l border-l-gold-deep/50"></div> */}
                <button className={`${infoPage === 2 ? 'text-glow  ' : ' bg-amber-500/20 cursor-pointer'} rounded-lg  font-jetBrains-mono   w-1/3`} onClick={() => changeInfoPage(2)}>Academic Background</button>

            </div>
        </div >
    )
}

export default DevInfo
