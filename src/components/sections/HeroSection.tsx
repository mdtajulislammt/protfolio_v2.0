"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Clock, ArrowDown } from "lucide-react";

export function HeroSection() {
  const [timeString, setTimeString] = useState<string>("");
  const [mousePos, setMousePos] = useState({ x: 700, y: 350 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scrollToNext = () => {
    const nextEl = document.getElementById("experience") || document.getElementById("about");
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative z-10">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="hero-background pt-[64px] sm:pt-[72px]"
      >
        {/* Subtle radial spotlight gradient behind portrait */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out z-[1]"
          style={{
            opacity: isHovering ? 1 : 0.85,
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.22), rgba(191, 219, 254, 0.10) 42%, transparent 80%)`,
          }}
          aria-hidden="true"
        />

        {/* Hero stage container */}
        <div className="hero hero-stage max-w-[1440px] mx-auto relative">
          {/* Cursive / Italic Serif Name behind portrait */}
          <div className="hero-script font-playfair" aria-hidden="true">
            <span>Tajul</span>
            <span>Islam</span>
          </div>

          {/* Person Portrait Cutout */}
          <div className="hero-portrait">
            <Image
              src="/profile_extended.png"
              alt="MD Tajul Islam — Backend Developer & System Architect"
              fill
              priority
              sizes="(max-width: 700px) 92vw, (max-width: 1000px) 67vw, 760px"
              className="portrait-image object-contain object-bottom"
            />
          </div>

          {/* Floating Badges */}
          <div className="hero-note">
            {/* Availability Badge */}
            <div className="availability-badge">
              <span className="availability-dot" aria-hidden="true" />
              <span>Available for new opportunities</span>
            </div>

            {/* Live Clock Badge */}
            <div className="time-badge" title="Live Local Time in Dhaka (Asia/Dhaka)">
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

          {/* Headline Left: BACKEND ARCHITECT */}
          <h1 className="hero-title font-bebas">
            Backend
            <br />
            Engineer
            <span className="sr-only"> — MD Tajul Islam</span>
          </h1>

          {/* Subtitle Name below BACKEND ARCHITECT */}
          <p className="hero-name font-inter">
            MD Tajul Islam
            <span>Backend Engineer</span>
          </p>

          {/* Specialty Right: BACKEND SYSTEM ARCHITECT */}
          <p className="hero-specialty font-bebas">
            System
            <br />
            Architect
          </p>

          {/* Floating Circular Down Arrow Button */}
          <button
            onClick={scrollToNext}
            aria-label="Scroll down to next section"
            className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-20 w-11 h-11 rounded-full bg-[#dbeafe] hover:bg-[#bfdbfe] text-black shadow-[0_4px_20px_rgba(37,99,235,0.25)] border border-[rgba(37,99,235,0.35)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer group hover:border-[#2563eb]"
          >
            <ArrowDown className="w-4 h-4 text-[#2563eb] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
