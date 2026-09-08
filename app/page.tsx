import Nav from "@/components/Nav";
import HeroReel from "@/components/HeroReel";
import About from "@/components/About";
import ProjectShowcase from "@/components/ProjectShowcase";
import OtherProjects from "@/components/OtherProjects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div id="top" className="flex flex-1 flex-col">
      <Nav />
      <HeroReel />
      <About />
      <ProjectShowcase />
      <OtherProjects />
      <Skills />
      <Contact />
    </div>
  );
}
