"use client";

import React from "react";
import { MARQUEE_SKILLS } from "@/data/portfolioData";
import { Sparkles } from "lucide-react";

export function MarqueeSection() {
  const list = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];

  return (
    <div className="relative py-5 border-y border-[rgba(37,99,235,0.3)] bg-[#bfdbfe]/80 backdrop-blur-sm overflow-hidden z-10">
      {/* Gradient fade on left and right edges */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#dbeafe] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#dbeafe] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-3.5 sm:gap-4">
        {list.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#dbeafe] hover:bg-[#bfdbfe] border border-[rgba(37,99,235,0.3)] hover:border-[#2563eb] shadow-[0_2px_8px_rgba(37,99,235,0.1)] hover:shadow-[0_4px_14px_rgba(37,99,235,0.2)] hover:-translate-y-0.5 transition-all duration-200 cursor-default select-none group shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2563eb] group-hover:scale-125 transition-transform" />
            <span className="text-xs sm:text-sm font-mono tracking-tight text-black font-bold">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
