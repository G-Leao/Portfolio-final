import { Link } from "react-router-dom";
import { ROUTES } from "../lib/app-params";
import { Button } from "./ui/button";

export default function UserNotRegisteredError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">Account Not Found</h1>
      <p className="text-muted-foreground">
        This account is not registered. Please create a new account.
      </p>
      <div className="flex gap-4">
        <Link to={ROUTES.REGISTER}>
          <Button>Create Account</Button>
        </Link>
        <Link to={ROUTES.LOGIN}>
          <Button variant="outline">Try Again</Button>
        </Link>
      </div>
    </div>
  );
}
