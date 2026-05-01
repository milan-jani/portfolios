import { BatteryCharging, Wifi, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-4 px-6 border-t border-border bg-background border-t-primary/30 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.3)]">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs uppercase text-foreground/80">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-primary font-bold">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            SYS_ONLINE
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Terminal className="w-3 h-3" />
            tty1
          </div>
          <div className="hidden md:flex items-center gap-2">
            Uptime: 99.9%
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
            [ GITHUB ]
          </div>
          <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
            [ LINKEDIN ]
          </div>
          <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
            [ TWITTER ]
          </div>
          <div className="flex items-center gap-4 border-l border-border pl-6">
            <Wifi className="w-4 h-4" />
            <BatteryCharging className="w-4 h-4 text-accent" />
          </div>
        </div>
      </div>
    </footer>
  );
}

