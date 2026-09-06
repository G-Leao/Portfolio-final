import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "pt-BR", labelKey: "language.ptBR" },
  { code: "en-US", labelKey: "language.en" },
];

/**
 * Seletor de idioma compacto, integrado ao design atual (pill com glassmorphism
 * e animação de layoutId idêntica à do indicador de nav ativa).
 */
export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const handleChange = (code) => {
    if (i18n.language === code) return;
    i18n.changeLanguage(code);
  };

  return (
    <div
      role="group"
      aria-label={t("language.selectorLabel")}
      className="fixed top-4 right-4 md:top-5 md:right-6 z-[60]"
    >
      <div className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-[#020617]/80 backdrop-blur-2xl shadow-2xl shadow-black/40">
        {LANGS.map((lang) => {
          const isActive = i18n.language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleChange(lang.code)}
              aria-pressed={isActive}
              aria-label={t(lang.labelKey)}
              title={t(lang.labelKey)}
              className="relative px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-mono tracking-[0.15em] uppercase transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-1 focus-visible:ring-offset-[#020617]"
            >
              {isActive && (
                <motion.span
                  layoutId="lang-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/25 to-indigo-500/15 border border-cyan-400/40"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  isActive
                    ? "text-cyan-300"
                    : "text-slate-500 hover:text-slate-100"
                }`}
              >
                {lang.code === "pt-BR"
                  ? t("language.ptBRShort")
                  : t("language.enShort")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}