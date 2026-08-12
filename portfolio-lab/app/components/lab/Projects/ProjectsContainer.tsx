import { PROJECTS_DATA } from "@/app/data/projectsData"
import ProjectIcon from "./ProjectIcon"

function ProjectsContainer() {
    return (
        <div className="border border-gold-deep/50 rounded-lg w-full h-full grid grid-cols-5 content-start gap-2 p-2  lg:flex lg:overflow-y-auto lg:flex-wrap lg:py-2 lg:px-2 lg:gap-2 lg:justify-center scrollbar-custom">
            {PROJECTS_DATA.map((p) => {
                return (
                    <ProjectIcon key={p.slug} project={p} />
                )
            })}

        </div>
    )
}

export default ProjectsContainer
