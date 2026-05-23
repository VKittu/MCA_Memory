// app/capsule/page.tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Clock, Send, Loader2, Calendar, Sparkles } from "lucide-react";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/animations/RevealOnScroll";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { useAuthContext } from "@/components/layout/AuthProvider";
import { addFutureMessage, getFutureMessages } from "@/lib/firestore";
import { isLocked, getTimeUntilUnlock, formatDate, cn } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";

const demoMessages = [
  {
    id: "dm1",
    userId: "1",
    userName: "Aarav Sharma",
    message: "Dear future me, I hope you're a senior developer at a great company by now. Remember how nervous you were before every viva? Remember the all-nighters? I hope you still remember SGSITS Indore — the place that shaped you. Are you still in touch with the batch? Miss you all already.",
    unlockDate: new Date("2031-04-15"),
    locked: true,
    createdAt: new Date("2026-04-10"),
  },
  {
    id: "dm2",
    userId: "2",
    userName: "Priya Verma",
    message: "To MCA Batch 2026, five years from now — I hope you're all thriving. I hope our group chat is still alive. I hope Rohit is still making everyone laugh. I hope we've all achieved what we dreamed of sitting in that canteen. This batch was special. Don't ever forget it.",
    unlockDate: new Date("2031-04-15"),
    locked: true,
    createdAt: new Date("2026-04-11"),
  },
  {
    id: "dm3",
    userId: "3",
    userName: "Batch 2026 Collective",
    message: "This is a message from all of us to all of us. Remember the trips, the exams, the chaos, and the love. Remember SGSITS Indore. Remember that we were once young, scared, and brilliant together. Wherever you are in 2031 — we love you. Batch 2026 forever.",
    unlockDate: new Date("2026-12-31"),
    locked: false,
    createdAt: new Date("2026-04-12"),
  },
];

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-2 justify-center">
      {[
        { v: timeLeft.days, l: "days" },
        { v: timeLeft.hours, l: "hrs" },
        { v: timeLeft.minutes, l: "min" },
        { v: timeLeft.seconds, l: "sec" },
      ].map(({ v, l }) => (
        <div key={l} className="flex flex-col items-center">
          <div className="w-12 h-12 glass-card flex items-center justify-center text-gold font-display text-lg font-bold">
            {String(v).padStart(2, "0")}
          </div>
          <span className="text-white/30 text-[10px] mt-1 uppercase">{l}</span>
        </div>
      ))}
    </div>
  );
}

