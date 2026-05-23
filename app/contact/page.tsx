// app/contact/page.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, ExternalLink, Send, Loader2, GraduationCap, Globe, Phone } from "lucide-react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500)); // Simulated send
    setSent(true);
    setSending(false);
    toast.success("Message sent! We'll get back to you. 💛");
  };

  return (
    <div className="min-h-screen relative pt-24">
      <ParticleBackground />

      <div className="relative z-10 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll className="text-center mb-16">
            <p className="text-gold text-xs tracking-widest uppercase mb-4">Get in Touch</p>
            <h1 className="section-title text-white mb-4">
              Contact <span className="gold-text">Us</span>
            </h1>
            <p className="text-white/50 max-w-xl mx-auto">
              For memories, questions, or just to say hello — we're here. This is our space, our batch, our home.
            </p>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Info */}
            <RevealOnScroll direction="left">
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="font-display text-xl text-white mb-6 flex items-center gap-2">
                    <GraduationCap size={20} className="text-gold" /> SGSITS Indore
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin size={18} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm font-medium">Address</p>
                        <p className="text-white/50 text-sm">23, Park Road, Indore</p>
                        <p className="text-white/50 text-sm">Madhya Pradesh – 452003</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-glow/10 border border-purple-glow/20 flex items-center justify-center flex-shrink-0">
                        <Globe size={18} className="text-purple-glow" />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm font-medium">Official Website</p>
                        <a
                          href="https://www.sgsits.ac.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold/70 hover:text-gold text-sm flex items-center gap-1 transition-colors"
                        >
                          www.sgsits.ac.in <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                        <Mail size={18} className="text-green-400" />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm font-medium">Batch Email</p>
                        <p className="text-white/50 text-sm">mca.batch2026@sgsits.ac.in</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 border border-gold/20">
                  <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent rounded-2xl" />
                  <h3 className="font-display text-lg text-white mb-3">About This Website</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    This digital memory world was created with love by <strong className="text-gold/80">MCA Batch 2026</strong> of SGSITS Indore. It is our tribute to four incredible years, unforgettable friendships, and the institution that shaped us.
                  </p>
                  <a
                    href="https://www.sgsits.ac.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-sm text-gold hover:text-gold-light transition-colors"
                  >
                    <ExternalLink size={14} /> Visit SGSITS Official Site
                  </a>
                </div>
              </div>
            </RevealOnScroll>

            {/* Form */}
            <RevealOnScroll direction="right" delay={0.1}>
              {sent ? (
                <motion.div
                  className="glass-card p-8 text-center border border-gold/30 h-full flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="text-5xl mb-4"
                  >
                    💛
                  </motion.div>
                  <h3 className="font-display text-2xl gold-text mb-2">Message Sent!</h3>
                  <p className="text-white/50 text-sm mb-6">We'll get back to you soon. Thank you for reaching out to MCA Batch 2026.</p>
                  <button onClick={() => setSent(false)} className="btn-ghost text-sm">Send Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
                  <h3 className="font-display text-xl text-white mb-2">Send a Message</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/50 text-xs mb-2 uppercase tracking-wider">Name *</label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        className="input-glass"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs mb-2 uppercase tracking-wider">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="input-glass"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs mb-2 uppercase tracking-wider">Subject</label>
                    <input
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      placeholder="What's this about?"
                      className="input-glass"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs mb-2 uppercase tracking-wider">Message *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Write your message..."
                      rows={5}
                      className="input-glass resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className={cn("btn-gold w-full flex items-center justify-center gap-2 py-3", sending && "opacity-70")}
                  >
                    {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
