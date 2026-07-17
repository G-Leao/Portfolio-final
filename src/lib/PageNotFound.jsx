import { Link } from "react-router-dom";
import { ROUTES } from "./app-params";
import { Button } from "../components/ui/button";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl text-muted-foreground">Page not found</p>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link to={ROUTES.HOME}>
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
