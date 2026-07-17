export default function About() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A passionate developer creating beautiful and functional web
            experiences
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Background</h2>
            <p className="text-muted-foreground">
              With years of experience in web development, I specialize in
              building modern applications using React, Node.js, and cloud
              technologies.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Tailwind CSS",
                "PostgreSQL",
                "Docker",
                "AWS",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
