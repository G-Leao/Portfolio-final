import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, Check } from "lucide-react";
import logoImg from "@/assets/img/logoGustavo.png";

const SOCIALS = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:dev.g.leao@gmail.com",
    value: "dev.g.leao@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gustavo-leaodev/",
    value: "/in/gustavo-leaodev/",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/G-Leao",
    value: "@G-Leao",
  },
];

export default function Contact({ onNavigate }) {
  const [role, setRole] = useState("");
  const [project, setProject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const totalChars = role.length + project.length + message.length;
  const glow = Math.min(totalChars / 120, 1);
  const isReady = role.trim() && project.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isReady) return;
    const subject = encodeURIComponent(`Contato: ${role}`);
    const body = encodeURIComponent(`Projeto: ${project}\n\n${message}`);
    window.location.href = `mailto:dev.g.leao@gmail.com.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-24 pb-28 md:pb-24">
      {/* Logo no canto superior esquerdo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="absolute top-6 left-6 md:top-8 md:left-10 lg:left-16 z-10"
      >
        <img
          src={logoImg}
          alt="Gustavo Leão"
          className="h-6 md:h-10 w-auto object-contain"
        />
      </motion.div>

      {/* Dynamic glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: 0.15 + glow * 0.45 }}
        transition={{ duration: 0.4 }}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.15), transparent 55%)",
        }}
      />

      <div className="relative max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-12"
        >
          <div className="text-[10px] font-mono tracking-[0.3em] text-cyan-400/80 mb-4">
            CONTATOS
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95] mb-6">
            Vamos construir <span className="text-gradient">algo</span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
            Tem um projeto em mente? Entre em contato e retornarei em até 48
            horas.
          </p>
        </motion.div>

        {/* Terminal-style form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 md:p-9"
        >
          <div className="flex items-center gap-1.5 mb-6 pb-5 border-b border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/40" />
            <span className="ml-3 text-[11px] font-mono text-slate-500">
              ~/contato — bash
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-cyan-400/70 mb-2">
                Você está procurando
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="um desenvolvedor front-end"
                className="w-full bg-transparent border-b border-white/10 focus:border-cyan-400/50 outline-none py-2.5 text-lg text-slate-100 placeholder:text-slate-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-cyan-400/70 mb-2">
                para ajudar com
              </label>
              <input
                type="text"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="um projeto web"
                className="w-full bg-transparent border-b border-white/10 focus:border-cyan-400/50 outline-none py-2.5 text-lg text-slate-100 placeholder:text-slate-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-cyan-400/70 mb-2">
                contexto adicional
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Conte-me sobre o projeto, prazo..."
                rows={3}
                className="w-full bg-transparent border border-white/10 focus:border-cyan-400/50 rounded-xl outline-none py-3 px-4 text-sm text-slate-100 placeholder:text-slate-600 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!isReady || sent}
              className="relative w-full overflow-hidden flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-indigo-500 transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-2 text-slate-950">
                {sent ? (
                  <>
                    <Check className="w-4 h-4" /> Mensagem Enviada
                  </>
                ) : (
                  <>
                    Enviar Mensagem <Send className="w-4 h-4" />
                  </>
                )}
              </span>
            </button>
          </div>
        </motion.form>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-8 grid grid-cols-3 gap-3"
        >
          {SOCIALS.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-400/20 hover:bg-white/[0.04] transition-colors duration-300"
              >
                <Icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-300 transition-colors duration-300" />
                <div className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                  {s.value}
                </div>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
