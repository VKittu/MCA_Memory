// components/layout/Navbar.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User, GraduationCap, ExternalLink } from "lucide-react";
import { useAuthContext } from "./AuthProvider";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/memories", label: "Memories" },
  { href: "/gallery", label: "Gallery" },
  { href: "/timeline", label: "Timeline" },
  { href: "/confessions", label: "Confessions" },
  { href: "/videos", label: "Videos" },
  { href: "/guestbook", label: "Guestbook" },
  { href: "/capsule", label: "Time Capsule" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const { user, logout } = useAuthContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-navy-deep/90 backdrop-blur-xl border-b border-white/5 py-3"
            : "py-5"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-gold group-hover:shadow-gold-strong transition-all duration-300">
              <span className="font-display text-navy-deep text-xs font-bold">M</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-display text-sm font-semibold leading-none gold-text">MCA 2026</p>
              <p className="text-white/40 text-[10px] tracking-widest uppercase leading-none mt-0.5">SGSITS Indore</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 7).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-xs font-medium tracking-wide rounded-lg transition-all duration-300",
                  pathname === link.href
                    ? "text-gold bg-gold/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* SGSITS link */}
            <a
              href="https://www.sgsits.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-xs text-white/40 hover:text-gold transition-colors duration-300"
            >
              <GraduationCap size={14} />
              <span>SGSITS</span>
              <ExternalLink size={10} />
            </a>

            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/upload" className="btn-gold text-xs px-5 py-2 hidden sm:block">
                  + Upload
                </Link>
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((open) => !open)}
                    className={cn(
                      "w-8 h-8 rounded-full overflow-hidden border transition-colors",
                      profileOpen ? "border-gold/60" : "border-gold/30 hover:border-gold/60"
                    )}
                  >
                    {user.photoURL ? (
                      <Image src={user.photoURL} alt={user.displayName || ""} width={32} height={32} className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gold/20 flex items-center justify-center">
                        <User size={14} className="text-gold" />
                      </div>
                    )}
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 glass-card p-2 shadow-xl">
                      <p className="text-white text-xs px-3 py-2 border-b border-white/10 mb-1 truncate">{user.displayName}</p>
                      {user.role === "admin" && (
                        <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-xs text-gold hover:bg-gold/10 rounded-lg transition-colors">
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        <LogOut size={12} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="btn-gold text-xs px-5 py-2">
                Sign In
              </Link>
            )}

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-white/60 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-backdrop lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 bg-navy-deep/95 backdrop-blur-xl z-50 p-6 border-l border-white/5 lg:hidden overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="gold-text font-display text-lg font-bold">MCA 2026</p>
                  <p className="text-white/40 text-xs">SGSITS Indore</p>
                </div>
                <button onClick={() => setMobileOpen(false)}>
                  <X size={20} className="text-white/60" />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm transition-all duration-300",
                      pathname === link.href
                        ? "bg-gold/10 text-gold"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-white/10 space-y-3">
                <a
                  href="https://www.sgsits.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-gold transition-colors"
                >
                  <GraduationCap size={16} />
                  Visit SGSITS Official Website
                  <ExternalLink size={12} />
                </a>
                {user ? (
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="w-full btn-ghost text-sm"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link href="/auth/login" className="block btn-gold text-center text-sm">
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
