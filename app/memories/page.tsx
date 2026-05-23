// app/memories/page.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, Share2, Star, X, Send, Download, Loader2 } from "lucide-react";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/animations/RevealOnScroll";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { demoMemories } from "@/lib/demoData";
import { toggleLike, addComment, getMemories } from "@/lib/firestore";
import { downloadFile } from "@/lib/storage";
import { useAuthContext } from "@/components/layout/AuthProvider";
import { timeAgo, cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

import { Memory } from "@/types";

export default function MemoriesPage() {
  const { user } = useAuthContext();
  const [memories, setMemories] = useState<Memory[]>(demoMemories as Memory[]);
  const [selected, setSelected] = useState<Memory | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const filters = [
    { value: "all", label: "All Memories" },
    { value: "image", label: "📸 Photos" },
    { value: "video", label: "🎬 Videos" },
    { value: "pinned", label: "📌 Pinned" },
  ];

  const filtered = memories.filter((m) => {
    if (filter === "image") return m.mediaType === "image";
    if (filter === "video") return m.mediaType === "video";
    if (filter === "pinned") return m.pinned;
    return true;
  });

  const handleLike = async (id: string) => {
    if (!user) { toast.error("Sign in to like memories"); return; }
    setMemories((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const liked = m.likes.includes(user.uid);
        return { ...m, likes: liked ? m.likes.filter((l) => l !== user.uid) : [...m.likes, user.uid] };
      })
    );
  };

  const handleComment = async () => {
    if (!user || !selected || !comment.trim()) return;
    const newComment = {
      id: uuidv4(),
      userId: user.uid,
      userName: user.displayName || "Anonymous",
      userPhoto: user.photoURL || "",
      text: comment.trim(),
      createdAt: new Date(),
    };
    setMemories((prev) =>
      prev.map((m) =>
        m.id === selected.id ? { ...m, comments: [...m.comments, newComment] } : m
      )
    );
    setSelected((s) => s ? { ...s, comments: [...s.comments, newComment] } : null);
    setComment("");
    toast.success("Comment added!");
  };

  const handleDownload = async (url: string) => {
    await downloadFile(url, `memory-${Date.now()}.jpg`);
    toast.success("Download started!");
  };

  return (
    <div className="min-h-screen relative pt-24">
      <ParticleBackground />

      {/* Header */}
      <div className="relative z-10 py-16 px-4 text-center">
        <RevealOnScroll>
          <p className="text-gold text-xs tracking-widest uppercase mb-4">Our Story</p>
          <h1 className="section-title text-white mb-4">
            Memory <span className="gold-text">Feed</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            Every upload, every caption, every like — a piece of our MCA journey at SGSITS Indore, alive forever.
          </p>
        </RevealOnScroll>

        {/* Filters */}
        <RevealOnScroll delay={0.2}>
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm transition-all duration-300",
                  filter === f.value
                    ? "bg-gold text-navy-deep font-medium"
                    : "glass-card text-white/60 hover:text-white"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </RevealOnScroll>
      </div>

      {/* Upload CTA */}
      <div className="relative z-10 text-center mb-8">
        <Link href="/upload" className="btn-gold text-sm inline-flex items-center gap-2">
          + Share Your Memory
        </Link>
      </div>

      {/* Masonry grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((memory, i) => (
            <motion.div
              key={memory.id}
              className="break-inside-avoid"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
            >
              <div
                className="glass-card-hover overflow-hidden cursor-pointer group mb-4"
                onClick={() => setSelected(memory as any)}
              >
                {memory.mediaUrl && (
                  <div className="relative overflow-hidden">
                    <Image
                      src={memory.mediaUrl}
                      alt={memory.caption}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {memory.pinned && (
                      <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-gold/20 border border-gold/30 text-gold text-xs">
                        <Star size={10} /> Pinned
                      </div>
                    )}
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {memory.userPhoto && (
                      <Image src={memory.userPhoto} alt={memory.userName} width={28} height={28} className="rounded-full border border-gold/20" />
                    )}
                    <span className="text-white/80 text-sm font-medium">{memory.userName}</span>
                    <span className="text-white/30 text-xs ml-auto">{timeAgo(memory.createdAt)}</span>
                  </div>
                  <p className="text-white/60 text-sm line-clamp-3">{memory.caption}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleLike(memory.id); }}
                      className={cn(
                        "flex items-center gap-1 text-xs transition-colors duration-300",
                        user && memory.likes.includes(user.uid) ? "text-red-400" : "text-white/40 hover:text-red-400"
                      )}
                    >
                      <Heart size={12} className={user && memory.likes.includes(user.uid) ? "fill-current" : ""} />
                      {memory.likes.length}
                    </button>
                    <span className="flex items-center gap-1 text-xs text-white/40">
                      <MessageSquare size={12} /> {memory.comments.length}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Memory Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelected(null)} />
            <motion.div
              className="relative glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              {selected.mediaUrl && (
                <div className="relative">
                  <Image src={selected.mediaUrl} alt={selected.caption} width={800} height={600} className="w-full h-auto rounded-t-2xl" />
                  <button
                    onClick={() => handleDownload(selected.mediaUrl!)}
                    className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:text-gold transition-colors"
                  >
                    <Download size={14} />
                  </button>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {selected.userPhoto && (
                    <Image src={selected.userPhoto} alt={selected.userName} width={40} height={40} className="rounded-full border border-gold/30" />
                  )}
                  <div>
                    <p className="text-white font-medium">{selected.userName}</p>
                    <p className="text-white/30 text-xs">{timeAgo(selected.createdAt)}</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{selected.caption}</p>

                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                  <button
                    onClick={() => handleLike(selected.id)}
                    className={cn(
                      "flex items-center gap-2 text-sm transition-colors duration-300",
                      user && selected.likes.includes(user.uid) ? "text-red-400" : "text-white/40 hover:text-red-400"
                    )}
                  >
                    <Heart size={16} className={user && selected.likes.includes(user.uid) ? "fill-current" : ""} />
                    {selected.likes.length} Likes
                  </button>
                  <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied!"); }} className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                    <Share2 size={16} /> Share
                  </button>
                </div>

                {/* Comments */}
                <div className="space-y-3 mb-4">
                  <p className="text-white/60 text-sm font-medium">{selected.comments.length} Comments</p>
                  {selected.comments.map((c: any) => (
                    <div key={c.id} className="flex gap-3">
                      {c.userPhoto && <Image src={c.userPhoto} alt={c.userName} width={28} height={28} className="rounded-full border border-white/10 flex-shrink-0" />}
                      <div className="bg-white/5 rounded-xl px-3 py-2 flex-1">
                        <p className="text-white text-xs font-medium">{c.userName}</p>
                        <p className="text-white/60 text-sm">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {user && (
                  <div className="flex gap-2">
                    <input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleComment()}
                      placeholder="Write a comment..."
                      className="input-glass flex-1 text-sm"
                    />
                    <button onClick={handleComment} className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/30 transition-colors">
                      <Send size={14} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
