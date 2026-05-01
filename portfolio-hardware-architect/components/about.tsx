"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Terminal } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-secondary/30 relative border-y border-border/50 bg-circuit-grid">
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
              <span className="font-mono text-xs tracking-widest uppercase text-primary">01 // System Specifications</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-mono font-bold leading-tight uppercase">
              Silicon to <span className="text-accent">Signals.</span>
            </h2>
            
            <div className="text-base text-foreground/80 space-y-4 pt-4 leading-relaxed font-mono">
              <p>
                {'>'} START SYSTEM DIAGNOSTIC...
                <br />
                {'>'} Hello, I'm an Embedded Systems & VLSI Engineer with a core focus on architecting
                hardware that scales. Whether it's designing Multi-layer high-speed PCBs, verifying
                complex RTL in SystemVerilog, or writing bare-metal firmware.
              </p>
              <p>
                {'>'} My toolkit includes Altium Designer for schematic/layout, ROS for autonomy stacks, 
                and heavy C/C++ architecture for microcontrollers. I thrive on closing the gap between 
                abstract software concepts and concrete electronic physics.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-8 mt-4 border-t border-border/50">
              <div className="p-4 bg-muted/30 border border-border border-l-4 border-l-primary shadow-sm">
                <h4 className="text-3xl font-mono font-bold text-foreground mb-1">15+</h4>
                <p className="text-xs font-mono uppercase tracking-wider text-foreground/60">PCB Designs Fabricated</p>
              </div>
              <div className="p-4 bg-muted/30 border border-border border-l-4 border-l-accent shadow-sm">
                <h4 className="text-3xl font-mono font-bold text-foreground mb-1">1M+</h4>
                <p className="text-xs font-mono uppercase tracking-wider text-foreground/60">Gates Verified in FPGA</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Terminal Window Graphic instead of Circle Portrait */}
            <div className="w-full max-w-md bg-background border border-border shadow-2xl relative overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-secondary border-b border-border p-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="mx-auto text-xs font-mono text-foreground/60">tty1 - root@hardware-sys</span>
              </div>
              
              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm space-y-3 relative min-h-[300px]">
                {/* Abstract rendering of PCB layers behind terminal text */}
                <Image
                  src="https://picsum.photos/seed/hardware/800/800"
                  alt="PCB Background"
                  fill
                  className="object-cover opacity-20 filter invert dark:invert-0 sepia-[.5] hue-rotate-180 mix-blend-luminosity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-background/80" />
                
                <div className="relative z-10 text-accent flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-foreground/50 text-xs mb-2 border-b border-foreground/20 pb-2">
                    <Terminal className="w-4 h-4" />
                    <span>Executing boot sequence...</span>
                  </div>
                  <div><span className="text-primary font-bold">root@sys:~#</span> ./init_hardware_scan.sh</div>
                  <div className="text-foreground/70 ml-2 space-y-1 my-2">
                    <p className="flex items-center gap-2"><span>[</span><span className="text-accent">OK</span><span>]</span> Initializing JTAG Interface...</p>
                    <p className="flex items-center gap-2"><span>[</span><span className="text-accent">OK</span><span>]</span> Checking I2C Bus... 3 devices found.</p>
                    <p className="flex items-center gap-2"><span>[</span><span className="text-accent">OK</span><span>]</span> Loading FPGA Bitstream...</p>
                    <p className="flex items-center gap-2"><span>[</span><span className="text-primary font-bold animate-pulse">!!</span><span>]</span> WARN: Overclocking Cortex-M4 at 240MHz.</p>
                  </div>
                  <div className="mt-2"><span className="text-primary font-bold">root@sys:~#</span> start_perception_node</div>
                  <div className="text-foreground ml-2 flex items-center">
                    <span className="text-accent">Process running</span>
                    <span className="animate-[ping_1.5s_infinite] mx-1">.</span>
                    <span className="animate-[ping_1.5s_infinite] mx-1" style={{ animationDelay: '0.5s' }}>.</span>
                    <span className="animate-[ping_1.5s_infinite] mx-1" style={{ animationDelay: '1s' }}>.</span>
                    <span className="ml-2 w-2 h-4 bg-primary animate-pulse inline-block align-middle" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
