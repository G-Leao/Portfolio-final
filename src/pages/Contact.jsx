import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail, Linkedin, Github, Copy, Check, Terminal as TerminalIcon } from "lucide-react";
import logoImg from "@/assets/img/logoGustavo.png";

const CONTACT_DATA = {
  email: "dev.g.leao@gmail.com",
  linkedin: "https://www.linkedin.com/in/gustavo-leaodev/",
  github: "https://github.com/G-Leao",
};

const COMMANDS = ["help", "whoami", "skills", "contact", "email", "linkedin", "github", "clear"];

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________";

// Efeito de "decrypt" tipo hacker revelando texto
function useDecrypt(target, trigger) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = 18;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealCount = Math.floor(target.length * progress);
      const scrambled = target
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < revealCount) return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setText(scrambled);
      if (frame >= totalFrames) {
        setText(target);
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [trigger, target]);
  return text;
}

function DecryptLine({ value, icon: Icon, href, copyable }) {
  const decrypted = useDecrypt(value, true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex items-center gap-3 py-1.5 group">
      <Icon className="w-3.5 h-3.5 text-cyan-400/70 shrink-0" />
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="text-sm font-mono text-slate-100 tracking-wide hover:text-cyan-300 transition-colors"
      >
        {decrypted}
      </a>
      {copyable && (
        <button
          onClick={handleCopy}
          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-cyan-300"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      )}
    </div>
  );
}

function CommandOutput({ cmd, t }) {
  switch (cmd) {
    case "help":
      return (
        <div className="text-slate-400 space-y-0.5">
          <div>{t("contact.helpCommand")}</div>
          <div className="pl-4 text-slate-500">
            {COMMANDS.map((c) => (
              <div key={c}>
                <span className="text-cyan-400/80">$</span> {c}
              </div>
            ))}
          </div>
        </div>
      );
    case "whoami":
      return (
        <div className="text-slate-300 leading-relaxed">
          {t("contact.whoami", { returnObjects: true }).map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 ? <br /> : null}
            </span>
          ))}
        </div>
      );
    case "skills":
      return <div className="text-slate-300">{t("contact.skills")}</div>;
    case "contact":
      return (
        <div className="space-y-1">
          <DecryptLine value={CONTACT_DATA.email} icon={Mail} href={`mailto:${CONTACT_DATA.email}`} copyable />
          <DecryptLine value="/in/gustavo-leaodev/" icon={Linkedin} href={CONTACT_DATA.linkedin} />
          <DecryptLine value="@G-Leao" icon={Github} href={CONTACT_DATA.github} />
        </div>
      );
    case "email":
      return (
        <DecryptLine value={CONTACT_DATA.email} icon={Mail} href={`mailto:${CONTACT_DATA.email}`} copyable />
      );
    case "linkedin":
      return (
        <DecryptLine value="/in/gustavo-leaodev/" icon={Linkedin} href={CONTACT_DATA.linkedin} />
      );
    case "github":
      return <DecryptLine value="@G-Leao" icon={Github} href={CONTACT_DATA.github} />;
    default:
      return null;
  }
}

export default function Contact({ onNavigate }) {
  const { t } = useTranslation();
  const [history, setHistory] = useState([
    { type: "system", i18nKey: "contact.boot" },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  const runCommand = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory((h) => [...h, cmd]);
    setHistoryIndex(-1);

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    setHistory((h) => [...h, { type: "input", content: cmd }]);

    if (cmd === "help" || cmd === "whoami" || cmd === "skills" || cmd === "contact" || cmd === "email" || cmd === "linkedin" || cmd === "github") {
      setHistory((h) => [...h, { type: "output", cmd }]);
    } else {
      setHistory((h) => [
        ...h,
        {
          type: "error",
          i18nKey: "contact.commandError",
          params: { cmd },
        },
      ]);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(cmdHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[nextIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <section
      className="relative w-full h-screen overflow-hidden flex items-center justify-center px-6 py-10"
      onClick={() => inputRef.current?.focus()}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="absolute top-6 left-6 md:top-8 md:left-10 lg:left-16 z-10"
      >
        <img src={logoImg} alt="Gustavo Leão" className="h-6 md:h-10 w-auto object-contain" />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.15), transparent 55%)",
        }}
      />

      <div className="relative max-w-2xl w-full h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-6 shrink-0"
        >
          <div className="text-[10px] font-mono tracking-[0.3em] text-cyan-400/80 mb-3">{t("contact.sectionLabel")}</div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[0.95] mb-3">
            {t("contact.title")}{" "}
            <span className="text-gradient">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto leading-relaxed text-sm">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden flex flex-col flex-1 min-h-0"
        >
          <div className="flex items-center gap-1.5 px-7 md:px-9 py-4 border-b border-white/5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/40" />
            <span className="ml-3 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
              <TerminalIcon className="w-3 h-3" /> {t("contact.terminalTitle")}
            </span>
          </div>

          <div ref={scrollRef} className="px-7 md:px-9 py-6 font-mono text-[13px] space-y-2 flex-1 min-h-0 overflow-y-auto">
            {history.map((item, i) => (
              <div key={i}>
                {item.type === "system" && <div className="text-slate-500">{t(item.i18nKey)}</div>}
                {item.type === "input" && (
                  <div className="text-slate-300">
                    <span className="text-cyan-400">$</span> {item.content}
                  </div>
                )}
                {item.type === "output" && (
                  <div>
                    <CommandOutput cmd={item.cmd} t={t} />
                  </div>
                )}
                {item.type === "error" && (
                  <div className="text-rose-400/80">{t(item.i18nKey, item.params)}</div>
                )}
              </div>
            ))}

            <div className="flex items-center gap-2 pt-1">
              <span className="text-cyan-400">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                spellCheck={false}
                className="flex-1 bg-transparent outline-none text-slate-100 caret-cyan-400"
                placeholder={t("contact.placeholder")}
              />
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-4 bg-cyan-400/70 inline-block"
              />
            </div>
          </div>

          <div className="px-7 md:px-9 py-3 border-t border-white/5 flex flex-wrap gap-2 shrink-0">
            {["contact", "email", "skills"].map((c) => (
              <button
                key={c}
                onClick={() => {
                  runCommand(c);
                  inputRef.current?.focus();
                }}
                className="text-[10px] font-mono px-2.5 py-1 rounded-md border border-white/10 text-slate-500 hover:text-cyan-300 hover:border-cyan-400/30 transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}