export default function CapsulePage() {
  const { user } = useAuthContext();
  const [messages, setMessages] = useState(demoMessages as any[]);
  const [form, setForm] = useState({ message: "", unlockYear: "2031" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const years = ["2027", "2028", "2029", "2030", "2031", "2036", "2046"];

  const handleSubmit = async () => {
    if (!user) { toast.error("Sign in to write a capsule message"); return; }
    if (!form.message.trim() || form.message.length < 30) {
      toast.error("Write at least 30 characters");
      return;
    }
    setSubmitting(true);
    try {
      const unlockDate = new Date(`${form.unlockYear}-04-15`);
      await addFutureMessage({
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        message: form.message.trim(),
        unlockDate,
      });
      setMessages((prev) => [
        {
          id: `new_${Date.now()}`,
          userId: user.uid,
          userName: user.displayName,
          message: form.message.trim(),
          unlockDate,
          locked: isLocked(unlockDate),
          createdAt: new Date(),
        },
        ...prev,
      ]);
      setForm({ message: "", unlockYear: "2031" });
      setSubmitted(true);
      toast.success("Time capsule sealed! 🔮");
    } catch {
      toast.error("Failed to seal capsule");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative pt-24">
      <ParticleBackground />

      {/* Header */}
      <div className="relative z-10 py-16 px-4 text-center">
        <RevealOnScroll>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 mb-6">
            <Sparkles size={12} className="text-gold" />
            <span className="text-gold text-xs tracking-widest uppercase">Letters to the Future</span>
          </div>
          <h1 className="section-title text-white mb-4">
            Future Message <span className="gold-text">Capsule</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            Write a message to your future self, or to the batch. Seal it in time. It will unlock exactly when you set it — and not a moment before.
          </p>
        </RevealOnScroll>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-20">
        {/* Write capsule */}
        <RevealOnScroll delay={0.1}>
          {!user ? (
            <div className="glass-card p-8 text-center mb-10">
              <Lock size={40} className="text-gold mx-auto mb-4" />
              <p className="text-white/60 mb-4">Sign in to write your time capsule message</p>
              <Link href="/auth/login" className="btn-gold">Sign In</Link>
            </div>
          ) : submitted ? (
            <motion.div
              className="glass-card p-8 text-center mb-10 border border-gold/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 15 }}
                className="text-5xl mb-4"
              >
                🔮
              </motion.div>
              <h3 className="font-display text-2xl gold-text mb-2">Capsule Sealed!</h3>
              <p className="text-white/50 text-sm mb-6">
                Your message is locked safely in time. It will unlock on the date you set.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn-ghost text-sm">
                Write Another
              </button>
            </motion.div>
          ) : (
            <div className="glass-card p-6 mb-10">
              <div className="flex items-center gap-2 mb-6">
                <Clock size={18} className="text-gold" />
                <h3 className="font-display text-xl text-white">Seal Your Message in Time</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/50 text-xs mb-2 uppercase tracking-wider">
                    Your Message (to future self or batch)
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Dear future me / Dear Batch 2026... Write what's in your heart. This message will be locked until the date you choose."
                    rows={6}
                    className="input-glass resize-none"
                  />
                  <p className="text-white/30 text-xs mt-1">{form.message.length} characters</p>
                </div>

                <div>
                  <label className="block text-white/50 text-xs mb-2 uppercase tracking-wider">
                    <Calendar size={12} className="inline mr-1" /> Unlock Year
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {years.map((y) => (
                      <button
                        key={y}
                        onClick={() => setForm((f) => ({ ...f, unlockYear: y }))}
                        className={cn(
                          "px-4 py-2 rounded-xl text-sm transition-all duration-300",
                          form.unlockYear === y
                            ? "bg-gold text-navy-deep font-medium"
                            : "glass-card text-white/60 hover:text-white"
                        )}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                  <p className="text-white/30 text-xs mt-2">
                    Message will unlock on: April 15, {form.unlockYear}
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting || form.message.length < 30}
                  className={cn(
                    "btn-gold w-full flex items-center justify-center gap-2",
                    (submitting || form.message.length < 30) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
                  Seal the Capsule
                </button>
              </div>
            </div>
          )}
        </RevealOnScroll>

        {/* Capsule messages */}
        <StaggerContainer className="space-y-6">
          {messages.map((msg, i) => {
            const locked = isLocked(msg.unlockDate);
            return (
              <StaggerItem key={msg.id}>
                <motion.div
                  className={cn(
                    "glass-card p-6 relative overflow-hidden",
                    locked ? "border-purple-glow/20" : "border-gold/30"
                  )}
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Animated glow bg */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-15"
                    style={{ background: locked ? "#8B5CF6" : "#C9A84C" }}
                  />

                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center",
                      locked ? "bg-purple-glow/20 border border-purple-glow/30" : "bg-gold/20 border border-gold/30"
                    )}>
                      {locked ? (
                        <Lock size={16} className="text-purple-glow" />
                      ) : (
                        <Unlock size={16} className="text-gold" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{msg.userName}</p>
                      <p className="text-white/30 text-xs">
                        {locked ? `Unlocks: ${formatDate(msg.unlockDate)}` : `Unlocked on ${formatDate(msg.unlockDate)}`}
                      </p>
                    </div>
                    <div className={cn(
                      "ml-auto px-3 py-1 rounded-full text-xs",
                      locked
                        ? "bg-purple-glow/10 border border-purple-glow/20 text-purple-glow"
                        : "bg-gold/10 border border-gold/20 text-gold"
                    )}>
                      {locked ? "🔒 Sealed" : "🔓 Open"}
                    </div>
                  </div>

                  {locked ? (
                    <div className="space-y-3">
                      {/* Blurred placeholder */}
                      <div className="relative">
                        <div className="text-white/20 text-sm blur-sm select-none">
                          This message is sealed in time and waiting to be opened. The words inside are precious and private — locked until the moment arrives...
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                          <Lock size={24} className="text-purple-glow/60" />
                          <p className="text-purple-glow/80 text-sm font-medium">Message Sealed</p>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-white/5">
                        <p className="text-white/40 text-xs text-center mb-3">Time remaining</p>
                        <CountdownTimer targetDate={msg.unlockDate} />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-white/80 text-sm leading-relaxed italic">"{msg.message}"</p>
                      <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                        <Unlock size={12} className="text-gold" />
                        <p className="text-gold/60 text-xs">This capsule has been unlocked</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  );
}
