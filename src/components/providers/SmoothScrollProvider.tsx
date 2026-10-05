"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
  scrollProgress: number;
  activeNode: string;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
  scrollProgress: 0,
  activeNode: "HERO",
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeNode, setActiveNode] = useState("01/HERO");
  const progressLineRef = useRef<HTMLDivElement>(null);
  const progressHeadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis with optimal smooth scroll parameters
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: false,
    });

    setLenisInstance(lenis);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", (e) => {
      ScrollTrigger.update();

      const progress = e.progress;
      setScrollProgress(Math.round(progress * 100));

      if (progressLineRef.current) {
        progressLineRef.current.style.transform = `scaleX(${progress})`;
      }
      if (progressHeadRef.current) {
        progressHeadRef.current.style.left = `${progress * 100}%`;
      }

      // Determine active architecture node
      const sections = [
        { id: "hero", label: "01/GATEWAY" },
        { id: "experience", label: "02/SERVICES" },
        { id: "architecture", label: "03/TOPOLOGY" },
        { id: "projects", label: "04/SYSTEMS" },
        { id: "about", label: "05/STACK" },
        { id: "contact", label: "06/ENDPOINT" },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveNode(sections[i].label);
            break;
          }
        }
      }
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger calculations after initial DOM & images settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  const scrollTo = (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, {
        offset: options?.offset ?? -70,
        duration: options?.duration ?? 1.0,
      });
    } else {
      if (typeof target === "string") {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisInstance,
        scrollTo,
        scrollProgress,
        activeNode,
      }}
    >
      {/* Top Fixed Backend Data Pipeline Stream (Scroll Progress HUD) */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] pointer-events-none select-none"
        aria-hidden="true"
      >
        {/* Background track */}
        <div className="w-full h-[3px] bg-[#2563eb]/15 backdrop-blur-xs relative overflow-hidden">
          {/* Animated data stream bar */}
          <div
            ref={progressLineRef}
            className="h-full w-full bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#60a5fa] origin-left shadow-[0_0_12px_rgba(37,99,235,0.8)] will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Floating Glowing Packet Head */}
        <div
          ref={progressHeadRef}
          className="absolute top-[1.5px] -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_3px_rgba(37,99,235,0.9)] flex items-center justify-center pointer-events-none will-change-[left]"
          style={{ left: "0%" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
        </div>

        {/* Telemetry Capsule in top corner (Visible during scroll) */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex justify-end pt-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-[#dbeafe]/90 backdrop-blur-md border border-[rgba(37,99,235,0.35)] shadow-xs text-[10px] font-mono text-[#0f172a] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#2563eb] tracking-tight">{activeNode}</span>
            <span className="text-black/40">|</span>
            <span className="tabular-nums font-semibold">{scrollProgress}%</span>
          </div>
        </div>
      </div>

      {children}
    </SmoothScrollContext.Provider>
  );
}
