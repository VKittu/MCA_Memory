// components/layout/Footer.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ExternalLink, GraduationCap, Instagram, Linkedin, Github } from "lucide-react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

const footerLinks = [
  { label: "Memory Feed", href: "/memories" },
  { label: "Gallery", href: "/gallery" },
  { label: "Timeline", href: "/timeline" },
  { label: "Confessions", href: "/confessions" },
  { label: "Guestbook", href: "/guestbook" },
  { label: "Time Capsule", href: "/capsule" },
  { label: "Videos", href: "/videos" },
  { label: "About Batch", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-navy-deep/50 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-gold">
                  <span className="font-display text-navy-deep font-bold">M</span>
                </div>
                <div>
                  <p className="font-display text-lg font-bold gold-text">MCA Batch 2026</p>
                  <p className="text-white/40 text-xs tracking-widest">SGSITS Indore</p>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                A digital memory world where every laugh, every tear, and every moment of our college journey lives forever.
              </p>
              <a
                href="https://www.sgsits.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-gold/70 hover:text-gold transition-colors duration-300 border border-gold/20 hover:border-gold/40 px-4 py-2 rounded-full"
              >
                <GraduationCap size={14} />
                Visit SGSITS Official Website
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Links */}
            <div>
              <p className="text-white/80 font-medium text-sm mb-4 tracking-wider uppercase">Explore</p>
              <div className="grid grid-cols-2 gap-2">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white/40 text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* College info */}
            <div className="space-y-4">
              <p className="text-white/80 font-medium text-sm tracking-wider uppercase">About SGSITS</p>
              <div className="space-y-2 text-white/40 text-sm">
                <p>Shri G.S. Institute of Technology & Science</p>
                <p>23, Park Road, Indore</p>
                <p>Madhya Pradesh – 452003</p>
                <a
                  href="https://www.sgsits.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold/70 hover:text-gold transition-colors"
                >
                  www.sgsits.ac.in
                </a>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/30 transition-all duration-300">
                  <Instagram size={14} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/30 transition-all duration-300">
                  <Linkedin size={14} />
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Marquee */}
        <div className="border-y border-white/5 py-4 mb-8 overflow-hidden">
          <div className="flex animate-marquee gap-12 w-max">
            {Array(8).fill("MCA Batch 2026 • SGSITS Indore • Forever Together • Memories That Last").map((t, i) => (
              <span key={i} className="text-white/20 text-xs tracking-widest uppercase whitespace-nowrap">
                {t} ✦
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © 2026 MCA Batch 2026, SGSITS Indore. All memories reserved.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1">
            Made with <Heart size={10} className="text-red-400 fill-current" /> by Vishal Dabi
          </p>
        </div>
      </div>
    </footer>
  );
}
