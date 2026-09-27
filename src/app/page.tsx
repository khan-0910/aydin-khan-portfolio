import Navigation from "@/components/system/Navigation";
import Provider from "@/components/system/Provider";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import Activities from "@/components/activities/Activities";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <Provider>
      <Navigation />
      <main className="theme-mat">
        <Hero />
        <About />
        <Skills />
        <ProjectShowcase />
        <Activities />
        <Contact />
      </main>
    </Provider>
  );
}
