// app/page.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Camera, Heart, Clock, MessageSquare, Video,
  Upload, GraduationCap, ChevronDown, Star, Sparkles,
  ExternalLink, Play
} from "lucide-react";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { RevealOnScroll, StaggerContainer, StaggerItem, TextReveal } from "@/components/animations/RevealOnScroll";
import { LoadingScreen } from "@/components/animations/LoadingScreen";
import { demoMemories, demoStudents } from "@/lib/demoData";
import { cn } from "@/lib/utils";

const heroSlides = [
  {
    image: "https://i.ibb.co/KjVpNqc0/Whats-App-Image-2026-05-14-at-9-57-50-PM.jpg",
    caption: "First Day at SGSITS Indore",
  },
  {
    image: "https://i.ibb.co/1fVgYCtq/Whats-App-Image-2026-05-14-at-10-23-54-PM.jpg",
    caption: "Classroom Chronicles",
  },
  {
    image: "https://i.ibb.co/SX77s0Ns/Whats-App-Image-2026-05-14-at-9-57-54-PM.jpg",
    caption: "The Night We Said Goodbye",
  },
  {
    image: "https://i.ibb.co/kVyBZnsq/Whats-App-Image-2026-05-12-at-8-01-49-PM.jpg",
    caption: "Pachmarhi Trip — Unforgettable",
  },
];

const features = [
  { icon: Camera, label: "Memory Feed", desc: "Upload & relive college moments", href: "/memories", color: "#C9A84C" },
  { icon: Clock, label: "Farewell Timeline", desc: "Our journey from day one", href: "/timeline", color: "#10B981" },
  { icon: MessageSquare, label: "Confession Wall", desc: "Anonymous secrets & stories", href: "/confessions", color: "#F59E0B" },
  { icon: Video, label: "Video Memories", desc: "Reels, moments & farewells", href: "/videos", color: "#EF4444" },
  { icon: Heart, label: "Guestbook", desc: "Messages from hearts", href: "/guestbook", color: "#EC4899" },
  { icon: Upload, label: "Upload Memory", desc: "Add your precious moments", href: "/upload", color: "#3B82F6" },
  { icon: GraduationCap, label: "About Batch", desc: "The story of Batch 2026", href: "/about", color: "#14B8A6" },
];

const marqueeWords = [
  "MEMORIES", "SGSITS", "MCA 2026", "INDORE", "FAREWELL", "FOREVER",
  "TOGETHER", "MEMORIES", "SGSITS", "MCA 2026", "INDORE", "FAREWELL",
];

