// app/yearbook/page.tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { demoMemories } from "@/lib/demoData";

const galleryCollageItems = [
  {
    id: "g1",
    url: "https://i.ibb.co/KjVpNqc0/Whats-App-Image-2026-05-14-at-9-57-50-PM.jpg",
    caption: "Handprint Memories — Batch Signatures",
  },
  {
    id: "g2",
    url: "https://i.ibb.co/1fVgYCtq/Whats-App-Image-2026-05-14-at-10-23-54-PM.jpg",
    caption: "ATC Group Photo — MCA Batch 2026",
  },
  {
    id: "g3",
    url: "https://i.ibb.co/SX77s0Ns/Whats-App-Image-2026-05-14-at-9-57-54-PM.jpg",
    caption: "Farewell Moments — True Batch Vibes",
  },
  {
    id: "g4",
    url: "https://i.ibb.co/kVyBZnsq/Whats-App-Image-2026-05-12-at-8-01-49-PM.jpg",
    caption: "Real Batch Photo — SGSITS Memories",
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    caption: "Pachmarhi Trip — Mountain Adventures",
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
    caption: "Hackathon Win — State Level Champions",
  },
  {
    id: "g7",
    url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=600&fit=crop",
    caption: "College Fest — MCA Performs",
  },
  {
    id: "g8",
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
    caption: "Canteen Chronicles — Evening Chai",
  },
];

const collageItems = [
  ...demoMemories.map((memory) => ({
    id: memory.id,
    url: memory.mediaUrl,
    caption: memory.caption,
  })),
  ...galleryCollageItems,
];

const scrollVariants = {
  animate: {
    x: ["0%", "-50%"],
    transition: {
      duration: 28,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

export default function YearbookPage() {
  return (
    <div className="min-h-screen relative pt-24 overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 py-16 px-4 text-center">
        <p className="text-gold text-xs tracking-widest uppercase mb-4">Endless Collage</p>
        <h1 className="section-title text-white mb-4">
          Yearbook <span className="gold-text">Collage</span>
        </h1>
        <p className="text-white/60 max-w-3xl mx-auto">
          A never-ending motion of gallery and memory snapshots from our MCA journey. Watch the photos float, pulse,
          and loop forever across the page.
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-24 space-y-12">
        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/5 shadow-2xl shadow-black/20">
          <motion.div
            className="flex gap-6 py-10"
            variants={scrollVariants}
            animate="animate"
          >
            {[...collageItems, ...collageItems].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="relative min-w-[280px] flex-shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-xl shadow-black/40"
              >
                <div className="relative h-72 w-[280px]">
                  <Image
                    src={item.url}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm leading-snug line-clamp-2">{item.caption}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {collageItems.slice(0, 4).map((item, index) => (
            <motion.div
              key={item.id}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20"
              animate={{ y: [0, -18, 0], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 7 + index, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative h-56">
                <Image src={item.url} alt={item.caption} fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-sm leading-tight">
                {item.caption}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/20 p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,212,84,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_25%)] pointer-events-none" />
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {collageItems.slice(4, 10).map((item, index) => (
              <motion.div
                key={item.id}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative h-44">
                  <Image src={item.url} alt={item.caption} fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-sm leading-tight">
                  {item.caption}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
