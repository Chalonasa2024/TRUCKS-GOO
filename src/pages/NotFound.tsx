
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-6 text-xl text-foreground">Oops! Page not found</p>
        <p className="mb-8 text-muted-foreground">
          We couldn't find the page you're looking for.
        </p>
        <Link to="/">
          <Button size="lg">Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
