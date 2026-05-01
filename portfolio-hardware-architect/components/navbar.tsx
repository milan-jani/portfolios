"use client";

import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import clsx from "clsx";
import { Cpu } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const links = [
    { name: "// ABOUT", href: "#about" },
    { name: "// SYSTEMS", href: "#experience" },
    { name: "// PROJECTS", href: "#projects" },
    { name: "// CONTACT_IRQ", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
        scrolled ? "bg-background/90 backdrop-blur-md shadow-sm py-4 border-border/50" : "bg-transparent py-6 border-transparent"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 font-mono font-bold text-xl tracking-tighter text-foreground group">
          <div className="w-10 h-10 border-2 border-primary flex items-center justify-center relative bg-secondary group-hover:bg-primary transition-colors">
            <Cpu className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors relative z-10" />
            {/* Corner pins */}
            <div className="absolute top-[-4px] left-1 w-1 h-1 bg-border" />
            <div className="absolute top-[-4px] right-1 w-1 h-1 bg-border" />
            <div className="absolute bottom-[-4px] left-1 w-1 h-1 bg-border" />
            <div className="absolute bottom-[-4px] right-1 w-1 h-1 bg-border" />
            <div className="absolute left-[-4px] top-1 w-1 h-1 bg-border" />
            <div className="absolute left-[-4px] bottom-1 w-1 h-1 bg-border" />
            <div className="absolute right-[-4px] top-1 w-1 h-1 bg-border" />
            <div className="absolute right-[-4px] bottom-1 w-1 h-1 bg-border" />
          </div>
          <span>SYS_ARCHITECT</span>
        </a>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-mono font-medium text-foreground/80 hover:text-primary transition-colors hover:shadow-[0_2px_0_0_var(--primary)] pb-1"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