export default function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <LoadingScreen />
      <ParticleBackground />

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Slideshow */}
        <AnimatePresence mode="sync">
          <motion.div
            key={slideIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={heroSlides[slideIndex].image}
              alt={heroSlides[slideIndex].caption}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/30 via-navy-deep/20 to-navy-deep/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/20 via-transparent to-navy-deep/20 z-10" />

        {/* Animated blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 blob-gold opacity-10 z-10" />
        <div className="absolute bottom-20 right-10 w-60 h-60 blob-purple opacity-10 z-10" />

        {/* Content */}
        <motion.div
          className="relative z-20 text-center max-w-5xl mx-auto px-4"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Sparkles size={12} className="text-gold" />
            <span className="text-gold text-xs font-medium tracking-widest uppercase">
              MCA Batch 2026 · SGSITS Indore
            </span>
            <Sparkles size={12} className="text-gold" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="block text-white">This isn't just</span>
            <span className="block gold-text-animated">a website…</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl md:text-2xl text-white/70 font-display italic mb-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            It's our entire college journey.
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-white/50 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            From first benches to farewell tears —{" "}
            <span className="text-gold/80">MCA Batch 2026</span> lives forever here.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Link href="/memories" className="btn-gold text-sm">
              <span className="relative z-10 flex items-center gap-2">
                <Heart size={16} /> Explore Memories
              </span>
            </Link>
            <Link href="/upload" className="btn-ghost text-sm">
              <span className="flex items-center gap-2">
                <Upload size={16} /> Upload Your Memory
              </span>
            </Link>
            <a
              href="https://www.sgsits.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/40 hover:text-gold transition-colors"
            >
              <GraduationCap size={16} />
              SGSITS Official
              <ExternalLink size={12} />
            </a>
          </motion.div>

          {/* Slide caption */}
          <motion.p
            key={`cap-${slideIndex}`}
            className="mt-8 text-xs text-white/30 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            📸 {heroSlides[slideIndex].caption}
          </motion.p>

          {/* Slide dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i === slideIndex ? "w-8 bg-gold" : "w-2 bg-white/20"
                )}
              />
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} className="text-gold/50" />
        </motion.div>
      </section>

      {/* ─── MARQUEE ──────────────────────────────────────────────────── */}
      <div className="relative z-10 py-6 overflow-hidden border-y border-white/5 bg-navy-deep/50 backdrop-blur-sm">
        <div className="flex animate-marquee gap-8 w-max">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="text-white/20 text-sm tracking-[0.4em] uppercase font-medium whitespace-nowrap">
              {w} <span className="text-gold/40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── STATS ────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "60+", label: "Batch Students", icon: "🎓" },
              { num: "4", label: "Years Together", icon: "🗓️" },
              { num: "∞", label: "Memories Made", icon: "💛" },
              { num: "1", label: "SGSITS Family", icon: "🏫" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="glass-card-hover p-6 text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="font-display text-4xl font-bold gold-text mb-1">{stat.num}</div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── FEATURES GRID ────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="text-center mb-16">
            <p className="text-gold text-xs tracking-widest uppercase mb-4">Everything in One Place</p>
            <h2 className="section-title text-white mb-4">
              Your Complete{" "}
              <span className="gold-text">Memory World</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Every laugh, every tear, every milestone of our MCA journey at SGSITS Indore — preserved and relived forever.
            </p>
          </RevealOnScroll>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <StaggerItem key={f.label}>
                <Link href={f.href}>
                  <div className="glass-card-hover p-6 group h-full">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}
                    >
                      <f.icon size={22} style={{ color: f.color }} />
                    </div>
                    <h3 className="font-semibold text-white mb-1 group-hover:text-gold transition-colors duration-300">
                      {f.label}
                    </h3>
                    <p className="text-white/40 text-sm">{f.desc}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── MEMORY PREVIEW ───────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-purple-deep/30 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          <RevealOnScroll className="text-center mb-16">
            <p className="text-gold text-xs tracking-widest uppercase mb-4">Recent Moments</p>
            <h2 className="section-title text-white">
              Fresh from the{" "}
              <span className="gold-text">Memory Feed</span>
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {demoMemories.slice(0, 2).map((memory, i) => (
              <RevealOnScroll key={memory.id} delay={i * 0.15}>
                <div className="glass-card-hover overflow-hidden group">
                  {memory.mediaUrl && (
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={memory.mediaUrl}
                        alt={memory.caption}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      {memory.pinned && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-gold/20 border border-gold/30 text-gold text-xs">
                          <Star size={10} /> Pinned
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Image
                        src={memory.userPhoto}
                        alt={memory.userName}
                        width={32}
                        height={32}
                        className="rounded-full border border-gold/30"
                      />
                      <span className="text-white/80 text-sm font-medium">{memory.userName}</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-3">{memory.caption}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="flex items-center gap-1 text-xs text-white/40">
                        <Heart size={12} /> {memory.likes.length}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-white/40">
                        <MessageSquare size={12} /> {memory.comments.length}
                      </span>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll className="text-center">
            <Link href="/memories" className="btn-gold">
              <span className="flex items-center gap-2">
                <Camera size={16} /> View All Memories
              </span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── STUDENTS FLOATING PREVIEW ────────────────────────────────── */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="text-center mb-16">
            <p className="text-gold text-xs tracking-widest uppercase mb-4">The Stars of Our Story</p>
            <h2 className="section-title text-white">
              Meet the{" "}
              <span className="gold-text">Batch 2026</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mt-4">
              The incredible minds that made every day at SGSITS Indore unforgettable.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {demoStudents.map((student, i) => (
              <RevealOnScroll key={student.id} delay={i * 0.08} direction="scale">
                <div className="group text-center">
                  <div className="relative mb-3 mx-auto w-20 h-20">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold/20 transition-all duration-500 group-hover:border-gold/60 group-hover:shadow-gold">
                      <Image
                        src={student.photo}
                        alt={student.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full border border-gold/20 opacity-0 group-hover:opacity-100"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <p className="text-white/80 text-xs font-medium group-hover:text-gold transition-colors duration-300 truncate">
                    {student.name.split(" ")[0]}
                  </p>
                  <p className="text-white/30 text-[10px] truncate">{student.nickname}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll className="text-center">
            <Link href="/memories" className="btn-ghost">
              Explore Memories →
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── SGSITS TRIBUTE ───────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-purple-deep/20 to-navy-deep" />
        <div className="absolute inset-0 bg-gradient-radial from-gold/8 via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mx-auto mb-8 shadow-gold-strong">
              <GraduationCap size={32} className="text-navy-deep" />
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Shri G.S. Institute of</span>
              <br />
              <span className="gold-text">Technology & Science</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
              SGSITS Indore — where dreams were given wings, where futures were shaped, and where 60 strangers became one unforgettable family called <strong className="text-gold/80">MCA Batch 2026</strong>.
            </p>
            <p className="text-white/40 text-sm mb-8">
              23, Park Road, Indore, Madhya Pradesh – 452003
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
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── QUOTE ───────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <div className="text-6xl mb-8 opacity-20 font-display">"</div>
            <blockquote className="font-display text-3xl md:text-5xl text-white/90 leading-tight mb-8">
              <TextReveal
                text="These aren't just memories. They are the proof that we truly lived."
              />
            </blockquote>
            <p className="text-gold/70 text-sm tracking-widest uppercase">— MCA Batch 2026, SGSITS Indore</p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="section-title gold-text mb-4">Your memory awaits.</h2>
            <p className="text-white/50 mb-8">
              Upload your farewell moment and become part of this digital memory world forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload" className="btn-gold">
                <span className="flex items-center gap-2">
                  <Upload size={16} /> Upload Your Memory
                </span>
              </Link>
              <Link href="/memories" className="btn-ghost">
                <span className="flex items-center gap-2">
                  <Play size={16} /> Explore Feed
                </span>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
