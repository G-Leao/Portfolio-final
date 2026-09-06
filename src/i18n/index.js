import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ptBR from "./locales/pt-BR.json";
import enUS from "./locales/en-US.json";

export const SUPPORTED_LANGS = ["pt-BR", "en-US"];
export const DEFAULT_LANG = "pt-BR";

const STORAGE_KEY = "portfolio-language";

function getBrowserLang() {
  if (typeof window === "undefined" || !window.navigator) return "";
  const nav = window.navigator;
  const raw = nav.language || (nav.languages && nav.languages[0]) || "";
  return raw.toLowerCase() || "";
}

function detectLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANG;

  // 1. Escolha manual persistida → prioridade máxima
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED_LANGS.includes(saved)) return saved;
  } catch {
    /* localStorage indisponível — segue para detecção */
  }

  // 2. Primeira visita → detecta o idioma do navegador
  const lang = getBrowserLang();
  if (lang.startsWith("pt")) return "pt-BR";
  if (lang.startsWith("en")) return "en-US";

  // 3. Qualquer outro idioma → padrão PT-BR
  return DEFAULT_LANG;
}

function applyDocumentMeta(lng) {
  if (typeof document === "undefined") return;
  const resources = lng === "en-US" ? enUS : ptBR;

  document.documentElement.setAttribute("lang", lng);

  const setMeta = (selector, value) => {
    const el = document.querySelector(selector);
    if (el && value) el.setAttribute("content", value);
  };

  if (resources.meta?.title) document.title = resources.meta.title;
  setMeta('meta[name="description"]', resources.meta?.description);
  setMeta('meta[name="keywords"]', resources.meta?.keywords);
  setMeta('meta[property="og:title"]', resources.meta?.ogTitle);
  setMeta('meta[property="og:description"]', resources.meta?.ogDescription);
  setMeta(
    'meta[property="og:locale"]',
    lng === "en-US" ? "en_US" : "pt_BR",
  );
}

// Persiste a escolha do usuário e atualiza meta tags de SEO a cada troca
i18n.on("languageChanged", (next) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignora falhas de storage */
  }
  applyDocumentMeta(next);
});

i18n.use(initReactI18next).init({
  resources: {
    "pt-BR": { translation: ptBR },
    "en-US": { translation: enUS },
  },
  lng: detectLanguage(),
  fallbackLng: DEFAULT_LANG,
  supportedLngs: SUPPORTED_LANGS,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  returnObjects: true,
});

applyDocumentMeta(i18n.language);

export default i18n;