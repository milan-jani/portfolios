import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-primary/30 selection:text-primary-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 px-6 lg:px-[60px] pb-[40px] pt-[120px] max-w-[1440px] mx-auto w-full">
        <div className="lg:sticky lg:top-[120px] lg:h-[calc(100vh-160px)] flex flex-col justify-center">
          <Hero />
        </div>
        <div className="flex flex-col gap-6">
          <Projects />
          <Experience />
          <About />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
