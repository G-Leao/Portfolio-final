import { useMemo, useState, useEffect, memo } from "react";
import { motion } from "framer-motion";

const COLORS = [
  "rgba(59,130,246,",   // blue-500
  "rgba(96,165,250,",   // blue-400
  "rgba(147,197,253,",  // blue-300
  "rgba(34,211,238,",   // cyan-400
  "rgba(255,255,255,",  // white
];

const TYPES = ["circle", "square", "diamond"];

function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 0.85 + Math.random() * 0.15,
    y: 0.1 + Math.random() * 0.8,
    size: 1 + Math.random() * 1.8,
    duration: 4 + Math.random() * 4,
    delay: Math.random() * 6,
    driftY: -12 + Math.random() * 24,
    driftX: 15 + Math.random() * 30,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    type: TYPES[Math.floor(Math.random() * TYPES.length)],
    glow: 1.5 + Math.random() * 2.5,
    opacityPeak: 0.25 + Math.random() * 0.35,
  }));
}

// Particle memoizado — só re-renderiza se suas props mudarem
const Particle = memo(function Particle({ particle, speedMultiplier, glowMultiplier }) {
  const shapeClass =
    particle.type === "circle"
      ? "rounded-full"
      : particle.type === "square"
        ? "rounded-[1px]"
        : "rotate-45 rounded-[1px]";

  // animate e transition definidos como objetos estáticos por partícula
  const animateState = useMemo(() => ({
    x: [0, particle.driftX * speedMultiplier],
    y: [0, particle.driftY * speedMultiplier],
    opacity: [0, particle.opacityPeak, particle.opacityPeak * 0.6, 0],
    scale: [0.8, 1, 0.6],
  }), [particle.driftX, particle.driftY, particle.opacityPeak, speedMultiplier]);

  const transitionState = useMemo(() => ({
    duration: particle.duration / speedMultiplier,
    delay: particle.delay,
    repeat: Infinity,
    ease: "easeInOut",
    times: [0, 0.2, 0.8, 1],
  }), [particle.duration, particle.delay, speedMultiplier]);

  return (
    <motion.div
      className={`absolute ${shapeClass}`}
      style={{
        left: `${particle.x * 100}%`,
        top: `${particle.y * 100}%`,
        width: particle.size,
        height: particle.size,
        background: `${particle.color}${particle.opacityPeak})`,
        boxShadow: `0 0 ${particle.glow * glowMultiplier}px ${particle.color}0.4)`,
        willChange: "transform, opacity",
      }}
      animate={animateState}
      transition={transitionState}
    />
  );
});

export default function ParticleField({ isHovered }) {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mq.removeEventListener("change", handler);
    };
  }, []);

  const particleCount = reducedMotion || isMobile ? 0 : 18;
  const particles = useMemo(() => generateParticles(particleCount), [particleCount]);

  const speedMultiplier = isHovered ? 1.3 : 1;
  const glowMultiplier = isHovered ? 1.3 : 1;

  if (particleCount === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <Particle
          key={p.id}
          particle={p}
          speedMultiplier={speedMultiplier}
          glowMultiplier={glowMultiplier}
        />
      ))}
    </div>
  );
}
