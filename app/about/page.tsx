// app/about/page.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, ExternalLink, MapPin, Calendar, Users, Trophy, Heart } from "lucide-react";
import { RevealOnScroll, StaggerContainer, StaggerItem, TextReveal } from "@/components/animations/RevealOnScroll";
import { ParticleBackground } from "@/components/animations/ParticleBackground";

const batchStats = [
  { icon: Users, label: "Total Students", value: "60+", color: "#C9A84C" },
  { icon: Calendar, label: "Years Together", value: "4 Years", color: "#8B5CF6" },
  { icon: Trophy, label: "Achievements", value: "15+", color: "#10B981" },
  { icon: Heart, label: "Memories Made", value: "∞", color: "#EF4444" },
];

const highlights = [
  {
    year: "2022",
    title: "The Beginning",
    desc: "60+ students from across Madhya Pradesh walked into SGSITS Indore with nothing but dreams. Little did they know they were walking into the best chapter of their lives.",
    emoji: "🌱",
  },
  {
    year: "2023",
    title: "Finding Our Rhythm",
    desc: "The Pachmarhi trip, the hackathons, the fests — this was the year strangers became brothers and sisters. Our batch identity was born.",
    emoji: "🔥",
  },
  {
    year: "2024",
    title: "Rising to the Top",
    desc: "Internships, projects, state-level competitions — MCA Batch 2026 started making SGSITS Indore proud on every platform.",
    emoji: "⭐",
  },
  {
    year: "2025",
    title: "The Final Push",
    desc: "State hackathon win, final year projects, placement season — the hardest year and our greatest together. We pushed through everything.",
    emoji: "🏆",
  },
  {
    year: "2026",
    title: "Forever Farewell",
    desc: "The last chapter. The hardest goodbye. But also the most beautiful proof that we did it — together. MCA Batch 2026 signs off in gold.",
    emoji: "💛",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen relative pt-24">
      <ParticleBackground />

      {/* Hero */}
      <div className="relative z-10 py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-gold/8 via-transparent to-transparent" />
        <RevealOnScroll>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mx-auto mb-8 shadow-gold-strong">
            <GraduationCap size={36} className="text-navy-deep" />
          </div>
          <p className="text-gold text-xs tracking-widest uppercase mb-4">The Story of Us</p>
          <h1 className="section-title text-white mb-6">
            About <span className="gold-text">Batch 2026</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            We weren't just a batch. We were a family that happened to share classrooms, canteen tables, exam halls, and four of the most unforgettable years of our lives.
          </p>
        </RevealOnScroll>
      </div>

      {/* SGSITS Section */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 mb-20">
        <RevealOnScroll>
          <div className="glass-card p-8 md:p-12 text-center border border-gold/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />
            <div className="relative">
              <div className="flex items-center justify-center gap-3 mb-6">
                <MapPin size={20} className="text-gold" />
                <span className="text-gold/80 text-sm">Indore, Madhya Pradesh</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Shri G.S. Institute of Technology & Science
              </h2>
              <p className="text-white/50 mb-2">23, Park Road, Indore — 452003</p>
              <p className="text-white/70 max-w-2xl mx-auto text-base leading-relaxed mb-8">
                SGSITS Indore isn't just our college. It's the place where we grew up. The labs that tested our patience, the canteen that fueled our nights, the corridors where we built friendships that will last a lifetime. SGSITS gave us more than a degree — it gave us each other.
              </p>
              <a
                href="https://www.sgsits.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2"
              >
                <GraduationCap size={16} />
                Visit SGSITS Official Website
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Stats */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 mb-20">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {batchStats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="glass-card-hover p-6 text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${stat.color}20`, border: `1px solid ${stat.color}40` }}
                >
                  <stat.icon size={22} style={{ color: stat.color }} />
                </div>
                <div className="font-display text-3xl font-bold mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Year-by-year highlights */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 mb-20">
        <RevealOnScroll className="text-center mb-12">
          <h2 className="section-title text-white">
            Our <span className="gold-text">Journey</span>
          </h2>
          <p className="text-white/50 mt-4">Four years. Countless moments. One unforgettable batch.</p>
        </RevealOnScroll>

        <div className="relative">
          {/* Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

          <div className="space-y-10">
            {highlights.map((h, i) => (
              <RevealOnScroll key={h.year} delay={i * 0.08} direction="left">
                <div className="flex gap-6">
                  {/* Dot */}
                  <div className="relative flex-shrink-0 w-12 flex items-start justify-center pt-1">
                    <motion.div
                      className="w-5 h-5 rounded-full border-2 border-gold bg-navy-deep shadow-gold flex items-center justify-center text-[9px]"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.2, type: "spring" }}
                    >
                      {h.emoji}
                    </motion.div>
                  </div>
                  <div className="glass-card p-5 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-gold border border-gold/30 px-2 py-0.5 rounded-full">{h.year}</span>
                      <h3 className="font-display text-lg font-bold text-white">{h.title}</h3>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* Final quote */}
      <div className="relative z-10 py-20 px-4 text-center">
        <RevealOnScroll>
          <blockquote className="font-display text-3xl md:text-5xl text-white/90 max-w-3xl mx-auto leading-tight mb-6">
            <TextReveal text='"We came as students. We left as engineers. But most importantly — we left as family."' />
          </blockquote>
          <p className="text-gold/70 text-sm tracking-widest uppercase">— MCA Batch 2026, SGSITS Indore</p>
        </RevealOnScroll>
      </div>

      {/* CTA */}
      <div className="relative z-10 pb-20 px-4 text-center">
        <RevealOnScroll>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/memories" className="btn-gold">Explore Memories</Link>
            <a
              href="https://www.sgsits.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2"
            >
              <ExternalLink size={14} /> SGSITS Website
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
