import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="font-display font-medium text-xl">Portfolio.</span>
          <span className="text-foreground/60 text-sm">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
