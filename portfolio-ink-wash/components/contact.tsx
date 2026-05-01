"use client";

import { motion } from "motion/react";
import { ArrowRight, Mail, MapPin } from "lucide-react";

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
            <h2 className="text-5xl md:text-7xl font-display font-medium leading-[1.1]">
              Let's build <br /> <span className="italic text-primary">something</span> great.
            </h2>
            <p className="text-lg text-foreground/70 max-w-sm">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            
            <div className="space-y-6 pt-4">
              <a href="mailto:hello@example.com" className="flex items-center gap-4 group cursor-pointer w-fit">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium group-hover:text-primary transition-colors">hello@example.com</span>
              </a>
              <div className="flex items-center gap-4 text-foreground/80">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium">New York, NY</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-muted/50 p-8 md:p-12 rounded-3xl border border-border/50"
          >
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-mono uppercase tracking-wider text-foreground/80" htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name"
                  className="w-full bg-transparent border-b border-border py-3 px-1 focus:outline-none focus:border-primary transition-colors text-lg"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-mono uppercase tracking-wider text-foreground/80" htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email"
                  className="w-full bg-transparent border-b border-border py-3 px-1 focus:outline-none focus:border-primary transition-colors text-lg"
                  placeholder="john@doe.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-mono uppercase tracking-wider text-foreground/80" htmlFor="message">Message</label>
                <textarea 
                  id="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-3 px-1 focus:outline-none focus:border-primary transition-colors resize-none text-lg"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button className="mt-4 flex items-center justify-between w-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground py-4 px-6 rounded-lg font-medium transition-colors group">
                <span>Send Message</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
