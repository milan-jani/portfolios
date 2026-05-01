"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-background relative">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="w-12 h-px bg-primary" />
              <span className="font-mono text-sm tracking-widest uppercase text-primary">About Me</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight">
              A blend of <span className="italic text-primary">design</span> and <span className="italic text-primary">engineering</span>.
            </h2>
            
            <div className="text-lg text-foreground/80 space-y-4 pt-4 leading-relaxed font-sans">
              <p>
                Hello! I'm a passionate developer who focuses on writing clean, elegant, and efficient code.
                My journey into web development started when I realized that combining logic and visual design
                can create truly impactful experiences.
              </p>
              <p>
                I specialize in building robust full-stack applications with modern frameworks like React and Next.js,
                while maintaining a keen eye for typography, spacing, and interaction design. The intersection 
                of beautiful aesthetics and flawless performance is where I thrive.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-8 mt-4 border-t border-border/50">
              <div>
                <h4 className="text-3xl font-display mb-1">5+</h4>
                <p className="text-sm font-mono uppercase tracking-wider text-foreground/60">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-display mb-1">40+</h4>
                <p className="text-sm font-mono uppercase tracking-wider text-foreground/60">Projects Completed</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-full overflow-hidden">
              <Image
                src="https://picsum.photos/seed/about/800/1200"
                alt="About"
                fill
                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/20 pointer-events-none" />
            </div>
            {/* Minimalist decoration */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-8 -right-8 w-32 h-32 border border-foreground border-dashed rounded-full pointer-events-none opacity-20" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
