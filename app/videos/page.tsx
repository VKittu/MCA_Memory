// app/videos/page.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Download, X, Film, ExternalLink } from "lucide-react";
import Image from "next/image";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/animations/RevealOnScroll";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { cn } from "@/lib/utils";

const videoData = [
  {
    id: "v1",
    title: "MCA Batch 2026 — Official Farewell Reel",
    description: "The most emotional 4 minutes you'll ever watch. From our first day at SGSITS to our final goodbye — Batch 2026's complete journey in one cinematic reel.",
    thumbnail: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=450&fit=crop",
    duration: "4:32",
    category: "farewell",
    youtubeId: null,
    uploadedBy: "MCA Batch 2026",
  },
  {
    id: "v2",
    title: "Pachmarhi Trip 2023 — Full Video",
    description: "Mountains, waterfalls, bonfires, and the best batch in the world. The Pachmarhi trip that made us a family.",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop",
    duration: "8:15",
    category: "trip",
    youtubeId: null,
    uploadedBy: "Rohit Patel",
  },
  {
    id: "v3",
    title: "Hackathon Victory — State Level Win",
    description: "48 hours, zero sleep, and a trophy. Watch the full journey of how SGSITS MCA Batch 2026 conquered the state-level hackathon.",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop",
    duration: "6:48",
    category: "achievement",
    youtubeId: null,
    uploadedBy: "Priya Verma",
  },
  {
    id: "v4",
    title: "Fresher's Night 2022 — The Beginning",
    description: "The night that started it all. The fresher's party that turned strangers into the most amazing batch SGSITS has ever seen.",
    thumbnail: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=450&fit=crop",
    duration: "5:20",
    category: "fest",
    youtubeId: null,
    uploadedBy: "Sneha Joshi",
  },
  {
    id: "v5",
    title: "Final Farewell Speech — The Tears We Cried",
    description: "The speech that no one could get through without crying. The last words of MCA Batch 2026 at SGSITS Indore.",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop",
    duration: "12:04",
    category: "farewell",
    youtubeId: null,
    uploadedBy: "Aarav Sharma",
  },
  {
    id: "v6",
    title: "College Fest Performances — MCA on Stage",
    description: "Dances, dramas, music — MCA Batch 2026 ruled every stage at SGSITS Indore. Here are all our best performances.",
    thumbnail: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=450&fit=crop",
    duration: "9:33",
    category: "fest",
    youtubeId: null,
    uploadedBy: "Kavya Mehta",
  },
];

const categories = ["all", "farewell", "trip", "achievement", "fest"];

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<typeof videoData[0] | null>(null);

  const filtered = activeCategory === "all"
    ? videoData
    : videoData.filter((v) => v.category === activeCategory);

  const categoryColors: Record<string, string> = {
    farewell: "#C9A84C",
    trip: "#10B981",
    achievement: "#8B5CF6",
    fest: "#F59E0B",
  };

  return (
    <div className="min-h-screen relative pt-24">
      <ParticleBackground />

      {/* Header */}
      <div className="relative z-10 py-16 px-4 text-center">
        <RevealOnScroll>
          <p className="text-gold text-xs tracking-widest uppercase mb-4">Moving Memories</p>
          <h1 className="section-title text-white mb-4">
            Video <span className="gold-text">Memories</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            When photos aren't enough — watch our moments come alive. Every reel, every performance, every tear captured.
          </p>
        </RevealOnScroll>

        {/* Filters */}
        <RevealOnScroll delay={0.2}>
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm capitalize transition-all duration-300",
                  activeCategory === cat
                    ? cat === "all"
                      ? "bg-gold text-navy-deep font-medium"
                      : "font-medium"
                    : "glass-card text-white/60 hover:text-white"
                )}
                style={
                  activeCategory === cat && cat !== "all"
                    ? { background: `${categoryColors[cat]}30`, border: `1px solid ${categoryColors[cat]}50`, color: categoryColors[cat] }
                    : {}
                }
              >
                {cat === "all" ? "🎬 All Videos" : cat}
              </button>
            ))}
          </div>
        </RevealOnScroll>
      </div>

      {/* Video Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {filtered.map((video, i) => {
              const color = categoryColors[video.category] || "#C9A84C";
              return (
                <motion.div
                  key={video.id}
                  className="glass-card overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setSelectedVideo(video)}
                  whileHover={{ y: -6 }}
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ scale: 1.2 }}
                      >
                        <Play size={20} className="text-white ml-1 fill-white" />
                      </motion.div>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/70 text-white text-xs font-mono">
                      {video.duration}
                    </div>

                    {/* Category badge */}
                    <div
                      className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs capitalize"
                      style={{ background: `${color}30`, border: `1px solid ${color}50`, color }}
                    >
                      {video.category}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-gold transition-colors duration-300 line-clamp-1">
                      {video.title}
                    </h3>
                    <p className="text-white/50 text-sm line-clamp-2 mb-4">{video.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/30 text-xs">By {video.uploadedBy}</span>
                      <div className="flex items-center gap-1 text-white/40 group-hover:text-gold transition-colors duration-300 text-xs">
                        <Play size={12} /> Watch Now
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setSelectedVideo(null)}
            />
            <motion.div
              className="relative glass-card max-w-3xl w-full z-10 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center text-white/70 hover:text-white"
              >
                <X size={16} />
              </button>

              {/* Video player area */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <Image
                  src={selectedVideo.thumbnail}
                  alt={selectedVideo.title}
                  fill
                  className="object-cover opacity-30"
                />
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 rounded-full bg-gold/20 border-2 border-gold/50 flex items-center justify-center mx-auto mb-4">
                    <Film size={32} className="text-gold" />
                  </div>
                  <p className="text-white/60 text-sm">
                    Video will be available after upload to Firebase Storage
                  </p>
                  <p className="text-white/30 text-xs mt-2">Upload your video in the Upload section</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-display text-xl text-white font-bold">{selectedVideo.title}</h3>
                  <span className="text-white/30 text-xs flex-shrink-0 font-mono">{selectedVideo.duration}</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{selectedVideo.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/30 text-xs">By {selectedVideo.uploadedBy}</span>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/20 border border-gold/30 text-gold text-sm hover:bg-gold/30 transition-colors">
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
