import { useMemo } from "react";
import { motion } from "framer-motion";

const PARTICLE_COUNT = 35;
const COLORS = [
  "rgba(59,130,246,", // blue-500
  "rgba(96,165,250,", // blue-400
  "rgba(147,197,253,", // blue-300
  "rgba(34,211,238,", // cyan-400
  "rgba(255,255,255,", // white
];

const TYPES = ["circle", "square", "diamond"];

function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 0.85 + Math.random() * 0.15, // start near right edge of logo
    y: 0.1 + Math.random() * 0.8, // spread vertically
    size: 1.5 + Math.random() * 2.5, // 1.5px to 4px
    duration: 3 + Math.random() * 4, // 3s to 7s
    delay: Math.random() * 6, // stagger start
    driftY: -15 + Math.random() * 30, // vertical drift -15px to +15px
    driftX: 20 + Math.random() * 40, // horizontal drift 20px to 60px
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    type: TYPES[Math.floor(Math.random() * TYPES.length)],
    glow: 2 + Math.random() * 4, // glow radius 2px to 6px
    opacityPeak: 0.4 + Math.random() * 0.6, // peak opacity 0.4 to 1.0
  }));
}

function Particle({ particle, isHovered }) {
  const speedMultiplier = isHovered ? 1.4 : 1;
  const glowMultiplier = isHovered ? 1.5 : 1;

  const shapeClass =
    particle.type === "circle"
      ? "rounded-full"
      : particle.type === "square"
        ? "rounded-[1px]"
        : "rotate-45 rounded-[1px]";

  return (
    <motion.div
      className={`absolute ${shapeClass}`}
      style={{
        left: `${particle.x * 100}%`,
        top: `${particle.y * 100}%`,
        width: particle.size,
        height: particle.size,
        background: `${particle.color}${particle.opacityPeak})`,
        boxShadow: `0 0 ${particle.glow * glowMultiplier}px ${particle.color}0.5)`,
        filter: `drop-shadow(0 0 ${particle.glow * glowMultiplier}px ${particle.color}0.3))`,
      }}
      animate={{
        x: [0, particle.driftX * speedMultiplier],
        y: [0, particle.driftY * speedMultiplier],
        opacity: [0, particle.opacityPeak, particle.opacityPeak * 0.7, 0],
        scale: [0.8, 1, 0.6],
      }}
      transition={{
        duration: particle.duration / speedMultiplier,
        delay: particle.delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.2, 0.8, 1],
      }}
    />
  );
}

export default function ParticleField({ isHovered }) {
  const particles = useMemo(() => generateParticles(PARTICLE_COUNT), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <Particle key={p.id} particle={p} isHovered={isHovered} />
      ))}
    </div>
  );
}
