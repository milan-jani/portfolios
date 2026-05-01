"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-secondary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center text-foreground">
        <Sun className="absolute w-full h-full transition-all duration-300 transform dark:-rotate-90 dark:opacity-0" />
        <Moon className="absolute w-full h-full transition-all duration-300 transform rotate-90 opacity-0 dark:rotate-0 dark:opacity-100" />
      </div>
    </button>
  );
}
