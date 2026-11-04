import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Experience from "@/components/Experience/Experience";
import Work from "@/components/Work/Work";
import OpenSource from "@/components/OpenSource/OpenSource";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Work />
        <OpenSource />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
