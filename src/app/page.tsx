import Navigation from "@/components/system/Navigation";
import Provider from "@/components/system/Provider";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import Activities from "@/components/activities/Activities";
import Contact from "@/components/contact/Contact";
import ScrollVelocity from "@/components/bits/ScrollVelocity";

export default function Home() {
  return (
    <Provider>
      <Navigation />
      <main className="theme-mat">
        <Hero />
        <About />
        <Skills />
        {/* decorative marquee; speeds up with scroll */}
        <div aria-hidden className="overflow-hidden py-10">
          <ScrollVelocity
            texts={["Python  SolidWorks  ESP32  Arduino  Unity", "football  reading  tinkering  side projects"]}
            velocity={40}
            fadeEdges
            outlineAlternate
            color="#2b2140"
            separator={<span style={{ color: "#ff5d8f" }}>✦</span>}
            gap={28}
            fontSize="clamp(2rem, 6vw, 4.5rem)"
            scrollerStyle={{ fontFamily: "var(--font-display)" }}
          />
        </div>
        <ProjectShowcase />
        <Activities />
        <Contact />
      </main>
    </Provider>
  );
}
