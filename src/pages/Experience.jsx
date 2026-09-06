import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Sparkles,
  GitCommit,
  GitMerge,
  GitBranch,
  Plus,
  ChevronDown,
  Award,
} from "lucide-react";
import logoImg from "@/assets/img/logoGustavo.png";
import ParticleField from "@/components/ParticleField";

// gera um hash curto tipo git a partir do texto (determinístico)
function shortHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(16).slice(0, 7).padEnd(7, "0");
}

function CommitNode({ item, index, branchColor, isLast, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const hash = shortHash(item.role + item.period);

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="relative"
    >
      {/* linha conectando ao próximo commit */}
      {!isLast && (
        <div
          className="absolute left-[7px] top-5 w-px bg-white/10"
          style={{ height: "calc(100% + 8px)" }}
        />
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="group relative flex w-full items-start gap-3 py-2 text-left"
      >
        {/* nó do commit */}
        <span
          className="relative mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-[#020617] transition-all duration-300 group-hover:scale-125"
          style={{
            background: branchColor,
            boxShadow: `0 0 10px ${branchColor}`,
          }}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] text-slate-500">{hash}</span>
            <span className="text-sm font-semibold text-slate-100 group-hover:text-cyan-200 transition-colors">
              {item.role}
            </span>
            {item.highlight && (
              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-cyan-300">
                <Sparkles className="w-2.5 h-2.5" />
                HEAD
              </span>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-[11px] font-mono text-slate-500">
            <span>{item.company}</span>
            <span className="text-slate-700">·</span>
            <span>{item.period}</span>
          </div>
        </div>

        <ChevronDown
          className={`mt-1.5 w-3.5 h-3.5 text-slate-600 transition-transform duration-300 shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* diff expandido */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden pl-[26px]"
          >
            <div className="mb-3 rounded-lg border border-white/5 bg-black/30 p-3 font-mono text-[12px] leading-relaxed">
              <div className="mb-2 text-slate-500"># {item.desc}</div>
              {item.achievements?.map((a) => (
                <div key={a} className="flex items-start gap-1.5 text-emerald-400/80">
                  <Plus className="w-3 h-3 mt-0.5 shrink-0" />
                  <span className="text-slate-300">{a}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function BranchLog({ title, items, branchColor, branchLabel }) {
  return (
    <div className="relative">
      <div className="mb-5 flex items-center gap-2">
        <GitBranch className="w-3.5 h-3.5" style={{ color: branchColor }} />
        <h3 className="text-sm font-mono tracking-[0.15em] text-slate-300 uppercase">{title}</h3>
        <span
          className="ml-auto rounded-md border px-2 py-0.5 font-mono text-[10px]"
          style={{ borderColor: `${branchColor}33`, color: branchColor }}
        >
          {branchLabel}
        </span>
      </div>
      <div className="space-y-0">
        {items.map((item, i) => (
          <CommitNode
            key={item.period + item.role}
            item={item}
            index={i}
            branchColor={branchColor}
            isLast={i === items.length - 1}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </div>
  );
}

function CertificationTags({ items, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="border-t border-white/5 px-6 md:px-8 py-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <Award className="w-3.5 h-3.5 text-indigo-300" />
        <h3 className="text-sm font-mono tracking-[0.15em] text-slate-300 uppercase">
          {t("experience.certifications")}
        </h3>
        <span className="ml-auto rounded-md border border-indigo-400/20 px-2 py-0.5 font-mono text-[10px] text-indigo-300">
          tags --list
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((cert) => (
          <span
            key={cert}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[11px] font-mono text-slate-400 hover:border-indigo-400/30 hover:text-indigo-200 transition-colors duration-300"
          >
            <span className="text-indigo-400/70">v</span>
            {cert}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Experience({ onNavigate }) {
  const { t } = useTranslation();
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const ROLES = [t("experience.roles.salesConsultant", { returnObjects: true })];
  const EDUCATION = [
    t("experience.education.softwareEngineering", { returnObjects: true }),
    t("experience.education.itProjectManagement", { returnObjects: true }),
    t("experience.education.complementary", { returnObjects: true }),
  ];
  const CERTIFICATIONS = t("experience.certificationsList", { returnObjects: true });

  return (
    <section className="relative w-full min-h-screen py-24 md:py-28 px-6 md:px-10 lg:px-16">
      {/* Two-column Hero */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="text-[10px] font-mono tracking-[0.3em] text-cyan-400/80 mb-3">
              {t("experience.sectionLabel")}
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95] mb-6">
              {t("experience.titleStart")}{" "}
              <span className="text-gradient">{t("experience.titleHighlight")}</span>
            </h2>
            <p className="text-slate-400 leading-relaxed max-w-md text-[15px]">
              {t("experience.description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div
              className="relative"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <div className="absolute -inset-6 rounded-full bg-blue-400/20 blur-3xl" />
              <div className="absolute -inset-3 rounded-full bg-blue-500/10 blur-2xl" />
              <ParticleField isHovered={isLogoHovered} />
              <div className="relative">
                <img
                  src={logoImg}
                  alt="Gustavo Leão"
                  className="h-8 md:h-20 w-auto object-contain"
                  style={{
                    filter:
                      "drop-shadow(0 0 25px rgba(59,130,246,0.30)) drop-shadow(0 0 60px rgba(59,130,246,0.15))",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Git log terminal */}
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
          <div className="flex items-center gap-1.5 px-6 md:px-8 py-4 border-b border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/40" />
            <span className="ml-3 flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
              <GitCommit className="w-3 h-3" /> git log --graph --all
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-10 px-6 md:px-8 py-8">
            <BranchLog
              title={t("experience.branchProfessional")}
              items={ROLES}
              branchColor="#22d3ee"
              branchLabel="career"
            />
            <BranchLog
              title={t("experience.branchEducation")}
              items={EDUCATION}
              branchColor="#818cf8"
              branchLabel="academic"
            />
          </div>

          <CertificationTags items={CERTIFICATIONS} t={t} />

          {/* Merge commit */}
          <motion.button
            onClick={() => onNavigate("contact")}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="group flex w-full items-center gap-3 border-t border-white/5 bg-white/[0.02] px-6 md:px-8 py-5 text-left transition-colors hover:bg-white/[0.04]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 border border-white/10">
              <GitMerge className="h-4 w-4 text-cyan-300" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-mono text-[11px] text-slate-500">
                merge <span className="text-cyan-400">career</span> +{" "}
                <span className="text-indigo-400">academic</span> → main
              </div>
              <div className="text-sm font-semibold text-slate-100 group-hover:text-cyan-200 transition-colors">
                {t("experience.mergeText")}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-cyan-300 shrink-0 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}