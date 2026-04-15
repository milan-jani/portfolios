"use client";

import { motion } from "motion/react";

const experiences = [
  {
    role: "Senior Frontend Engineer",
    company: "Design Systems Inc.",
    period: "2022 - Present",
    description: "Leading the development of a comprehensive React component library. Focusing on accessibility, performance, and developer experience."
  },
  {
    role: "UI/UX Developer",
    company: "Creative Agency",
    period: "2019 - 2022",
    description: "Bridged the gap between design and engineering. Built interactive marketing sites and web applications with a focus on smooth animations."
  },
  {
    role: "Frontend Developer",
    company: "Tech Startup",
    period: "2017 - 2019",
    description: "Developed the core web application using React and Redux. Implemented responsive designs and improved overall site performance."
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-12 relative z-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-[40px] font-heading font-semibold mb-4 tracking-[-1px]">Experience</h2>
          <p className="text-[18px] leading-[1.6] text-muted-foreground">
            My professional journey in crafting digital experiences.
          </p>
        </motion.div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted group-hover:bg-accent text-accent-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10" />
              
              {/* Content box */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-[24px] rounded-[20px] bg-card backdrop-blur-[12px] border border-border shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <h3 className="font-heading font-semibold text-[18px]">{exp.role}</h3>
                  <span className="text-[12px] font-medium text-muted-foreground">
                    {exp.period}
                  </span>
                </div>
                <div className="text-foreground font-semibold text-[13px] mb-4">{exp.company}</div>
                <p className="text-muted-foreground text-[13px] leading-[1.5]">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
