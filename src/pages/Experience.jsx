import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const experiences = [
  {
    title: "Senior Developer",
    company: "Tech Corp",
    period: "2022 - Present",
    description:
      "Led development of microservices architecture and mentored junior developers.",
    tags: ["React", "Node.js", "AWS"],
  },
  {
    title: "Full Stack Developer",
    company: "Startup Inc",
    period: "2020 - 2022",
    description: "Built and maintained multiple client-facing applications.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    title: "Junior Developer",
    company: "Web Agency",
    period: "2018 - 2020",
    description:
      "Developed responsive websites and contributed to internal tools.",
    tags: ["JavaScript", "React", "CSS"],
  },
];

export default function Experience() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Experience</h1>
          <p className="text-xl text-muted-foreground">
            My professional journey
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <Card key={exp.title}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{exp.title}</CardTitle>
                    <CardDescription>{exp.company}</CardDescription>
                  </div>
                  <Badge variant="outline">{exp.period}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
