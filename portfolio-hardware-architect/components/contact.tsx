"use client";

import { motion } from "motion/react";
import { Terminal, Send, Mail, Radio } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="font-mono text-xs tracking-widest uppercase text-accent">04 // transmit_signal</span>
              <span className="flex-1 h-px bg-border/50" />
            </div>

            <h2 className="text-5xl md:text-7xl font-mono font-bold leading-[1.1] uppercase">
              Establish <br /> <span className="text-primary">Connection.</span>
            </h2>
            <p className="text-base text-foreground/70 max-w-sm font-mono">
              {'>'} Ready to transmit data. Whether it's a new fabrication run, a complex robotics system, or low-level firmware optimizations.
            </p>
            
            <div className="space-y-6 pt-4 font-mono font-bold">
              <a href="mailto:hello@example.com" className="flex items-center gap-4 group cursor-pointer w-fit pl-4 border-l-2 border-primary/50 hover:border-primary transition-colors">
                <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg group-hover:text-primary transition-colors">ping@hardware.sys</span>
              </a>
              <div className="flex items-center gap-4 text-foreground/80 pl-4 border-l-2 border-accent/50">
                <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center">
                  <Radio className="w-5 h-5" />
                </div>
                <span className="text-lg">FREQ: 2.4GHz ISM</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-secondary p-8 md:p-12 border border-border/50 shadow-2xl relative"
          >
             {/* Terminal Header */}
             <div className="absolute top-0 inset-x-0 h-8 bg-background border-b border-border flex items-center px-4 font-mono text-xs text-foreground/50">
               <Terminal className="w-4 h-4 mr-2" />
               transmission_protocol.sh
             </div>

            <form className="flex flex-col gap-6 mt-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2 relative group">
                <label className="text-xs font-mono uppercase tracking-wider text-accent flex items-center gap-2 absolute -top-2 left-3 bg-secondary px-2 z-10" htmlFor="name">
                  <span className="text-primary">{'>'}</span> struct.name
                </label>
                <input 
                  type="text" 
                  id="name"
                  spellCheck="false"
                  className="w-full bg-background border border-border py-4 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-base font-mono relative relative"
                  placeholder="char name[256];"
                />
              </div>
              <div className="space-y-2 relative group">
                <label className="text-xs font-mono uppercase tracking-wider text-accent flex items-center gap-2 absolute -top-2 left-3 bg-secondary px-2 z-10" htmlFor="email">
                  <span className="text-primary">{'>'}</span> struct.email
                </label>
                <input 
                  type="email" 
                  id="email"
                  spellCheck="false"
                  className="w-full bg-background border border-border py-4 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-base font-mono relative"
                  placeholder="char *email_address;"
                />
              </div>
              <div className="space-y-2 relative group">
                <label className="text-xs font-mono uppercase tracking-wider text-accent flex items-center gap-2 absolute -top-2 left-3 bg-secondary px-2 z-10" htmlFor="message">
                  <span className="text-primary">{'>'}</span> struct.payload
                </label>
                <textarea 
                  id="message"
                  rows={5}
                  spellCheck="false"
                  className="w-full bg-background border border-border py-4 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none text-base font-mono relative"
                  placeholder="uint8_t payload[] = {...};"
                />
              </div>
              <button className="mt-2 flex items-center justify-center gap-3 w-full bg-primary text-primary-foreground hover:bg-background hover:text-primary border-2 border-primary py-4 px-6 font-mono font-bold uppercase transition-all group overflow-hidden relative shadow-[0_0_10px_var(--primary)] hover:shadow-[0_0_20px_var(--primary)]">
                <span className="relative z-10 flex items-center gap-3">
                  [ TRANSMIT_PACKET ]
                  <Send className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-accent transform translate-y-full group-hover:translate-y-0 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
