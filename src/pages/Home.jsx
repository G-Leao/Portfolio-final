import { useAuth } from "../lib/AuthContext";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "../lib/app-params";
import CubeStage from "../components/CubeStage";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <CubeStage />
      </div>
      <div className="relative z-10 text-center space-y-6 px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Welcome to <span className="text-primary">base44</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A modern portfolio built with React, Tailwind CSS, and shadcn/ui
        </p>
        <div className="flex items-center justify-center gap-4">
          {isAuthenticated ? (
            <Link to={ROUTES.ABOUT}>
              <Button size="lg">Explore</Button>
            </Link>
          ) : (
            <>
              <Link to={ROUTES.LOGIN}>
                <Button size="lg">Get Started</Button>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button variant="outline" size="lg">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
