import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const VARIANTS = {
  primary:
    "bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:shadow-xl",
  secondary:
    "border border-white/15 text-slate-200 hover:border-cyan-400/40 hover:text-cyan-300 backdrop-blur-sm bg-white/[0.02]",
  ghost: "text-slate-400 hover:text-cyan-300",
};

// spring config definida fora para não recriar a cada render
const SPRING_CONFIG = { stiffness: 300, damping: 20 };

export default function MagneticButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  }, [x, y]);

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      type={type}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300 cursor-pointer focus:outline-none ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
