"use client";

import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Ethereal Workspace",
    description: "A minimalist productivity tool designed to reduce cognitive load. Features a distraction-free writing environment and task management.",
    image: "https://picsum.photos/seed/workspace/800/600",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    links: { live: "#", github: "#" }
  },
  {
    title: "Lumina Dashboard",
    description: "An analytics dashboard with soft glassmorphism UI. Provides real-time data visualization with smooth transitions.",
    image: "https://picsum.photos/seed/dashboard/800/600",
    tags: ["React", "D3.js", "CSS Modules"],
    links: { live: "#", github: "#" }
  },
  {
    title: "Aura E-commerce",
    description: "A premium shopping experience with a focus on typography and whitespace. Includes seamless cart interactions.",
    image: "https://picsum.photos/seed/ecommerce/800/600",
    tags: ["Vue", "Nuxt", "Stripe"],
    links: { live: "#", github: "#" }
  }
];

export function Projects() {
  return (
    <section id="projects" className="pt-12 pb-24 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-[40px] font-heading font-semibold mb-4 tracking-[-1px]">Selected Work</h2>
          <p className="text-[18px] leading-[1.6] text-muted-foreground max-w-2xl">
            A collection of projects that showcase my focus on aesthetic quality and user experience.
          </p>
        </motion.div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
            >
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 bg-accent rounded-[20px] transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
                <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden border border-border bg-card shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-1/2 p-6 md:p-0">
                <h3 className="text-[24px] font-heading font-semibold mb-4">{project.title}</h3>
                <p className="text-muted-foreground mb-6 text-[15px] leading-[1.6]">
                  {project.description}
                </p>
                <div className="flex flex-wrap mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="inline-block px-[10px] py-[4px] rounded-[100px] bg-muted text-[10px] font-semibold uppercase mr-[6px] mt-[12px] text-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-6">
                  <a href={project.links.live} className="flex items-center gap-2 text-[13px] font-medium hover:text-muted-foreground transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  <a href={project.links.github} className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
