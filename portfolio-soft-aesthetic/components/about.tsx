"use client";

import { motion } from "motion/react";
import { Code2, Palette, Terminal, Layout, Smartphone, Globe } from "lucide-react";

const skills = [
  { name: "Frontend Development", icon: Layout, desc: "React, Next.js, Vue" },
  { name: "UI/UX Design", icon: Palette, desc: "Figma, Framer, Prototyping" },
  { name: "Backend Integration", icon: Terminal, desc: "Node.js, APIs, Databases" },
  { name: "Responsive Design", icon: Smartphone, desc: "Mobile-first, Tailwind CSS" },
  { name: "Web Performance", icon: Globe, desc: "Optimization, Core Web Vitals" },
  { name: "Clean Code", icon: Code2, desc: "TypeScript, Architecture" },
];

export function About() {
  return (
    <section id="about" className="py-12 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-left"
        >
          <h2 className="text-3xl md:text-[40px] font-heading font-semibold mb-4 tracking-[-1px]">About Me</h2>
          <p className="text-[18px] leading-[1.6] text-muted-foreground max-w-2xl">
            I bridge the gap between design and engineering. With a strong foundation in both visual aesthetics and technical implementation, I create digital products that are not only beautiful but also highly functional and performant.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-[20px] bg-card backdrop-blur-[12px] border border-border shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] transition-all group"
            >
              <div className="w-12 h-12 rounded-[12px] bg-muted flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                <skill.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-[18px] font-heading font-semibold mb-2">{skill.name}</h3>
              <p className="text-[13px] text-muted-foreground leading-[1.5]">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
