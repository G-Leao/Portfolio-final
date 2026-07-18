import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mvY, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mvX.set((e.clientX - rect.left) / rect.width - 0.5);
      mvY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mvX, mvY],
  );

  const reset = useCallback(() => {
    mvX.set(0);
    mvY.set(0);
  }, [mvX, mvY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onHoverEnd={reset}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1 + index * 0.1,
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="group relative snap-start shrink-0 w-[85vw] sm:w-[420px] rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden hover:border-cyan-400/25 transition-colors duration-500"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider text-cyan-300 border border-cyan-400/30 bg-[#020617]/60 backdrop-blur-md">
            {project.category}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-7">
          <h3 className="text-xl md:text-2xl font-heading font-semibold tracking-tight text-slate-50 mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-5">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono text-indigo-300/80 bg-indigo-500/5 border border-indigo-400/10"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-300 border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors duration-300"
            >
              <Github className="w-4 h-4" /> Code
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-500 font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" /> Live
            </a>
          </div>
        </div>

        {/* Glow border on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(34,211,238,0.15), 0 0 40px rgba(34,211,238,0.08)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
