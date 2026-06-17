import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 — {siteConfig.name}</title>
        <meta name="description" content="Page not found." />
      </Helmet>
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-sm uppercase tracking-widest text-primary mb-3">404</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Not found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has moved.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center h-10 px-5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            Back to home
          </a>
        </div>
      </main>
    </>
  );
};

export default NotFound;
