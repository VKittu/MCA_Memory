// app/guestbook/page.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Send, Loader2, GraduationCap, User } from "lucide-react";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/animations/RevealOnScroll";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { addGuestbookEntry } from "@/lib/firestore";
import { demoGuestbook } from "@/lib/demoData";
import { timeAgo, cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function GuestbookPage() {
  const [entries, setEntries] = useState(demoGuestbook as any[]);
  const [form, setForm] = useState({ authorName: "", role: "student", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.authorName.trim() || !form.message.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    if (form.message.length < 20) {
      toast.error("Message must be at least 20 characters");
      return;
    }

    setSubmitting(true);
    try {
      await addGuestbookEntry(form);
      setEntries((prev) => [
        { id: `g_${Date.now()}`, ...form, createdAt: new Date() },
        ...prev,
      ]);
      setForm({ authorName: "", role: "student", message: "" });
      toast.success("Your message has been added! 💛");
    } catch {
      toast.error("Failed to add entry");
    } finally {
      setSubmitting(false);
    }
  };

  const roleColors = {
    teacher: "#C9A84C",
    student: "#8B5CF6",
    staff: "#10B981",
  };

  const roleIcons = {
    teacher: GraduationCap,
    student: User,
    staff: User,
  };

  return (
    <div className="min-h-screen relative pt-24">
      <ParticleBackground />

      {/* Header */}
      <div className="relative z-10 py-16 px-4 text-center">
        <RevealOnScroll>
          <p className="text-gold text-xs tracking-widest uppercase mb-4">Wishes & Blessings</p>
          <h1 className="section-title text-white mb-4">
            Guest <span className="gold-text">Book</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            A space for teachers, batchmates, and well-wishers to leave their heartfelt messages for MCA Batch 2026 of SGSITS Indore.
          </p>
        </RevealOnScroll>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 pb-20">
        {/* Write entry */}
        <RevealOnScroll delay={0.1}>
          <div className="glass-card p-6 mb-12">
            <h3 className="font-display text-xl text-white mb-6 flex items-center gap-2">
              <Quote size={18} className="text-gold" /> Leave Your Message
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs mb-2 uppercase tracking-wider">Your Name</label>
                  <input
                    value={form.authorName}
                    onChange={(e) => setForm((f) => ({ ...f, authorName: e.target.value }))}
                    placeholder="Enter your name..."
                    className="input-glass"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs mb-2 uppercase tracking-wider">I am a...</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                    className="input-glass"
                  >
                    <option value="student">👨‍🎓 Student</option>
                    <option value="teacher">👩‍🏫 Teacher / Faculty</option>
                    <option value="staff">🏫 Staff Member</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-2 uppercase tracking-wider">Your Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Write your heartfelt message, wish, or blessing for MCA Batch 2026..."
                  rows={5}
                  className="input-glass resize-none"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className={cn("btn-gold flex items-center gap-2", submitting && "opacity-50 cursor-not-allowed")}
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Add to Guestbook
              </button>
            </div>
          </div>
        </RevealOnScroll>

        {/* Entries */}
        <StaggerContainer className="space-y-6">
          {entries.map((entry, i) => {
            const color = roleColors[entry.role as keyof typeof roleColors] || "#C9A84C";
            const RoleIcon = roleIcons[entry.role as keyof typeof roleIcons] || User;

            return (
              <StaggerItem key={entry.id}>
                <motion.div
                  className="glass-card p-6 relative overflow-hidden"
                  style={{ borderLeft: `2px solid ${color}40` }}
                  whileHover={{ borderLeftColor: `${color}80` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10"
                    style={{ background: color, transform: "translate(30%, -30%)" }} />

                  <Quote size={32} className="absolute top-4 right-6 opacity-10" style={{ color }} />

                  <div className="flex items-start gap-4 mb-4">
                    {entry.photoUrl ? (
                      <Image
                        src={entry.photoUrl}
                        alt={entry.authorName}
                        width={48}
                        height={48}
                        className="rounded-full border-2 object-cover flex-shrink-0"
                        style={{ borderColor: `${color}40` }}
                      />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: `${color}20`, border: `1px solid ${color}40` }}
                      >
                        <RoleIcon size={20} style={{ color }} />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-white">{entry.authorName}</p>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: `${color}20`, border: `1px solid ${color}30`, color }}
                        >
                          {entry.role === "teacher" ? "Faculty" : entry.role === "staff" ? "Staff" : "Student"}
                        </span>
                        <span className="text-white/30 text-xs ml-auto">{timeAgo(entry.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm leading-relaxed italic">"{entry.message}"</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  );
}
