"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import React, { useRef } from "react";
import Image from "next/image";

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
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <motion.div
           animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-[20%] -right-[10%] w-[60%] h-[70%] rounded-full bg-gradient-to-br from-primary to-accent blur-[120px]"
        />
        <motion.div
           animate={{
            rotate: [0, -10, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[60%] rounded-full bg-gradient-to-tr from-secondary to-muted blur-[100px]"
        />
      </div>

      <div className="container mx-auto z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-block border border-border px-4 py-2 rounded-full w-fit bg-background/50 backdrop-blur-sm">
            <span className="text-sm font-medium opacity-80 uppercase tracking-widest">Full Stack Developer</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-medium leading-[1.1] tracking-tight">
            Crafting digital <br />
            <span className="text-primary italic">experiences</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-lg leading-relaxed">
            I'm a developer and designer passionate about creating clean, professional, and accessible web identities.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-4 bg-foreground text-background rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
            >
              View Work
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-4 bg-transparent text-foreground border border-foreground/20 rounded-lg font-medium hover:border-foreground transition-all"
            >
              Contact Me
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
            className="relative w-full max-w-[450px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer bg-background/5 bg-opacity-20"
          >
             <Image
                src="https://picsum.photos/seed/portfolio1/800/1000"
                alt="Portrait"
                fill
                className="object-cover relative z-0 transition-transform duration-500"
                referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
             <div 
               className="absolute bottom-6 left-6 z-20 pointer-events-none"
               style={{ transform: "translateZ(80px)" }}
             >
               <p className="text-white font-display text-2xl">Creative Developer.</p>
               <p className="text-white/80 font-mono text-sm mt-1">EST 2026</p>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
