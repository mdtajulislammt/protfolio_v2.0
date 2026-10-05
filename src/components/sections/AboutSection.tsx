"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  PERSONAL_INFO,
  ENGINEERING_MINDSET,
} from "@/data/portfolioData";
import {
  User,
  MapPin,
  Mail,
  Languages,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Award,
  Sparkles,
  Download,
  ShieldCheck,
  Server,
  Database,
  Radio,
  Terminal,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  const scrollToContact = () => {
    scrollTo("#contact");
  };

  // Header Animation on Mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          y: 35,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 sm:py-32 relative z-10 bg-[#e0edfe] border-y border-[rgba(37,99,235,0.2)] overflow-hidden"
    >
      {/* Background Animated Gradient Ambience */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none animate-float-orb" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none animate-float-orb [animation-delay:3s]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12 sm:mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[rgba(37,99,235,0.2)]">
            <div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-bebas tracking-tight text-black leading-[0.92]">
                ABOUT ME.
              </h2>
            </div>

            {/* Quick Experience Badge */}
            <div className="flex items-center gap-3 p-2 bg-[#dbeafe] rounded-2xl border border-[rgba(37,99,235,0.3)] shadow-xs shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#2563eb] text-white flex items-center justify-center font-bebas text-xl">
                03+
              </div>
              <div className="pr-3 text-left">
                <div className="text-xs font-bold font-mono text-black">Years Experience</div>
                <div className="text-[10px] font-mono text-[#2563eb] font-semibold">Backend Engineer</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Showcase: Bio & Autographed Portrait Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Concise Pitch, Philosophy Card & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-2xl sm:text-2xl text-black font-space leading-relaxed font-medium">
                {PERSONAL_INFO.name}
              </h3>
            </div>

            {/* Concise Bio (Punchy, Clean, No Text Overload) */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base text-gray-700 font-space leading-relaxed font-medium">
                Backend Engineer &amp; System Architect with deep expertise in designing scalable architectures, high-concurrency microservices, and robust database systems.Leading backend engineering at Backbencher Studio, crafting resilient RESTful APIs, distributed event pipelines, and multi-tenant platforms built on Clean Code and SOLID principles.
              </p>
            </div>

            {/* Architectural Philosophy & Standards Card */}
            <div className="warm-card p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#eff6ff] via-[#dbeafe] to-[#bfdbfe]/80 border border-[rgba(37,99,235,0.3)] shadow-md relative overflow-hidden group transition-all duration-300 hover:shadow-xl hover:border-[#2563eb]">
              <p className="text-sm sm:text-base font-space italic text-black/90 leading-relaxed">
                &ldquo;Every system I engineer is built for extreme throughput, maintainability, and transactional integrity under concurrent load.&rdquo;
              </p>
            </div>

            {/* Core Architectural Domains & Technical Competencies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#eff6ff] border border-[rgba(37,99,235,0.25)] hover:border-[#2563eb] transition-all shadow-xs group">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div>
                    <span className="text-[10px] font-mono text-[#2563eb] uppercase tracking-wider font-bold block">
                      Core Compute &amp; APIs
                    </span>
                    <h4 className="text-sm font-bold text-black font-space">
                      NestJS • Go (Golang) • Node.js
                    </h4>
                  </div>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#eff6ff] border border-[rgba(37,99,235,0.25)] hover:border-[#2563eb] transition-all shadow-xs group">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-wider font-bold block">
                      Persistence &amp; Caching
                    </span>
                    <h4 className="text-sm font-bold text-black font-space">
                      PostgreSQL • Redis • pgvector
                    </h4>
                  </div>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#eff6ff] border border-[rgba(37,99,235,0.25)] hover:border-[#2563eb] transition-all shadow-xs group">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div>
                    <span className="text-[10px] font-mono text-purple-600 uppercase tracking-wider font-bold block">
                      Real-Time &amp; Streaming
                    </span>
                    <h4 className="text-sm font-bold text-black font-space">
                      WebRTC • LiveKit • Socket.IO
                    </h4>
                  </div>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#eff6ff] border border-[rgba(37,99,235,0.25)] hover:border-[#2563eb] transition-all shadow-xs group">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div>
                    <span className="text-[10px] font-mono text-amber-600 uppercase tracking-wider font-bold block">
                      DevOps &amp; Infrastructure
                    </span>
                    <h4 className="text-sm font-bold text-black font-space">
                      Docker • Linux (Arch/Ubuntu) • Nginx
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Meta Facts
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-[rgba(37,99,235,0.2)] text-xs font-mono text-[#2563eb]">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#dbeafe] border border-[rgba(37,99,235,0.3)]">
                <MapPin className="w-4 h-4 text-[#2563eb] shrink-0" />
                <span className="text-black font-semibold">{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#dbeafe] border border-[rgba(37,99,235,0.3)]">
                <Mail className="w-4 h-4 text-[#2563eb] shrink-0" />
                <span className="truncate text-black font-semibold">{PERSONAL_INFO.email}</span>
              </div>
              <div className="sm:col-span-2 flex items-center gap-2 p-3 rounded-xl bg-[#dbeafe] border border-[rgba(37,99,235,0.3)]">
                <Languages className="w-4 h-4 text-[#2563eb] shrink-0" />
                <span className="text-black font-semibold">
                  English &amp; Bengali — Fluent Technical &amp; Professional Communication
                </span>
              </div>
            </div> */}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark px-5 py-2.5 text-xs font-mono tracking-wide inline-flex items-center gap-1.5 cursor-pointer shadow-xs hover:shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Direct</span>
              </a>
              <button
                onClick={scrollToContact}
                className="btn-outline-warm px-5 py-2.5 text-xs font-mono cursor-pointer inline-flex items-center gap-1.5 bg-[#dbeafe] hover:bg-[#bfdbfe] text-black border border-[rgba(37,99,235,0.35)] shadow-xs"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href="/Sheikh_minhajul_abedin_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-warm px-4 py-2.5 text-xs font-mono inline-flex items-center gap-1.5 bg-[#dbeafe] hover:bg-[#bfdbfe] text-black border border-[rgba(37,99,235,0.35)] shadow-xs"
                title="Download Resume PDF"
              >
                <Download className="w-3.5 h-3.5 text-[#2563eb]" />
                <span>Resume</span>
              </a>
            </div>
          </div>

          {/* Right Column: Autographed Executive Portrait Frame (Signature inside frame at bottom) */}
          <div className="lg:col-span-5 flex justify-center">
            <PortraitCardWithSignature />
          </div>
        </div>

        {/* Bottom Section: Core Architectural Pillars */}
        <div className="mt-16 pt-12 border-t border-[rgba(37,99,235,0.2)]">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold font-mono text-black tracking-tight mt-1">
                ENGINEERING PILLARS
              </h3>
            </div>
            <span className="text-xs font-mono text-black/70 font-semibold">
              Standards governing every distributed system I architect
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENGINEERING_MINDSET.map((principle, idx) => (
              <div
                key={principle.id}
                className="warm-card p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#eff6ff] via-[#dbeafe] to-[#bfdbfe]/80 border border-[rgba(37,99,235,0.25)] flex flex-col justify-between hover:border-[#2563eb] transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bebas text-2xl text-[#2563eb] leading-none">
                      0{idx + 1}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#2563eb]" />
                  </div>
                  <h4 className="text-base font-bold text-black tracking-tight font-space">
                    {principle.title}
                  </h4>
                  <p className="text-xs text-black/80 font-space mt-2 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Executive Portrait Frame with Handwritten Signature at the Bottom
// -------------------------------------------------------------
function PortraitCardWithSignature() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateY(-5px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: isHovered
          ? "transform 0.08s ease-out, box-shadow 0.3s ease"
          : "transform 0.4s ease-out, box-shadow 0.4s ease",
      }}
      className="warm-card p-4 max-w-sm sm:max-w-md w-full bg-[#dbeafe] shadow-2xl border border-[rgba(37,99,235,0.3)] rounded-3xl relative group overflow-hidden"
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37,99,235,0.15), transparent 75%)`,
        }}
      />

      {/* Portrait Photo Container */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-[#bfdbfe] border border-[rgba(37,99,235,0.25)]">
        <Image
          src="/profile_extended.png"
          alt={PERSONAL_INFO.name}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          priority
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
        />
        {/* Soft bottom vignette gradient for smooth text & signature blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/85 via-[#0f172a]/20 to-transparent pointer-events-none" />

        {/* BOTTOM SIGNED PLAQUE INSIDE THE FRAME */}
        <div className="absolute bottom-3 inset-x-3 p-3.5 sm:p-4 rounded-2xl bg-[#eff6ff]/95 backdrop-blur-md border border-[rgba(37,99,235,0.3)] shadow-2xl z-20 space-y-2">
          {/* THE SIGNATURE IMAGE INSIDE THE FRAME */}
          <div className="flex justify-center items-center py-1">
            <Image
              src="/signature.png"
              alt="MD Tajul Islam Signature"
              width={320}
              height={112}
              priority
              className="w-56 sm:w-64 h-auto object-contain filter contrast-125 select-none drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
