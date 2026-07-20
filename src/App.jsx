import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import { AuthProvider } from "@/lib/AuthContext";
import { AnimatePresence } from "framer-motion";
import ParticleField from "@/components/ParticleField";
import FloatingNav from "@/components/FloatingNav";
import CubeStage from "@/components/CubeStage";
import Loader from "@/components/Loader";

function Experience() {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (page) => setActivePage(page);

  return (
    <div className="relative min-h-screen w-full bg-[#020617] text-slate-100">
      {/* Ambient gradient layers */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.06), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(99,102,241,0.08), transparent 60%), radial-gradient(ellipse 50% 40% at 10% 60%, rgba(99,102,241,0.04), transparent 60%)",
        }}
      />
      {/* Subtle grid texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <ParticleField />

      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>

      {!loading && (
        <>
          <FloatingNav
            activePage={activePage}
            onNavigate={handleNavigate}
            showLogo={activePage === "projects"}
          />
          <div className="relative pb-16 md:pb-0" style={{ zIndex: 2 }}>
            <CubeStage activePage={activePage} onNavigate={handleNavigate} />
          </div>

          {/* Corner brand mark - hidden on mobile to avoid nav overlap */}
          <div className="fixed bottom-20 md:bottom-5 left-4 md:left-6 z-40 pointer-events-none">
            <div className="text-[10px] font-mono tracking-[0.3em] text-slate-600">
              Gustavo Leão © 2026
            </div>
          </div>
          {/* Corner status */}
          <div className="fixed bottom-20 md:bottom-5 right-4 md:right-6 z-40 pointer-events-none hidden md:block">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-pulse-glow" />
              SYSTEM ONLINE
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <Routes>
            <Route path="/" element={<Experience />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
