"use client";

import { motion } from "motion/react";
import { Send, Twitter, Linkedin, Github, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-12 relative overflow-hidden z-10">
      {/* Soft background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/30 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-[40px] font-heading font-semibold mb-4 tracking-[-1px]">Let&apos;s Connect</h2>
          <p className="text-[18px] leading-[1.6] text-muted-foreground max-w-xl">
            Have a project in mind or just want to say hi? Feel free to reach out. I&apos;m always open to discussing new opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-[18px] font-heading font-semibold mb-4">Contact Info</h3>
              <div className="space-y-4">
                <a href="mailto:hello@example.com" className="flex items-center gap-3 text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-10 h-10 rounded-[12px] bg-muted flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  hello@example.com
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-[18px] font-heading font-semibold mb-4">Socials</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-[12px] bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-[12px] bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-[12px] bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[13px] font-medium text-muted-foreground">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-[16px] py-[12px] rounded-[12px] bg-card backdrop-blur-[12px] border border-border shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-border transition-shadow text-[15px]"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-[13px] font-medium text-muted-foreground">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-[16px] py-[12px] rounded-[12px] bg-card backdrop-blur-[12px] border border-border shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-border transition-shadow text-[15px]"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-[13px] font-medium text-muted-foreground">Message</label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-[16px] py-[12px] rounded-[12px] bg-card backdrop-blur-[12px] border border-border shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-border transition-shadow resize-none text-[15px]"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-[28px] py-[14px] bg-primary text-primary-foreground rounded-[12px] font-medium shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 text-[15px]"
            >
              Send Message
              <Send className="w-4 h-4" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
