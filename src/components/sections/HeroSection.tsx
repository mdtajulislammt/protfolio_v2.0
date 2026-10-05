"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Clock, ArrowDown } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export function HeroSection() {
  const [timeString, setTimeString] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);
  const heroStageRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const titleRightRef = useRef<HTMLParagraphElement>(null);
  const nameTagRef = useRef<HTMLParagraphElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const scrollBtnRef = useRef<HTMLButtonElement>(null);

  const { scrollTo } = useSmoothScroll();

  // Live Dhaka Time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatted = new Intl.DateTimeFormat("en-US", options).format(now);
      setTimeString(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Smooth zero-lag mouse spotlight via CSS custom properties
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  // Master GSAP Entrance & Scroll Parallax Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Cinema Entrance Timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.05,
        onComplete: () => {
          // Clear inline styles on titles, badges, and names so they are ALWAYS 100% visible
          gsap.set(
            [
              titleLeftRef.current,
              titleRightRef.current,
              nameTagRef.current,
              noteRef.current,
            ],
            { clearProps: "opacity,transform" }
          );
          ScrollTrigger.refresh();
        },
      });

      // Background script name (gentle scale & fade)
      if (scriptRef.current) {
        tl.from(scriptRef.current, {
          opacity: 0,
          scale: 0.94,
          duration: 1.0,
        });
      }

      // Portrait Cutout (slides up into frame smoothly)
      if (portraitRef.current) {
        tl.from(
          portraitRef.current,
          {
            opacity: 0,
            y: 45,
            scale: 0.96,
            duration: 1.1,
          },
          "-=0.8"
        );
      }

      // Left Headline ("BACKEND ENGINEER")
      if (titleLeftRef.current) {
        tl.from(
          titleLeftRef.current,
          {
            opacity: 0,
            x: -35,
            duration: 0.9,
          },
          "-=0.75"
        );
      }

      // Subtitle below Left Title
      if (nameTagRef.current) {
        tl.from(
          nameTagRef.current,
          {
            opacity: 0,
            x: -25,
            duration: 0.8,
          },
          "-=0.7"
        );
      }

      // Right Specialty ("SYSTEM ARCHITECT")
      if (titleRightRef.current) {
        tl.from(
          titleRightRef.current,
          {
            opacity: 0,
            x: 35,
            duration: 0.9,
          },
          "-=0.75"
        );
      }

      // Floating Badges (Availability & Clock)
      if (noteRef.current) {
        tl.from(
          noteRef.current.children,
          {
            opacity: 0,
            y: -15,
            scale: 0.9,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        );
      }

      // Scroll Down Button pop-in
      if (scrollBtnRef.current) {
        tl.from(
          scrollBtnRef.current,
          {
            opacity: 0,
            scale: 0,
            duration: 0.7,
            ease: "back.out(2)",
          },
          "-=0.4"
        );
      }

      // 2. SCROLL PARALLAX SCRUB (Background script and portrait cutout move with depth)
      if (scriptRef.current) {
        gsap.to(scriptRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 110,
          ease: "none",
        });
      }

      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 45,
          ease: "none",
        });
      }

      // Scroll button fades on scroll
      if (scrollBtnRef.current) {
        gsap.to(scrollBtnRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "15% top",
            scrub: true,
          },
          opacity: 0,
          scale: 0.7,
          ease: "none",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    scrollTo("#experience");
  };

  return (
    <section id="hero" className="relative z-10">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="hero-background pt-[64px] sm:pt-[72px]"
      >
        {/* Subtle architectural dot grid pattern for backend engineer aesthetic */}
        <div className="absolute inset-0 bg-grid-dots opacity-40 pointer-events-none z-0" />

        {/* Ambient radial highlight centered behind the portrait */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.16)_0%,rgba(191,219,254,0.08)_50%,transparent_75%)] pointer-events-none -z-10" />

        {/* Liquid-smooth spotlight gradient tracking mouse */}
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out z-[1]"
          style={{
            background:
              "radial-gradient(650px circle at var(--mouse-x, 50%) var(--mouse-y, 45%), rgba(59, 130, 246, 0.22), rgba(191, 219, 254, 0.10) 42%, transparent 80%)",
          }}
          aria-hidden="true"
        />

        {/* Hero stage container */}
        <div ref={heroStageRef} className="hero hero-stage max-w-[1440px] mx-auto relative">
          {/* Top Status Bar (Neatly aligned at top of stage) */}
          <div ref={noteRef} className="hero-note">
            {/* Availability Badge */}
            <div className="availability-badge shadow-2xs">
              <span className="availability-dot" aria-hidden="true" />
              <span>Available for new opportunities</span>
            </div>

            {/* Live Clock Badge */}
            <div className="time-badge shadow-2xs" title="Live Local Time in Dhaka (Asia/Dhaka)">
              <Clock className="w-3.5 h-3.5 text-[#2563eb] animate-pulse" />
              <span className="text-[#2563eb] font-medium hidden sm:inline">Dhaka, BD</span>
              <span className="text-[#2563eb] hidden sm:inline">•</span>
              <span className="font-mono font-bold text-black tracking-tight">
                {timeString || "09:22:13 AM"}
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#bfdbfe] border border-[rgba(37,99,235,0.3)] text-black font-bold">
                GMT+6
              </span>
            </div>
          </div>

          {/* Cursive / Italic Serif Name behind portrait with GSAP parallax */}
          <div ref={scriptRef} className="hero-script font-playfair select-none" aria-hidden="true">
            <span>MD Tajul</span>
            <span>Islam</span>
          </div>

          {/* Person Portrait Cutout with GSAP parallax */}
          <div ref={portraitRef} className="hero-portrait">
            <Image
              src="/profile_extended.png"
              alt="MD Tajul Islam — Backend Developer & System Architect"
              fill
              priority
              sizes="(max-width: 700px) 92vw, (max-width: 1000px) 67vw, 760px"
              className="portrait-image object-contain object-bottom"
            />
          </div>

          {/* Headline Left: BACKEND ENGINEER */}
          <h1 ref={titleLeftRef} className="hero-title font-bebas">
            Backend
            <br />
            Engineer
            <span className="sr-only"> — MD Tajul Islam</span>
          </h1>

          {/* Subtitle Name below BACKEND ENGINEER */}
          <p ref={nameTagRef} className="hero-name font-inter">
            MD Tajul Islam
            <span>Backend Engineer &amp; System Architect</span>
          </p>

          {/* Specialty Right: SYSTEM ARCHITECT */}
          <p ref={titleRightRef} className="hero-specialty font-bebas">
            System
            <br />
            Architect
          </p>

          {/* Technical metric badge below SYSTEM ARCHITECT on desktop */}
          <div className="absolute bottom-[26px] right-[var(--gutter)] z-10 text-right hidden sm:block pointer-events-none">
            <span className="text-[11px] font-mono font-bold text-[#2563eb] tracking-wider uppercase">
              50+ Microservices &amp; APIs
            </span>
          </div>

          {/* Centered Scroll Down CTA Indicator */}
          <button
            ref={scrollBtnRef}
            onClick={scrollToNext}
            aria-label="Scroll down to experience section"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-black hover:text-[#2563eb] transition-all cursor-pointer group"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-black/50 group-hover:text-[#2563eb] transition-colors">
              SCROLL
            </span>
            <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-[rgba(37,99,235,0.3)] shadow-xs flex items-center justify-center group-hover:scale-110 group-hover:border-[#2563eb] transition-all">
              <ArrowDown className="w-3.5 h-3.5 text-[#2563eb] group-hover:translate-y-0.5 transition-transform animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
