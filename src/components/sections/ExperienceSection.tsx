"use client";

import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCES } from "@/data/portfolioData";
import { Calendar, MapPin, CheckCircle2, Briefcase, Award } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 sm:py-32 relative z-10 bg-[#eef5ff]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Section Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2563eb] font-bold">
              <Briefcase className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>01 / Experience</span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bebas text-black leading-[0.92] tracking-tight">
              PROFESSIONAL
              <br />
              JOURNEY
            </h2>
            <p className="text-sm font-space text-black leading-relaxed">
              Building innovative solutions and growing as a developer through diverse challenges and collaborative environments.
            </p>

            {/* 4 Quick Stat Pills from user's experience */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <div className="p-3 rounded-2xl bg-[#dbeafe]/90 border border-[rgba(37,99,235,0.25)] text-center shadow-xs">
                <div className="font-bebas text-3xl text-black leading-none">3+</div>
                <div className="text-[11px] font-mono text-black font-semibold mt-0.5">Years Experience</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#dbeafe]/90 border border-[rgba(37,99,235,0.25)] text-center shadow-xs">
                <div className="font-bebas text-3xl text-black leading-none">30+</div>
                <div className="text-[11px] font-mono text-black font-semibold mt-0.5">Projects Completed</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#dbeafe]/90 border border-[rgba(37,99,235,0.25)] text-center shadow-xs">
                <div className="font-bebas text-3xl text-black leading-none">15+</div>
                <div className="text-[11px] font-mono text-black font-semibold mt-0.5">Technologies</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#dbeafe]/90 border border-[rgba(37,99,235,0.25)] text-center shadow-xs">
                <div className="font-bebas text-3xl text-black leading-none">3</div>
                <div className="text-[11px] font-mono text-black font-semibold mt-0.5">Companies</div>
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(37,99,235,0.2)] space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-black font-bold">
                  Currently at Backbencher Studio
                </span>
              </div>
              <p className="text-xs font-mono text-black">
                Rampura, Dhaka, Bangladesh • On-site Mid Backend Developer
              </p>
            </div>
          </div>

          {/* Right Column: Experience Cards List */}
          <div className="lg:col-span-8 space-y-6">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="warm-card p-7 sm:p-9 bg-gradient-to-br from-[#eff6ff] via-[#dbeafe] to-[#bfdbfe]/80 border border-[rgba(37,99,235,0.3)] relative group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#2563eb]"
              >
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="font-bebas text-3xl sm:text-4xl text-[#2563eb] leading-none">
                        {exp.order}
                      </span>
                      <span className="text-[#2563eb]/40">•</span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-black bg-[#dbeafe] px-3.5 py-1 rounded-full border border-[rgba(37,99,235,0.3)] font-bold">
                        <Calendar className="w-3.5 h-3.5 text-[#2563eb]" />
                        <span>{exp.period}</span>
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2.5 text-sm font-mono mt-2">
                      <span className="font-bold text-black">{exp.company}</span>
                      <span className="text-black">•</span>
                      <span className="flex items-center gap-1 text-black font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-[#2563eb]" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono px-3.5 py-1 rounded-full bg-[#dbeafe] border border-[rgba(37,99,235,0.3)] text-black self-start font-bold shadow-2xs">
                    {exp.type}
                  </span>
                </div>

                {/* Role Summary */}
                <p className="text-sm text-black leading-relaxed font-space mb-6">
                  {exp.summary}
                </p>

                {/* Accomplishments Bullets */}
                <div className="space-y-3 mb-7">
                  {exp.bullets.map((bullet, bIdx) => (
                    <div
                      key={bIdx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-black font-sans"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-5 border-t border-[rgba(37,99,235,0.2)]">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-[#dbeafe] text-black border border-[rgba(37,99,235,0.25)] font-bold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

