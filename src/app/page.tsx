import Navigation from "@/components/system/Navigation";
import Provider from "@/components/system/Provider";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import DnaSection from "@/components/dna/DnaSection";
import Skills from "@/components/skills/Skills";
import LearningStrip from "@/components/skills/LearningStrip";
import ProjectsSection from "@/components/projects/ProjectsSection";
import Activities from "@/components/activities/Activities";
import Interests from "@/components/interests/Interests";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <Provider>
      <Navigation />
      <main className="theme-mat">
        <Hero />
        <About />
        <DnaSection />
        <Skills />
        <LearningStrip />
        <ProjectsSection />
        <Activities />
        <Interests />
        <Contact />
      </main>
    </Provider>
  );
}
