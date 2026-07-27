import DevInfo from "./DevInfo"
function DevProfile() {
    return (
        <div className="debug-cyan-1 flex flex-1 flex-col p-2 gap-4">
            {/* avatar wrapper */}
            <div className="border border-gold-deep/50 rounded-lg shadow-gold-glow w-full aspect-4/3  "></div>
            {/* info */}
            <DevInfo />
        </div>
    )
}

export default DevProfile
