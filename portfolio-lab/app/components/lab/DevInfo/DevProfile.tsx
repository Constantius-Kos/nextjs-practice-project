import DevInfo from "./DevInfo"
function DevProfile() {
    return (
        <div className=" flex flex-1 flex-col p-2 gap-4 lg:p-px lg:min-h-0">
            {/* avatar wrapper */}
            <div className="border border-gold-deep/50 rounded-lg shadow-gold-glow w-full aspect-4/3  "></div>
            {/* info */}
            <DevInfo />
        </div>
    )
}

export default DevProfile
