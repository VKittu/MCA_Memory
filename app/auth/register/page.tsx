// app/auth/register/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, Loader2, GraduationCap } from "lucide-react";
import { useAuthContext } from "@/components/layout/AuthProvider";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const { registerWithEmail, signInWithGoogle } = useAuthContext();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Account created! Welcome to the batch! 🎓");
      router.push("/");
    } catch (e: any) {
      toast.error(e.message || "Google sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error("Fill all fields"); return; }
    if (form.password !== form.confirm) { toast.error("Passwords do not match"); return; }
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }

    setLoading(true);
    try {
      await registerWithEmail(form.email, form.password, form.name);
      toast.success("Welcome to the batch! 🎓");
      router.push("/");
    } catch (e: any) {
      const msg = e.code === "auth/email-already-in-use" ? "Email already registered" : "Registration failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4 py-10">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-radial from-purple-glow/5 via-transparent to-transparent" />

      <motion.div
        className="relative z-10 glass-card p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mx-auto mb-4 shadow-gold">
            <GraduationCap size={28} className="text-navy-deep" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Join the Batch</h1>
          <p className="text-white/40 text-sm mt-1">MCA Batch 2026 · SGSITS Indore</p>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white text-gray-800 font-medium text-sm hover:bg-gray-100 transition-colors mb-6 disabled:opacity-70"
        >
          {googleLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
          )}
          Sign up with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-navy-mid px-3 text-white/30 text-xs">or create with email</span>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-white/50 text-xs mb-2 uppercase tracking-wider">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Your full name"
                className="input-glass pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-white/50 text-xs mb-2 uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="your@email.com"
                className="input-glass pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-white/50 text-xs mb-2 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="Min. 6 characters"
                className="input-glass pl-10 pr-10"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-white/50 text-xs mb-2 uppercase tracking-wider">Confirm Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="password"
                value={form.confirm}
                onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
                placeholder="Repeat password"
                className="input-glass pl-10"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={cn("btn-gold w-full flex items-center justify-center gap-2 py-3", loading && "opacity-70 cursor-not-allowed")}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            Create Account
          </button>
        </form>

        <p className="text-center text-white/40 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-gold hover:text-gold-light transition-colors">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
