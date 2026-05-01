"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ExternalLink, Github, Cpu } from "lucide-react";
import React from "react";

const PROJECTS = [
  {
    title: "Autonomous Quadcopter Flight Controller",
    description: "Designed a custom flight controller PCB around STM32H7. Implemented an Extended Kalman Filter (EKF) in bare-metal C for accurate 3D spatial orientation using a 9-DOF IMU and GPS.",
    image: "https://picsum.photos/seed/drone/800/600",
    tags: ["STM32", "Altium", "C/C++", "FreeRTOS", "Control Systems"],
    link: "#",
    github: "#"
  },
  {
    title: "RISC-V Soft Core on FPGA",
    description: "Architected a custom 32-bit RISC-V processor (RV32I) deployed on an Artix-7 FPGA. Included a custom VGA controller to output telemetry data to an external monitor.",
    image: "https://picsum.photos/seed/fpga/800/600",
    tags: ["SystemVerilog", "Xilinx Vivado", "Artix-7 FPGA", "Computer Arch"],
    link: "#",
    github: "#"
  },
  {
    title: "IoT LoRaWAN Sensor Mesh",
    description: "Engineered low-power environmental sensor nodes capable of 5+ years of battery life. Developed custom bootloader for OTA updates via LoRaWAN.",
    image: "https://picsum.photos/seed/iot/800/600",
    tags: ["ESP32", "LoRa", "KiCad", "Embedded C", "IoT"],
    link: "#",
    github: "#"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden bg-secondary/30 bg-circuit-grid border-y border-border/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs tracking-widest uppercase text-accent">03 // PROTOTYPES_AND_PRODUCTIONS</span>
            <span className="flex-1 h-px bg-border/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-mono font-bold uppercase">Engineering <span className="text-primary">Showcase.</span></h2>
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
      <div className="w-full md:w-3/5 group relative" style={{ perspective: "1500px" }}>
        {/* PCB Board backing styling */}
        <div className="absolute inset-x-4 inset-y-2 bg-primary/20 rounded-sm translate-y-4 group-hover:translate-x-2 group-hover:translate-y-6 transition-transform duration-500 z-0" />
        <motion.div 
          whileHover={{ rotateY: isEven ? 5 : -5, rotateX: 2, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative aspect-[4/3] rounded-sm overflow-hidden border-2 border-border bg-background shadow-2xl z-10"
        >
          <Image 
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-125 saturate-50 group-hover:saturate-100"
            referrerPolicy="no-referrer"
          />
          {/* Overlay Grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4yIi8+Cjwvc3ZnPg==')] mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md p-2 border border-border">
            <Cpu className="w-5 h-5 text-primary" />
          </div>
        </motion.div>
      </div>
      
      <div className={`w-full md:w-2/5 flex flex-col ${isEven ? 'md:items-start' : 'md:items-end md:text-right'}`}>
        <h3 className="text-2xl md:text-3xl font-mono font-bold mb-4 bg-secondary/50 border border-border px-3 py-1 inline-block">{project.title}</h3>
        <p className="text-foreground/70 text-base mb-8 leading-relaxed max-w-md font-mono border-l-2 border-primary/50 pl-4 bg-background/50 p-4">
          {project.description}
        </p>
        
        <div className={`flex flex-wrap gap-2 mb-8 ${!isEven && 'justify-end'}`}>
          {project.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-secondary border border-border text-xs font-mono uppercase tracking-wider text-accent">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <a href={project.github} className="p-3 border-2 border-border hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all group relative overflow-hidden" aria-label="GitHub Repository">
            <span className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            <Github className="w-5 h-5 relative z-10" />
          </a>
          <a href={project.link} className="p-3 bg-foreground text-background border-2 border-foreground hover:bg-accent hover:border-accent hover:text-black transition-all" aria-label="Live Demo">
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
