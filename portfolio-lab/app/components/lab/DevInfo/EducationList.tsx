import { EDUCATION_DATA } from "@/app/data/labData"
function EducationList() {
    return (
        <div className="flex-1 overflow-y-auto scrollbar-custom space-y-3 p-1 font-jetBrains-mono text-xs">
            {EDUCATION_DATA.map((item) => (
                <div
                    key={item.id}
                    className="bg-black/30 border border-gold-deep/20 rounded p-2 flex flex-col gap-1.5 backdrop-blur-xs"
                >
                    {/* Період та Статус */}
                    <div className="flex items-center justify-between text-[10px]">
                        <span className="text-amber-500/60">{item.period}</span>
                        {item.status && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px]">
                                {item.status}
                            </span>
                        )}
                    </div>
                    {/* Назва курсу / Освіти */}
                    <div className="font-bold text-amber-300 text-glow text-[11px]">
                        {item.title}
                    </div>
                    <div className="text-[10px] text-amber-400/70 italic">
                        {item.institution}
                    </div>
                    {/* Пункти програм */}
                    <ul className="space-y-0.5 pt-1 pl-1">
                        {item.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-1 text-[10px] text-amber-200/70">
                                <span className="text-amber-500/40">├</span>
                                <span>{detail}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}
export default EducationList