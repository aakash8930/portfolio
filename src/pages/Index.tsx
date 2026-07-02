import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { siteConfig } from "@/lib/site-config";

// The 3D scene is the heaviest chunk — lazy-load it so first paint is instant.
const Scene = lazy(() => import("@/components/three/Scene"));

const Index = () => {
  return (
    <>
      <Helmet>
        <title>{siteConfig.name} — {siteConfig.role}</title>
        <meta name="description" content={siteConfig.shortBio} />
        <meta property="og:title" content={`${siteConfig.name} — ${siteConfig.role}`} />
        <meta property="og:description" content={siteConfig.shortBio} />
        <meta property="og:url" content="/" />
      </Helmet>

      <SmoothScroll />

      <div className="relative min-h-screen">
        {/* Fixed 3D particle field behind everything. */}
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        {/* Film grain overlay above the canvas, below content. */}
        <div className="grain pointer-events-none fixed inset-0 z-[1]" aria-hidden="true" />

        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
