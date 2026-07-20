import { motion } from "framer-motion";
import logoImg from "@/assets/img/logoGustavo.png";
import {
  Home as HomeIcon,
  User,
  FolderGit2,
  Briefcase,
  Mail,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Início", icon: HomeIcon },
  { id: "about", label: "Sobre", icon: User },
  { id: "projects", label: "Projetos", icon: FolderGit2 },
  { id: "experience", label: "Experiência", icon: Briefcase },
  { id: "contact", label: "Contato", icon: Mail },
];

export default function FloatingNav({
  activePage,
  onNavigate,
  showLogo = false,
  fixed = true,
}) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`
        ${fixed ? "fixed bottom-0 left-0 right-0 md:top-5 md:left-1/2 md:-translate-x-1/2 md:bottom-auto z-50" : "w-full max-w-4xl mx-auto"}
        flex items-center ${showLogo ? "justify-between" : "justify-center"}
      `}
      aria-label="Primary navigation"
    >
      {/* Logo - apenas na Home */}
      {showLogo && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer hidden md:block"
        >
          <img
            src={logoImg}
            alt="Gustavo Leão"
            className="h-8 md:h-12 w-auto object-contain"
          />
        </motion.div>
      )}

      {/* Menu de Navegação */}
      <div className="flex items-center gap-0.5 px-1 md:px-2 py-1 md:py-2 rounded-none md:rounded-2xl border-t md:border border-white/10 bg-[#020617]/95 md:bg-white/[0.04] backdrop-blur-2xl shadow-2xl shadow-black/40 w-full md:w-auto justify-center">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative flex-1 md:flex-none px-2 md:px-4 py-3 md:py-2 rounded-xl text-sm font-medium transition-colors duration-300 group focus:outline-none"
              aria-current={isActive ? "page" : undefined}
              aria-label={item.label}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/15 border border-cyan-400/30"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className={`relative z-10 flex flex-col md:flex-row items-center gap-0.5 md:gap-2 transition-colors duration-300 ${
                  isActive
                    ? "text-cyan-300"
                    : "text-slate-500 group-hover:text-slate-100"
                }`}
              >
                <Icon className="w-5 h-5 md:w-4 md:h-4" />
                <span className="text-[10px] md:text-sm leading-tight md:inline">
                  {item.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
