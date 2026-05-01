"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-[60px] py-[20px] bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm"
    >
      <div className="text-[24px] font-heading font-bold tracking-[-0.5px]">
        Milan Jani
      </div>
      <nav className="hidden md:flex items-center gap-[40px] text-[16px] font-heading font-medium text-muted-foreground">
        <a href="#projects" className="hover:text-foreground transition-colors">Works</a>
        <a href="#experience" className="hover:text-foreground transition-colors">Services</a>
        <a href="#about" className="hover:text-foreground transition-colors">About</a>
        <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
      </nav>
      <button
        onClick={toggleTheme}
        className="w-[44px] h-[24px] bg-muted rounded-[100px] relative p-[2px] cursor-pointer flex items-center"
        aria-label="Toggle theme"
      >
        <div className={`w-[20px] h-[20px] bg-background rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center transition-transform duration-300 ${theme === 'dark' ? 'translate-x-[20px]' : 'translate-x-0'}`}>
          {mounted && theme === "dark" ? (
            <Moon className="w-3 h-3 text-foreground" />
          ) : (
            <Sun className="w-3 h-3 text-foreground" />
          )}
        </div>
      </button>
    </motion.header>
  );
}
