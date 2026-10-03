"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  PERSONAL_INFO,
  SKILL_CATEGORIES,
  ENGINEERING_MINDSET,
} from "@/data/portfolioData";
import {
  User,
  Cpu,
  ShieldCheck,
  MapPin,
  Mail,
  Languages,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Award,
  Layers,
  Zap,
} from "lucide-react";

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<"about" | "skills" | "mindset">("about");

  const tabs = [
    { id: "about", label: "About Me", icon: User },
    { id: "skills", label: "Technical Skills", icon: Cpu },
    { id: "mindset", label: "Engineering Mindset", icon: ShieldCheck },
  ] as const;

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="py-24 sm:py-32 relative z-10 bg-[#e0edfe] border-y border-[rgba(37,99,235,0.2)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-14">
          <p className="text-xs font-mono uppercase tracking-widest text-[#2563eb] mb-2 font-semibold">
            03 / Background &amp; Expertise
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bebas tracking-tight text-black leading-[0.92]">
            BEHIND THE WORK.
          </h2>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[rgba(37,99,235,0.2)]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#2563eb] text-white font-medium shadow-xs"
                    : "bg-[#dbeafe] text-black font-semibold border border-[rgba(37,99,235,0.3)] hover:bg-[#bfdbfe] hover:border-[#2563eb]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {/* TAB 1: ABOUT ME */}
          {activeTab === "about" && (
            <div
              key="about"
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Left Column: Bio Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-mono text-[#2563eb] uppercase tracking-widest font-semibold">
                    {PERSONAL_INFO.title}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-editorial italic font-medium text-black tracking-tight mt-1">
                    {PERSONAL_INFO.name}
                  </h3>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-black font-space leading-relaxed">
                  {PERSONAL_INFO.bio.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {PERSONAL_INFO.stats.map((st, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-2xl bg-[#dbeafe] border border-[rgba(37,99,235,0.3)] text-center shadow-xs"
                    >
                      <div className="font-bebas text-2xl text-black leading-none">
                        {st.value}
                      </div>
                      <div className="text-[11px] font-mono text-black mt-1 font-bold">
                        {st.label}
                      </div>
                      <div className="text-[10px] font-mono text-black">
                        {st.highlight}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Meta Facts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[rgba(37,99,235,0.2)] text-xs font-mono text-[#2563eb]">
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
                    <span className="text-black font-semibold">English &amp; Bengali — Fluent Technical &amp; Professional Communication</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={PERSONAL_INFO.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-dark px-5 py-2.5 text-xs font-mono tracking-wide inline-flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Direct</span>
                  </a>
                  <button
                    onClick={scrollToContact}
                    className="btn-outline-warm px-5 py-2.5 text-xs font-mono cursor-pointer inline-flex items-center gap-1.5 bg-[#dbeafe] hover:bg-[#bfdbfe] text-black border border-[rgba(37,99,235,0.35)]"
                  >
                    <span>Get in Touch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Portrait Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="warm-card p-4 max-w-sm w-full bg-[#dbeafe] shadow-xl border border-[rgba(37,99,235,0.3)]">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#bfdbfe] border border-[rgba(37,99,235,0.25)]">
                    <Image
                      src="/profile_extended.png"
                      alt={PERSONAL_INFO.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-xl bg-[#dbeafe]/95 backdrop-blur-md border border-[rgba(37,99,235,0.3)] shadow-md">
                      <div className="text-sm font-bold text-black">
                        {PERSONAL_INFO.name}
                      </div>
                      <div className="text-xs font-mono text-black font-bold mt-0.5">
                        {PERSONAL_INFO.title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL SKILLS */}
          {activeTab === "skills" && (
            <div
              key="skills"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {SKILL_CATEGORIES.map((category, idx) => (
                <div
                  key={idx}
                  className="warm-card p-6 sm:p-7 bg-gradient-to-br from-[#eff6ff] via-[#dbeafe] to-[#bfdbfe]/80 border border-[rgba(37,99,235,0.3)] flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-lg font-bold text-black mb-5 pb-3 border-b border-[rgba(37,99,235,0.2)]">
                      {category.title}
                    </h4>

                    <div className="space-y-4">
                      {category.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-black font-bold flex items-center gap-1.5">
                              {skill.name}
                              {skill.highlight && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              )}
                            </span>
                            <span className="text-black font-bold">{skill.level}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#bfdbfe] rounded-full overflow-hidden">
                            <div
                              style={{ width: `${skill.level}%` }}
                              className="h-full bg-[#2563eb] rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ENGINEERING MINDSET */}
          {activeTab === "mindset" && (
            <div
              key="mindset"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {ENGINEERING_MINDSET.map((principle) => (
                <div
                  key={principle.id}
                  className="warm-card p-7 sm:p-9 bg-gradient-to-br from-[#eff6ff] via-[#dbeafe] to-[#bfdbfe]/80 border border-[rgba(37,99,235,0.3)] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono text-[#2563eb] uppercase tracking-wider font-semibold">
                      {principle.subtitle}
                    </span>
                    <h4 className="text-2xl font-bold tracking-tight text-black mt-1.5 mb-3">
                      {principle.title}
                    </h4>
                    <p className="text-sm text-black leading-relaxed font-space mb-6">
                      {principle.description}
                    </p>

                    <div className="space-y-2.5">
                      {principle.bullets.map((bullet, bIdx) => (
                        <div
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-black font-sans"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

