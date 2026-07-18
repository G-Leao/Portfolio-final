import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="text-center px-6"
      >
        <div className="text-[10px] md:text-xs font-mono tracking-[0.35em] text-cyan-400/70 mb-8">
          CARREGANDO&nbsp;PORTFÓLIO
        </div>

        <div className="relative w-48 md:w-64 h-px bg-white/10 overflow-hidden mx-auto rounded-full">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
          />
        </div>

        <motion.h1
          className="mt-10 text-4xl md:text-6xl font-heading font-bold tracking-tight"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-300">
            GUSTAVO LEÃO
          </span>
        </motion.h1>

        <motion.div
          className="mt-4 text-xs font-mono tracking-[0.2em] text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          DESENVOLVEDOR&nbsp;FRONT-END
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
