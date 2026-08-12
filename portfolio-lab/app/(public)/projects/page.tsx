import { redirect } from 'next/navigation';
export default function ProjectsIndexPage() {
    // Відправляємо на головну у вкладку проєктів
    redirect('/?view=projects');
}