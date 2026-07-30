export interface StackItem {
  name: string;
  detail?: string;
  highlight?: boolean;
}

export interface StackCategory {
  id: string;
  title: string;
  icon: string;
  skills: StackItem[];
}

export interface EducationItem {
  id: string;
  period: string;
  title: string;
  institution: string;
  details: string[];
  status?: string;
}

export const STACK_DATA: StackCategory[] = [
  {
    id: "core",
    title: "CORE & FRAMEWORKS",
    icon: "🚀",
    skills: [
      { name: "Next.js 16", detail: "App Router, Server Actions, PPR", highlight: true },
      { name: "React 19 & TypeScript", detail: "Hooks, Types, Server Components", highlight: true },
      { name: "JavaScript (ES6+)", detail: "Async/Await, Modern APIs" },
      { name: "HTML5 & CSS3", detail: "Semantic markup & modern standards" },
    ],
  },
  {
    id: "styling",
    title: "STYLING & DESIGN SYSTEM",
    icon: "🎨",
    skills: [
      { name: "Tailwind CSS 4", detail: "Utility-first, Custom Themes, Animations", highlight: true },
      { name: "CSS Modules", detail: "Scoped component styling" },
      { name: "Responsive Layouts", detail: "Flexbox, CSS Grid, Mobile-First" },
    ],
  },
  {
    id: "backend",
    title: "BACKEND, DATABASE & AUTH",
    icon: "🛠️",
    skills: [
      { name: "Prisma ORM & MongoDB", detail: "Schema design, Atlas cloud DB", highlight: true },
      { name: "Auth.js v5 (NextAuth)", detail: "OAuth providers, Session security", highlight: true },
      { name: "REST API & Route Handlers", detail: "Endpoint development & Validation" },
    ],
  },
  {
    id: "tools",
    title: "DEV TOOLS & AI WORKFLOW",
    icon: "🤖",
    skills: [
      { name: "Git & GitHub Actions", detail: "Version control & CI/CD basics" },
      { name: "Visual Studio Code & Antigravity IDE", detail: "AI Pair Programming & Workflow", highlight: true },
      { name: "Claude Code & DevTools", detail: "Debugging & prompt engineering" },
    ],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "next16-course",
    period: "2026 (In Progress)",
    title: "Full-Stack Next.js 16 & React 19 Engineering",
    institution: "Practical Lab & Mentorship Course",
    details: [
      "App Router, Server Components & Client Boundaries",
      "Cache Components ('use cache', cacheTag, revalidateTag)",
      "Prisma ORM integration with MongoDB Atlas",
      "Auth.js v5 Authentication & RBAC Access Control",
      "Production Performance, Middleware & Vercel Deployment",
    ],
    status: "96% Complete",
  },
  {
    id: "self-learning",
    period: "2025 - 2026",
    title: "Modern Frontend Development",
    institution: "Self-Directed Practical Learning",
    details: [
      "JavaScript ES6+, Advanced DOM & Async Programming",
      "React Ecosystem (State Management, Hooks, Custom Hooks)",
      "TypeScript strict mode & interfaces",
      "Tailwind CSS",
    ],
    status: "Completed",
  },
  {
    id: "master-degree",
    period: "2018",
    title: "Master's Degree in Metrology & Information-Measuring Technology",
    institution: "Volodymyr Dahl East Ukrainian National University",
    details: [
      "Engineering & Information-Measurement Systems Degree",
    ],
    status: "Diploma",
  },
  {
    id: "bachelor-degree",
    period: "2013",
    title: "Bachelor's Degree in Computer Science (Informatics)",
    institution: "Volodymyr Dahl East Ukrainian National University",
    details: [
      "Core Higher Education in Computer Science & Software Fundamentals",
    ],
    status: "Diploma",
  },
];
