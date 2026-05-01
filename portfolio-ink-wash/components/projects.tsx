"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import React from "react";

const PROJECTS = [
  {
    title: "E-Commerce Platform",
    description: "A headless e-commerce solution with Next.js, Stripe, and a custom CMS. Designed with a dark luxury aesthetic.",
    image: "https://picsum.photos/seed/project1/800/600",
    tags: ["Next.js", "Tailwind", "Stripe", "Framer Motion"],
    link: "#",
    github: "#"
  },
  {
    title: "Financial Dashboard",
    description: "Real-time financial analytics dashboard with complex data visualizations and socket integrations.",
    image: "https://picsum.photos/seed/project2/800/600",
    tags: ["React", "D3.js", "WebSockets", "Node.js"],
    link: "#",
    github: "#"
  },
  {
    title: "Creative Portfolio",
    description: "Experimental creative agency portfolio featuring brutalist design elements and WebGL shaders.",
    image: "https://picsum.photos/seed/project3/800/600",
    tags: ["Three.js", "WebGL", "GSAP", "React"],
    link: "#",
    github: "#"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-px bg-primary" />
            <span className="font-mono text-sm tracking-widest uppercase text-primary">Selected Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-medium">Recent Projects</h2>
        </motion.div>

        <div className="flex flex-col gap-24">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0], index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col gap-8 md:gap-16 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <div className="w-full md:w-3/5 group relative perspective-1000" style={{ perspective: "1500px" }}>
        <motion.div 
          whileHover={{ rotateY: isEven ? 5 : -5, rotateX: 2, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
        >
          <Image 
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-background/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
        </motion.div>
      </div>
      
      <div className={`w-full md:w-2/5 flex flex-col ${isEven ? 'md:items-start' : 'md:items-end md:text-right'}`}>
        <h3 className="text-3xl font-display font-medium mb-4">{project.title}</h3>
        <p className="text-foreground/70 text-lg mb-8 leading-relaxed max-w-md">
          {project.description}
        </p>
        
        <div className={`flex flex-wrap gap-2 mb-8 ${!isEven && 'justify-end'}`}>
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-secondary border border-border text-xs uppercase tracking-wider rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <a href={project.github} className="p-3 rounded-full border border-border hover:bg-foreground hover:text-background transition-colors" aria-label="GitHub Repository">
            <Github className="w-5 h-5" />
          </a>
          <a href={project.link} className="p-3 rounded-full bg-foreground text-background hover:bg-primary transition-colors hover:text-primary-foreground" aria-label="Live Demo">
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
