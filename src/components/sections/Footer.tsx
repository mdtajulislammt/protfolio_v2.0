"use client";

import React from "react";
import { ArrowUp, Mail, Phone, ExternalLink } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { LiveClock } from "@/components/ui/LiveClock";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="pt-20 pb-14 border-t border-[rgba(37,99,235,0.3)] bg-[#bfdbfe]/90 text-black relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Quote & Brand Top Row */}
        <div className="pb-14 border-b border-[rgba(37,99,235,0.25)] flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-4 max-w-2xl">
            <p className="text-2xl sm:text-3xl md:text-4xl font-editorial italic text-black leading-snug">
              &ldquo;{PERSONAL_INFO.quote}&rdquo;
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-2xl font-bold font-mono tracking-tighter text-black">
                Tajul<span className="text-[#2563eb]">.</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-black font-space leading-relaxed">
              Architecting scalable backend ecosystems, low-latency microservices, and database systems engineered for resilience, clean code, and extreme performance.
            </p>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="btn-outline-warm flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-mono cursor-pointer shrink-0 group border border-[rgba(37,99,235,0.35)] bg-[#dbeafe] hover:bg-[#93c5fd] text-black"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 text-[#2563eb] group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Links & Navigation Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-xs font-mono">
          {/* Navigation */}
          <div className="space-y-3.5">
            <div className="text-black uppercase tracking-widest text-[11px] font-bold">
              Navigation
            </div>
            <ul className="space-y-2.5 text-black font-medium">
              <li>
                <button
                  onClick={() => scrollTo("hero")}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  01 Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("experience")}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  02 Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("gallery")}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  03 Visual Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("projects")}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  04 Selected Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("about")}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  05 About &amp; Expertise
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("contact")}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  06 Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3.5">
            <div className="text-black uppercase tracking-widest text-[11px] font-bold">
              Connect &amp; Profiles
            </div>
            <ul className="space-y-2.5 text-black font-medium">
              <li>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2563eb] transition-colors flex items-center gap-2"
                >
                  <Github className="w-3.5 h-3.5 text-[#2563eb]" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2563eb] transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#2563eb]" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-[#2563eb] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#2563eb]" />
                  <span>Email</span>
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2563eb] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#2563eb]" />
                  <span>WhatsApp Direct</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Local Time & Region */}
          <div className="space-y-3.5">
            <div className="text-black uppercase tracking-widest text-[11px] font-bold">
              Local Time &amp; Base
            </div>
            <div className="space-y-2.5">
              <div className="text-black font-bold">
                Dhaka, Bangladesh
              </div>
              <div className="text-[#2563eb]">
                <LiveClock showIcon={false} />
              </div>
              <p className="text-[11px] text-black leading-relaxed">
                UTC+6 • Available for global distributed team collaboration.
              </p>
            </div>
          </div>

          {/* Direct Engagement */}
          <div className="space-y-3.5">
            <div className="text-black uppercase tracking-widest text-[11px] font-bold">
              Engineering Status
            </div>
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dbeafe] text-black border border-[rgba(37,99,235,0.3)] text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open for Opportunities</span>
              </div>
              <p className="text-black text-[11px] leading-relaxed">
                Senior Backend Developer, Team Lead, and System Architect roles.
              </p>
              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-black hover:text-[#2563eb] font-bold underline underline-offset-4 transition-colors"
              >
                <span>Direct WhatsApp Chat</span>
                <ExternalLink className="w-3 h-3 text-[#2563eb]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-[rgba(37,99,235,0.25)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-black font-medium">
          <div>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-black font-semibold">
            <span>Crafted with Next.js, React, TypeScript &amp; Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

