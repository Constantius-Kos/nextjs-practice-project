import { Project } from "@/types/shared"
import BackButton from "../../ui/BackButton"
import Image from "next/image"
import Link from "next/link"

type ProjectCardProps = {
    project: Project
}


function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="debug-1 p-2 flex flex-col items-start  justify-start gap-2 w-full  sm:w-4/5 sm:h-auto sm:aspect-square sm:mx-auto animate-fade-in lg:w-150 lg:max-h-full lg:mx-auto ">
            <BackButton />
            <div className="border border-gold-deep/50 rounded-lg flex p-2 gap-2 flex-col w-full aspect-3/4  min-h-0 bg-gold-custom lg:p-6 lg:gap-5 ">
                {/* іконка */}
                <div className=" flex justify-center self-center rounded-lg  h-1/3">
                    <Image className="h-full aspect-square w-auto filter-[drop-shadow(0_0_5px_var(--gold-deep))] object-contain" src={project?.icon} width={64} height={64} alt="img"></Image>
                </div>
                {/* опис */}
                <div className=" font-jetBrains-mono text-center flex min-h-0 p-2 rounded-2xl  flex-1 overflow-auto bg-black scrollbar-custom">
                    {project.description}
                </div>
                <div className="flex justify-around h-fit p-1 font-jetBrains-mono">
                    {project.gitHub ? <Link className="p-3 border border-gold-deep  flex w-1/3 rounded-2xl justify-center hover:bg-gold-deep/10 " href={project.gitHub} target="_blank" rel="noopener noreferrer">GitHub</Link> : <button className=" p-3 border border-gold-deep  flex w-1/3 rounded-2xl justify-center cursor-not-allowed text-gray-500 bg-gray-400 ">GitHub</button>}
                    {project.link ? <Link className=" p-3 border border-gold-deep  flex w-1/3 rounded-2xl justify-center hover:bg-gold-deep/10 " href={project.link} target="_blank" rel="noopener noreferrer">Link</Link> : <button className=" p-3  border border-gold-deep  flex w-1/3 rounded-2xl justify-center cursor-not-allowed text-gray-500 bg-gray-400 ">Link</button>}

                </div>
            </div>
        </div>
    )
}

export default ProjectCard
