import { STACK_DATA } from "@/app/data/labData"
function StackList() {
    return (
        <div className="flex-1 overflow-y-auto scrollbar-custom space-y-3 p-1 font-jetBrains-mono text-xs">
            {STACK_DATA.map((category) => (
                <div
                    key={category.id}
                    className="bg-black/30 border border-gold-deep/20 rounded p-2 flex flex-col gap-1.5 backdrop-blur-xs"
                >
                    {/* Заголовок категорії */}
                    <div className=" flex items-center justify-center gap-1.5 text-amber-400 font-semibold border-b border-amber-500/20 pb-1 text-center">
                        <span>{category.icon}</span>
                        <span className="tracking-wide text-[11px] uppercase ">{category.title}</span>
                    </div>
                    {/* Список технологій */}
                    <ul className="space-y-1 pl-1">
                        {category.skills.map((skill) => (
                            <li key={skill.name} className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                    <span className={skill.highlight ? "text-amber-400" : "text-amber-500/50"}>
                                        {skill.highlight ? "▶" : "•"}
                                    </span>
                                    <span className={`font-medium ${skill.highlight ? "text-amber-300 text-glow" : "text-amber-200"}`}>
                                        {skill.name}
                                    </span>
                                </div>
                                {/* Додатковий опис (якщо є) */}
                                {skill.detail && (
                                    <span className="pl-3.5 text-[10px] text-amber-500">
                                        {skill.detail}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}
export default StackList

