// components/animations/CustomCursor.tsx
"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const isHovering = useRef(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleEnter = () => {
      isHovering.current = true;
      if (dotRef.current) dotRef.current.style.transform = "scale(0)";
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%, -50%) scale(2)";
        ringRef.current.style.borderColor = "rgba(201,168,76,0.8)";
        ringRef.current.style.backgroundColor = "rgba(201,168,76,0.05)";
      }
    };

    const handleLeave = () => {
      isHovering.current = false;
      if (dotRef.current) dotRef.current.style.transform = "scale(1)";
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        ringRef.current.style.borderColor = "rgba(201,168,76,0.4)";
        ringRef.current.style.backgroundColor = "transparent";
      }
    };

    window.addEventListener("mousemove", moveCursor);

    const interactables = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, label, .cursor-pointer"
    );
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    const observer = new MutationObserver(() => {
      const newInteractables = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, label, .cursor-pointer"
      );
      newInteractables.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          transition: "transform 0.1s ease",
        }}
      />
      {/* Ring */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold/40 pointer-events-none z-[9998]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          transition: "transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease",
        }}
      />
    </>
  );
}
