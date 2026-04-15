"use client";

import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-full flex flex-col justify-center lg:pr-[40px] z-10">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob dark:mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-blue rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob animation-delay-2000 dark:mix-blend-screen pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs uppercase tracking-[2px] font-semibold text-muted-foreground mb-4">
            Design & Strategy
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-[64px] leading-[1.1] font-semibold tracking-[-2px] mb-6 text-foreground"
        >
          Crafting digital<br/>experiences with<br/><span className="text-muted-foreground">intentionality</span>.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[18px] leading-[1.6] text-muted-foreground mb-10 max-w-[460px]"
        >
          Senior Product Designer focusing on minimalistic, high-conversion interfaces for innovative startups and creative studios.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <a
            href="#projects"
            className="flex items-center gap-2 px-[28px] py-[14px] bg-primary text-primary-foreground rounded-[12px] font-medium shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform"
          >
            View Projects
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-[28px] py-[14px] bg-secondary text-secondary-foreground border border-border rounded-[12px] font-medium hover:bg-muted transition-colors"
          >
            <Mail className="w-4 h-4" />
            Let&apos;s Talk
          </a>
        </motion.div>
      </div>
    </section>
  );
}
