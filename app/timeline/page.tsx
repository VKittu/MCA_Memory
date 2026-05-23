// app/timeline/page.tsx
"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealOnScroll, TextReveal } from "@/components/animations/RevealOnScroll";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { demoTimeline } from "@/lib/demoData";

export default function TimelinePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen relative pt-24" ref={containerRef}>
      <ParticleBackground />

      {/* Header */}
      <div className="relative z-10 py-16 px-4 text-center">
        <RevealOnScroll>
          <p className="text-gold text-xs tracking-widest uppercase mb-4">Our Journey</p>
          <h1 className="section-title text-white mb-4">
            Farewell <span className="gold-text">Timeline</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            From the very first step inside SGSITS Indore to the night we said our final goodbye — every milestone, every memory, every moment.
          </p>
        </RevealOnScroll>
      </div>

      {/* Timeline */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-24">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent transform -translate-x-1/2 hidden md:block" />

        <div className="space-y-16">
          {demoTimeline.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <RevealOnScroll key={event.id} delay={i * 0.08} direction={isLeft ? "left" : "right"}>
                <div className={`relative flex items-center gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col`}>

                  {/* Card */}
                  <div className="flex-1 glass-card overflow-hidden group">
                    {event.imageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="text-xs text-white/50 border border-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                            {event.date}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{event.emoji}</span>
                        <h3 className="font-display text-xl font-bold text-white">{event.title}</h3>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex flex-col items-center gap-2 flex-shrink-0">
                    <motion.div
                      className="w-5 h-5 rounded-full border-2 border-gold bg-navy-deep shadow-gold"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", damping: 15, delay: i * 0.1 }}
                    />
                  </div>

                  {/* Date label (desktop) */}
                  <div className="hidden md:block flex-1 text-center">
                    <motion.div
                      className="inline-block px-4 py-2 rounded-full border border-gold/30 bg-gold/10"
                      initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                    >
                      <span className="text-gold text-sm font-medium">{event.date}</span>
                    </motion.div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* End marker */}
        <RevealOnScroll className="text-center mt-20" direction="scale">
          <div className="inline-flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-gold-strong">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="font-display text-2xl font-bold gold-text">The Journey Continues…</h3>
            <p className="text-white/50 text-sm max-w-xs text-center">
              SGSITS Indore gave us wings. Now we fly — but we'll always remember where we soared.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
