"use client";

import { motion } from "motion/react";

const EXPERIENCES = [
  {
    role: "Senior Frontend Engineer",
    company: "TechNova Solutions",
    period: "2023 - Present",
    description: "Leading the frontend architecture for scalable enterprise applications. Implemented micro-frontend strategies and mentored junior developers."
  },
  {
    role: "Full Stack Developer",
    company: "Creative Digital",
    period: "2020 - 2023",
    description: "Developed and maintained multiple high-traffic e-commerce platforms. Specialized in Next.js, headless CMS integrations, and performance optimization."
  },
  {
    role: "UI/UX Developer",
    company: "Design Labs",
    period: "2018 - 2020",
    description: "Bridged the gap between design and development by turning high-fidelity prototypes into pixel-perfect React components."
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-muted/20 border-y border-border/30">
      <div className="container mx-auto max-w-4xl">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-8 h-px bg-primary" />
            <span className="font-mono text-sm tracking-widest uppercase text-primary">Resume</span>
            <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-medium">Experience & Journey</h2>
        </motion.div>

        <div className="relative border-l border-border/50 ml-4 md:ml-0 md:space-y-12 space-y-8">
          {EXPERIENCES.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-16"
            >
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-2 shadow-[0_0_0_4px_var(--background)]" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <h3 className="text-2xl font-display font-medium text-foreground">{exp.role}</h3>
                <span className="text-sm font-mono text-primary mt-1 md:mt-0">{exp.period}</span>
              </div>
              <p className="text-lg text-foreground/80 font-medium mb-4">{exp.company}</p>
              <p className="text-foreground/70 leading-relaxed max-w-2xl">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
