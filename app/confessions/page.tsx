// app/confessions/page.tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Send, Flame, Loader2, Eye, EyeOff } from "lucide-react";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/animations/RevealOnScroll";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { demoConfessions } from "@/lib/demoData";
import { addConfession, getConfessions, likeConfession } from "@/lib/firestore";
import { timeAgo, cn } from "@/lib/utils";
import toast from "react-hot-toast";

const anonymousNames = [
  "Midnight Dreamer 🌙", "Canteen Ghost 🍵", "Backbench Legend 🎭",
  "Silent Coder 💻", "Late Night Learner ⭐", "Corridor Philosopher 🌿",
  "Hidden Poet 📝", "Unnamed Hero 🦋", "Mystery Batchmate 🎭",
];

export default function ConfessionsPage() {
  const [confessions, setConfessions] = useState(demoConfessions as any[]);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reveal, setReveal] = useState<Record<string, boolean>>({});
  const [anonName] = useState(anonymousNames[Math.floor(Math.random() * anonymousNames.length)]);

  const handleSubmit = async () => {
    if (!content.trim() || content.trim().length < 10) {
      toast.error("Confession must be at least 10 characters");
      return;
    }
    if (content.length > 500) {
      toast.error("Confession must be under 500 characters");
      return;
    }

    setSubmitting(true);
    try {
      await addConfession({ anonymousName: anonName, content: content.trim() });
      const newConf = {
        id: `conf_${Date.now()}`,
        anonymousName: anonName,
        content: content.trim(),
        likes: 0,
        approved: true,
        createdAt: new Date(),
      };
      setConfessions((prev) => [newConf, ...prev]);
      setContent("");
      toast.success("Confession posted anonymously! 🤫");
    } catch {
      toast.error("Failed to post confession");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (id: string) => {
    try {
      await likeConfession(id);
      setConfessions((prev) =>
        prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
      );
    } catch {
      // local only for demo
      setConfessions((prev) =>
        prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
      );
    }
  };

  const toggleReveal = (id: string) => {
    setReveal((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const neonColors = ["#C9A84C", "#8B5CF6", "#EF4444", "#10B981", "#F59E0B", "#EC4899"];

  return (
    <div className="min-h-screen relative pt-24">
      <ParticleBackground />

      {/* Header */}
      <div className="relative z-10 py-16 px-4 text-center">
        <RevealOnScroll>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-glow/30 bg-purple-glow/10 mb-6">
            <Lock size={12} className="text-purple-glow" />
            <span className="text-purple-glow text-xs tracking-widest uppercase">100% Anonymous</span>
          </div>
          <h1 className="section-title text-white mb-4">
            Confession <span className="gold-text">Wall</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            The secrets, the laughs, the hidden memories. Say what you never said. No names, no judgement, just honesty.
          </p>
        </RevealOnScroll>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-20">
        {/* Write confession */}
        <RevealOnScroll delay={0.1}>
          <div className="glass-card p-6 mb-10 border border-purple-glow/20">
            <div className="flex items-center gap-2 mb-4">
              <Lock size={14} className="text-purple-glow" />
              <p className="text-white/60 text-sm">
                Posting as: <span className="text-purple-glow font-medium">{anonName}</span>
              </p>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, 500))}
              placeholder="Share your hidden memory, funny moment, secret crush, or anything you never said out loud…"
              rows={4}
              className="input-glass resize-none mb-3"
            />
            <div className="flex items-center justify-between">
              <span className="text-white/30 text-xs">{content.length}/500</span>
              <button
                onClick={handleSubmit}
                disabled={submitting || content.trim().length < 10}
                className={cn(
                  "flex items-center gap-2 btn-gold text-sm px-6",
                  (submitting || content.trim().length < 10) && "opacity-50 cursor-not-allowed"
                )}
              >
                {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                Post Anonymously
              </button>
            </div>
          </div>
        </RevealOnScroll>

        {/* Confessions list */}
        <div className="space-y-4">
          {confessions.map((conf, i) => {
            const color = neonColors[i % neonColors.length];
            const isRevealed = reveal[conf.id];

            return (
              <RevealOnScroll key={conf.id} delay={i * 0.06}>
                <motion.div
                  className="relative glass-card p-6 overflow-hidden"
                  style={{ borderColor: `${color}20` }}
                  whileHover={{ borderColor: `${color}40` }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glow effect */}
                  <div
                    className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-20"
                    style={{ background: color }}
                  />

                  {/* Blur overlay on hover reveal */}
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: `${color}20`, border: `1px solid ${color}40`, color }}
                      >
                        {conf.anonymousName.charAt(0)}
                      </div>
                      <span className="text-sm font-medium" style={{ color }}>
                        {conf.anonymousName}
                      </span>
                      <span className="ml-auto text-white/30 text-xs">{timeAgo(conf.createdAt)}</span>
                    </div>

                    <div className={cn("relative transition-all duration-300", !isRevealed && "")}>
                      <p className="text-white/80 text-sm leading-relaxed">{conf.content}</p>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <button
                        onClick={() => handleLike(conf.id)}
                        className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors group"
                      >
                        <Flame size={14} className="group-hover:text-red-400" />
                        <span>{conf.likes}</span>
                      </button>
                      <span className="flex items-center gap-1 text-xs text-white/20">
                        <Lock size={10} /> Anonymous
                      </span>
                    </div>
                  </div>
                </motion.div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </div>
  );
}
