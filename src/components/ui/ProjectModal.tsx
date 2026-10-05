"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/portfolio";
import {
  X,
  ExternalLink,
  Lock,
  CheckCircle2,
  Cpu,
  BarChart3,
  Layers,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      // Freeze background smooth scroll & browser scroll
      lenis?.stop();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      lenis?.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, lenis, onClose]);

  if (!project) return null;

  // Clean split for titles with parentheses like "AamarDokan (All-In-One...)"
  const titleParts = project.title.split("(");
  const mainTitle = titleParts[0].trim();
  const subTitleDetail = titleParts[1] ? titleParts[1].replace(")", "").trim() : null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden"
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Full Backdrop covering entire screen & Navbar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-950/75 backdrop-blur-md"
        />

        {/* Modal Window Container: Wider (max-w-5xl) & Compact Height (max-h-[78vh]) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          data-lenis-prevent="true"
          className="relative w-full max-w-5xl lg:max-w-6xl bg-white border border-neutral-200/90 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[78vh] sm:max-h-[80vh] text-left"
        >
          {/* Compact Fixed Header */}
          <div className="p-4 sm:p-5 pb-3 border-b border-neutral-100 flex items-start justify-between gap-4 shrink-0 bg-white/95 backdrop-blur-xs">
            <div className="space-y-1 max-w-3xl">
              {/* Meta Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 font-bold">
                  {project.category}
                </span>

                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-neutral-600 px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 font-medium">
                  <Calendar className="w-3 h-3 text-neutral-500" />
                  <span>{project.period}</span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{project.status}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 pt-0.5">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 leading-snug">
                  {mainTitle}
                </h3>
                {subTitleDetail && (
                  <span className="text-xs sm:text-sm font-mono text-blue-600 font-semibold">
                    • {subTitleDetail}
                  </span>
                )}
              </div>

              {project.tagline && (
                <p className="text-xs sm:text-sm text-neutral-600 font-space leading-normal line-clamp-1">
                  {project.tagline}
                </p>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 transition-all cursor-pointer shrink-0"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div
            data-lenis-prevent="true"
            className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              
              {/* Left Column (8 of 12 cols): Overview & Highlights */}
              <div className="lg:col-span-8 space-y-4">
                {/* Architectural Overview */}
                <div className="bg-neutral-50/80 border border-neutral-200/80 rounded-xl p-4 sm:p-4.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-blue-600 mb-2 flex items-center gap-2 font-bold">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    Architectural Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-space">
                    {project.detailedDescription || project.description}
                  </p>
                </div>

                {/* Key Engineering Highlights */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-blue-600 mb-2.5 flex items-center gap-2 font-bold">
                    <Cpu className="w-3.5 h-3.5 text-blue-600" />
                    Key Engineering Highlights
                  </h4>
                  <div className="space-y-2">
                    {project.keyFeatures.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-lg bg-white border border-neutral-200/70 text-xs sm:text-sm text-neutral-800 shadow-2xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-sans">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (4 of 12 cols): Metrics & Tech Stack */}
              <div className="lg:col-span-4 space-y-4">
                {/* Key Performance Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="bg-neutral-50/80 border border-neutral-200/80 rounded-xl p-3.5 sm:p-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-blue-600 mb-2.5 flex items-center gap-2 font-bold">
                      <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                      Key Metrics
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                      {project.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-white border border-neutral-200/80 text-left shadow-2xs"
                        >
                          <div className="text-sm sm:text-base font-bold font-mono text-neutral-900 leading-tight">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-neutral-500 font-mono font-medium mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Chips */}
                <div className="bg-neutral-50/80 border border-neutral-200/80 rounded-xl p-3.5 sm:p-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-700 mb-2 font-bold">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-white border border-neutral-200 text-neutral-800 font-medium shadow-2xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Engineering Role */}
                <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200/60 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <div className="text-xs font-mono">
                    <div className="text-neutral-500 text-[9px] uppercase tracking-wider">Engineering Role</div>
                    <div className="font-bold text-neutral-900 text-xs">{project.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Fixed Footer Action Bar */}
          <div className="p-3 sm:p-3.5 px-4 sm:px-6 bg-neutral-50/90 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="text-[11px] text-neutral-500 font-mono hidden sm:block">
              {/* Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700 font-sans text-[10px]">ESC</kbd> or click outside to close */}
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-300 font-semibold transition-all shadow-xs"
                >
                  <Github className="w-3.5 h-3.5 text-neutral-700" />
                  <span>Source Code</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono bg-neutral-100 text-neutral-600 border border-neutral-200 font-semibold">
                  <Lock className="w-3 h-3 text-neutral-500" />
                  <span>Proprietary System</span>
                </span>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono text-white bg-blue-600 hover:bg-blue-700 font-semibold transition-all shadow-sm"
                >
                  <span>Visit Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
