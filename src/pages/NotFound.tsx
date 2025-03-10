
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md p-6">
        <XCircle className="h-16 w-16 mx-auto mb-4 text-orange-500" />
        <h1 className="text-2xl font-bold mb-4">Hmm...this page doesn't exist</h1>
        <p className="text-muted-foreground mb-6">
          Why not try a search or return to the home page?
        </p>
        <Button asChild className="rounded-full font-bold bg-orange-500 hover:bg-orange-600">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
