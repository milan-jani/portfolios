"use client";

import { motion } from "motion/react";

const EXPERIENCES = [
  {
    role: "Senior Embedded Engineer",
    company: "Apex Robotics Systems",
    period: "2023 - Present",
    description: "Leading firmware architecture for autonomous quadcopters. Implementing sensor fusion algorithms (EKF/UKF) and optimizing RTOS task scheduling on Cortex-M7.",
    tools: ["C/C++", "FreeRTOS", "STM32", "CAN bus"]
  },
  {
    role: "Hardware Architect",
    company: "Silicon Logic Corp",
    period: "2020 - 2023",
    description: "Designed multi-layer, high-speed PCBs with strict impedance control. Handled DDR4 memory routing and developed automated functional test jigs.",
    tools: ["Altium Designer", "KiCad", "Spice", "Python"]
  },
  {
    role: "VLSI Design Intern",
    company: "NeuralNet Chips",
    period: "2018 - 2020",
    description: "Verified out-of-order execution pipelines for a proprietary RISC-V core using SystemVerilog and UVM methodologies.",
    tools: ["Verilog", "SystemVerilog", "UVM", "Bash"]
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-4xl">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="mb-16 text-left"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs tracking-widest uppercase text-accent">02 // execution_history</span>
            <span className="flex-1 h-px bg-border/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-mono font-bold uppercase">System <span className="text-primary">Logs.</span></h2>
        </motion.div>

        <div className="relative border-l-2 border-primary/20 ml-4 md:ml-0 md:space-y-12 space-y-8">
          {EXPERIENCES.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-16 group"
            >
              {/* Timeline dot resembling a PCB pad/via */}
              <div className="absolute w-4 h-4 rounded-full border-[3px] border-primary bg-background -left-[9px] top-1.5 shadow-[0_0_10px_var(--primary)] group-hover:scale-125 transition-transform" />
              
              {/* Horizontal trace to card */}
              <div className="absolute h-px bg-primary/20 w-4 md:w-12 left-0 top-3" />

              <div className="bg-secondary/20 border border-border p-6 hover:border-primary/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4 border-b border-border/50 pb-2">
                  <h3 className="text-xl md:text-2xl font-mono font-bold text-foreground">{exp.role}</h3>
                  <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 mt-2 md:mt-0">T={exp.period}</span>
                </div>
                <p className="text-base text-primary font-mono mb-4">@ {exp.company}</p>
                <p className="text-foreground/70 leading-relaxed font-mono text-sm mb-6">
                  {exp.description}
                </p>
                
                {/* Tools */}
                <div className="flex flex-wrap gap-2">
                  {exp.tools.map(tool => (
                    <span key={tool} className="text-xs font-mono uppercase tracking-wider px-2 py-1 bg-background border border-border text-foreground/80">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
