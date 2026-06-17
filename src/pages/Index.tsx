import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import CurrentlySection from "@/components/CurrentlySection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";

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

      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <CurrentlySection />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
