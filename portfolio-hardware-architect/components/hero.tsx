"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import React, { useRef } from "react";
import { Cpu, Zap, Binary } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useMotionTemplate`${mouseYSpring}deg`;
  const rotateY = useMotionTemplate`${mouseXSpring}deg`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct * 20); // max rotation 20 deg
    y.set(yPct * -20); // max rotation 20 deg
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-6 bg-circuit-grid">
      {/* Background glowing traces / signals */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
        <motion.div
           animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[30%] left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_var(--primary)]"
        />
        <motion.div
           animate={{
            y: ['-100%', '200%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="absolute top-0 right-[20%] w-[2px] h-1/2 bg-gradient-to-b from-transparent via-accent to-transparent shadow-[0_0_15px_var(--accent)]"
        />
      </div>

      <div className="container mx-auto z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-3 border border-primary/50 px-4 py-2 bg-primary/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--primary)]" />
            <span className="text-xs font-mono font-medium opacity-80 text-primary tracking-widest">[ SYSTEM SECURE ] : STATUS OK</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-mono font-bold leading-[1.1] tracking-tight uppercase">
            Hardware & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent relative inline-block">
              Embedded
              <motion.div 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl" 
              />
            </span> <br />
            Systems.
          </h1>
          <p className="text-base md:text-lg text-foreground/70 max-w-lg leading-relaxed font-mono">
            Architecting the physical layer. Expertise in VLSI design, custom PCB routing, RTOS, and complex robotic system integrations. Bridging the gap between silicon and software.
          </p>
          <div className="flex items-center gap-4 pt-4 font-mono text-sm">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-4 bg-primary text-primary-foreground font-bold shadow-[0_0_15px_var(--primary)] hover:shadow-[0_0_25px_var(--primary)] transition-all flex items-center gap-2 border border-primary"
            >
              <Zap className="w-4 h-4 fill-current" />
              INITIATE_VIEW
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-4 bg-secondary text-foreground border border-border font-bold hover:border-primary transition-all flex items-center gap-2"
            >
              <Binary className="w-4 h-4" />
              SEND_SIGNAL
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative flex justify-center"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-[400px] aspect-square flex items-center justify-center cursor-crosshair group"
          >
             {/* 3D Microchip Representation */}
             <div 
               className="absolute inset-8 bg-secondary border-2 border-border shadow-2xl z-10 flex items-center justify-center mix-blend-luminosity relative"
               style={{ transform: "translateZ(40px)" }}
             >
                {/* Microchip text */}
                <div className="flex flex-col items-center justify-center font-mono opacity-60">
                  <Cpu className="w-16 h-16 mb-4 text-foreground" />
                  <span className="text-xl tracking-widest font-bold border-b border-foreground/30 pb-2 mb-2">ARM Cortex-M7</span>
                  <span className="text-sm">74 Series Logic</span>
                  <span className="text-xs mt-4">Made in Earth</span>
                </div>
                {/* Glowing Core */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
             </div>

             {/* Chip Pins Generation (Top/Bottom) */}
             <div className="absolute top-2 inset-x-12 flex justify-between z-0" style={{ transform: "translateZ(20px)" }}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-4 h-8 bg-border border border-muted shadow-lg" />
                ))}
             </div>
             <div className="absolute bottom-2 inset-x-12 flex justify-between z-0" style={{ transform: "translateZ(20px)" }}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-4 h-8 bg-border border border-muted shadow-lg" />
                ))}
             </div>
             {/* Chip Pins Generation (Left/Right) */}
             <div className="absolute left-2 inset-y-12 flex flex-col justify-between z-0" style={{ transform: "translateZ(20px)" }}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-8 h-4 bg-border border border-muted shadow-lg" />
                ))}
             </div>
             <div className="absolute right-2 inset-y-12 flex flex-col justify-between z-0" style={{ transform: "translateZ(20px)" }}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-8 h-4 bg-border border border-muted shadow-lg" />
                ))}
             </div>

             {/* Connection Traces to Background */}
             <div className="absolute inset-0 scale-125 z-[-1] opacity-50 group-hover:scale-150 transition-transform duration-1000 ease-in-out pointer-events-none overflow-visible">
               <svg viewBox="0 0 100 100" className="w-full h-full stroke-primary fill-none stroke-[0.5px]">
                  <motion.path 
                    d="M 50 10 L 50 0 M 90 50 L 100 50 M 50 90 L 50 100 M 10 50 L 0 50" 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.path 
                    d="M 20 20 L 10 10 M 80 20 L 90 10 M 80 80 L 90 90 M 20 80 L 10 90" 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
               </svg>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
