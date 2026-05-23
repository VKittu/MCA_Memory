// app/gallery/page.tsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ZoomIn, X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/animations/RevealOnScroll";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { downloadFile } from "@/lib/storage";
import { getGalleryItems } from "@/lib/firestore";
import { ALBUMS, cn, getAlbumInfo } from "@/lib/utils";
import { GalleryItem } from "@/types";
import toast from "react-hot-toast";

const galleryItems = [
  { id: "1", url: "https://i.ibb.co/KjVpNqc0/Whats-App-Image-2026-05-14-at-9-57-50-PM.jpg", caption: "Handprint Memories — Batch Signatures", album: "classroom", mediaType: "image" },
  { id: "2", url: "https://i.ibb.co/1fVgYCtq/Whats-App-Image-2026-05-14-at-10-23-54-PM.jpg", caption: "ATC Group Photo — MCA Batch 2026", album: "classroom", mediaType: "image" },
  { id: "3", url: "https://i.ibb.co/SX77s0Ns/Whats-App-Image-2026-05-14-at-9-57-54-PM.jpg", caption: "Farewell Moments — True Batch Vibes", album: "farewell", mediaType: "image" },
  { id: "4", url: "https://i.ibb.co/kVyBZnsq/Whats-App-Image-2026-05-12-at-8-01-49-PM.jpg", caption: "Real Batch Photo — SGSITS Memories", album: "farewell", mediaType: "image" },
  { id: "5", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop", caption: "Pachmarhi Trip — Mountain Adventures", album: "trip", mediaType: "image" },
  { id: "6", url: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop", caption: "Batch Trip — Nature Walks", album: "trip", mediaType: "image" },
  { id: "7", url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop", caption: "Hackathon Win — State Level Champions", album: "fest", mediaType: "image" },
  { id: "8", url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=600&fit=crop", caption: "College Fest — MCA Performs", album: "fest", mediaType: "image" },
  { id: "9", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop", caption: "Canteen Chronicles — Evening Chai", album: "canteen", mediaType: "image" },
  { id: "10", url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop", caption: "Canteen Lunch — The Usual Table", album: "canteen", mediaType: "image" },
  { id: "11", url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop", caption: "Group Study Session — Pre-Exam Panic", album: "classroom", mediaType: "image" },
  { id: "12", url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop", caption: "Library Moments — Final Sem Rush", album: "classroom", mediaType: "image" },
];

export default function GalleryPage() {
  const [activeAlbum, setActiveAlbum] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeAlbum === "all" ? galleryItems : galleryItems.filter((i) => i.album === activeAlbum);

  const handleDownload = async (url: string, caption: string) => {
    await downloadFile(url, `${caption.replace(/\s+/g, "-").toLowerCase()}.jpg`);
    toast.success("Image downloaded!");
  };

  const prev = () => setLightbox((l) => (l !== null ? Math.max(0, l - 1) : null));
  const next = () => setLightbox((l) => (l !== null ? Math.min(filtered.length - 1, l + 1) : null));

  return (
    <div className="min-h-screen relative pt-24">
      <ParticleBackground />

      {/* Header */}
      <div className="relative z-10 py-16 px-4 text-center">
        <RevealOnScroll>
          <p className="text-gold text-xs tracking-widest uppercase mb-4">Visual Memories</p>
          <h1 className="section-title text-white mb-4">
            Memory <span className="gold-text">Gallery</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            Every photo tells a story. Every album holds a chapter of our MCA journey at SGSITS Indore.
          </p>
        </RevealOnScroll>

        {/* Album filters */}
        <RevealOnScroll delay={0.2}>
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            <button
              onClick={() => setActiveAlbum("all")}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-all duration-300",
                activeAlbum === "all" ? "bg-gold text-navy-deep font-medium" : "glass-card text-white/60 hover:text-white"
              )}
            >
              🌟 All Albums
            </button>
            {ALBUMS.map((album) => (
              <button
                key={album.value}
                onClick={() => setActiveAlbum(album.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm transition-all duration-300",
                  activeAlbum === album.value
                    ? "font-medium"
                    : "glass-card text-white/60 hover:text-white"
                )}
                style={
                  activeAlbum === album.value
                    ? { background: `${album.color}30`, border: `1px solid ${album.color}60`, color: album.color }
                    : {}
                }
              >
                {album.label}
              </button>
            ))}
          </div>
        </RevealOnScroll>
      </div>

      {/* Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAlbum}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((item, i) => {
              const albumInfo = getAlbumInfo(item.album);
              return (
                <motion.div
                  key={item.id}
                  className="relative group overflow-hidden rounded-xl cursor-pointer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setLightbox(i)}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={item.url}
                      alt={item.caption}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 gap-3">
                      <ZoomIn size={24} className="text-white" />
                      <p className="text-white text-xs text-center px-3 line-clamp-2">{item.caption}</p>
                    </div>

                    {/* Album badge */}
                    <div
                      className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `${albumInfo.color}30`, border: `1px solid ${albumInfo.color}50`, color: albumInfo.color }}
                    >
                      {albumInfo.label.split(" ")[0]}
                    </div>

                    {/* Download button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDownload(item.url, item.caption); }}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-gold"
                    >
                      <Download size={12} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setLightbox(null)} />

            <motion.div
              className="relative z-10 max-w-4xl w-full mx-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image
                  src={filtered[lightbox]?.url}
                  alt={filtered[lightbox]?.caption}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex items-center justify-between mt-4 px-2">
                <p className="text-white/70 text-sm">{filtered[lightbox]?.caption}</p>
                <div className="flex items-center gap-2">
                  <span className="text-white/30 text-xs">{lightbox + 1} / {filtered.length}</span>
                  <button
                    onClick={() => handleDownload(filtered[lightbox].url, filtered[lightbox].caption)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/20 border border-gold/30 text-gold text-sm hover:bg-gold/30 transition-colors"
                  >
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>

              {/* Nav buttons */}
              <button
                onClick={prev}
                disabled={lightbox === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full glass-card flex items-center justify-center text-white disabled:opacity-20 hover:text-gold transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                disabled={lightbox === filtered.length - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full glass-card flex items-center justify-center text-white disabled:opacity-20 hover:text-gold transition-colors"
              >
                <ChevronRight size={20} />
              </button>

              {/* Close */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/70 hover:text-white"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
