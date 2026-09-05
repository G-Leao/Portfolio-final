import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target moderno — menor bundle, sem polyfills desnecessários
    target: "es2020",
    // Aumentar aviso de chunk (padrão 500kb é conservador)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Code splitting manual por categoria de dependência
        manualChunks: (id) => {
          // Framer Motion em chunk separado — grande mas muito cacheável
          if (id.includes("node_modules/framer-motion")) {
            return "framer-motion";
          }
          // Ícones separados (react-icons é pesado)
          if (id.includes("node_modules/react-icons")) {
            return "icons";
          }
          // Radix UI agrupado
          if (id.includes("node_modules/@radix-ui")) {
            return "radix";
          }
          // Lucide separado
          if (id.includes("node_modules/lucide-react")) {
            return "lucide";
          }
          // Resto do vendor
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  // Otimizar deps que o Vite pré-bundleia
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "react-router-dom",
      "lucide-react",
    ],
  },
});
