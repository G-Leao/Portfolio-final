import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    title: "Project Alpha",
    description: "A full-stack application built with Next.js and PostgreSQL",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    links: [
      { label: "Live Demo", url: "#" },
      { label: "Source Code", url: "#" },
    ],
  },
  {
    title: "Project Beta",
    description: "Real-time dashboard with WebSocket integration",
    tags: ["React", "Node.js", "WebSocket"],
    links: [
      { label: "Live Demo", url: "#" },
      { label: "Source Code", url: "#" },
    ],
  },
  {
    title: "Project Gamma",
    description: "Mobile-first e-commerce platform",
    tags: ["React Native", "GraphQL", "Stripe"],
    links: [
      { label: "Live Demo", url: "#" },
      { label: "Source Code", url: "#" },
    ],
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Projects</h1>
          <p className="text-xl text-muted-foreground">
            Some things I have built
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
