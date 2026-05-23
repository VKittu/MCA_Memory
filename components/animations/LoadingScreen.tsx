// components/animations/LoadingScreen.tsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 500);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated blobs */}
          <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 bg-gold -top-20 -left-20" />
          <div className="absolute w-80 h-80 rounded-full blur-3xl opacity-15 bg-purple-glow bottom-10 right-10" />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-full border-2 border-gold/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                  <span className="font-display text-navy-deep text-lg font-bold">M</span>
                </div>
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border border-gold/20"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Title */}
            <div className="text-center space-y-2">
              <motion.p
                className="font-display text-3xl font-bold gold-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                MCA Batch 2026
              </motion.p>
              <motion.p
                className="text-white/50 text-sm tracking-[0.3em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                SGSITS Indore
              </motion.p>
            </div>

            {/* Progress bar */}
            <motion.div
              className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-full bg-gradient-gold rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            <motion.p
              className="text-white/30 text-xs tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Reliving memories…
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
