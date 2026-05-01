"use client";

import * as React from "react";
import { Power } from "lucide-react";
import { useTheme } from "next-themes";
import clsx from "clsx";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center gap-2 bg-secondary/50 border border-border px-3 py-1.5 hover:border-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary group font-mono text-xs uppercase"
      aria-label="Toggle theme"
    >
      <span className="text-foreground/70 group-hover:text-primary transition-colors hidden sm:inline-block">ENV_MODE:</span>
      <div className={clsx(
        "flex items-center justify-center transition-all",
        theme === "dark" ? "text-accent" : "text-primary"
      )}>
        <Power className="w-4 h-4" />
      </div>
      <span className={clsx(
        "font-bold w-12 text-left transition-colors",
        theme === "dark" ? "text-accent" : "text-primary"
      )}>
        {theme === "dark" ? "DARK" : "LIGHT"}
      </span>
    </button>
  );
}

