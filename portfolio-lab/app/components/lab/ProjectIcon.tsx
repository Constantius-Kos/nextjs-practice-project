import Image from 'next/image';
import type { Project } from '@/types/shared';
function ProjectIcon({ project }: { project: Project }) {
    return (
        <div className=" lg:h-[calc(50%-0.375rem)] aspect-square shrink-0">
            <Image
                src={project.icon}
                alt={project.name}
                width={64}
                height={64}
                className=" w-full h-full object-contain  rounded-3xl filter-[drop-shadow(0_0_5px_var(--gold-deep))]"
            />
        </div>
    );
}

export default ProjectIcon