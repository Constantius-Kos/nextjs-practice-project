import { PROJECTS_DATA } from "@/app/data/projectsData";
import { notFound } from "next/navigation";
import ProjectCard from "@/app/components/lab/Projects/ProjectCard";

interface IProps {
    params: Promise<{ slug: string }>
}


export async function generateStaticParams() {
    return PROJECTS_DATA.map((project) => ({ slug: project.slug }))
}

export default async function ProjectPage({ params }: IProps) {
    const { slug } = await params
    const project = PROJECTS_DATA.find((p) => p.slug === slug)
    if (!project) { notFound() }
    console.log('ProjectPage: project:', project);
    return (
        <div className="debug-blue flex min-h-0 flex-1 items-start  p-4 lg:py-4">

            <ProjectCard project={project} />
        </div>
    )
}


