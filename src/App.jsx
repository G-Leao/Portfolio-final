import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client";
import { AuthProvider } from "./lib/AuthContext";
import { ROUTES } from "./lib/app-params";
import FloatingNav from "./components/FloatingNav";
import ScrollToTop from "./components/ScrollToTop";
import ParticleField from "./components/ParticleField";
import AuthLayout from "./components/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./lib/PageNotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <ParticleField />
          <FloatingNav />
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.CONTACT} element={<Contact />} />
            <Route path={ROUTES.EXPERIENCE} element={<Experience />} />
            <Route path={ROUTES.PROJECTS} element={<Projects />} />

            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.REGISTER} element={<Register />} />
              <Route
                path={ROUTES.FORGOT_PASSWORD}
                element={<ForgotPassword />}
              />
              <Route
                path={`${ROUTES.RESET_PASSWORD}/:token`}
                element={<ResetPassword />}
              />
            </Route>

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen py-20 px-4">
                    <h1 className="text-4xl font-bold text-center">
                      Dashboard
                    </h1>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
