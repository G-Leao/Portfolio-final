import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { ROUTES } from "../lib/app-params";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6">
        <Outlet />
      </div>
    </div>
  );
}
