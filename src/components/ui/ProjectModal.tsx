"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/portfolio";
import { X, ExternalLink, Lock, CheckCircle2, Cpu, BarChart3, Layers } from "lucide-react";
import { Github } from "@/components/ui/Icons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#030201]/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className="relative w-full max-w-2xl bg-[#eff6ff] border border-[rgba(37,99,235,0.3)] rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-left"
          >
            {/* Top decorative gradient bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#0f172a]" />

            {/* Header */}
            <div className="p-6 sm:p-8 pb-4 border-b border-[rgba(37,99,235,0.2)] flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-[#dbeafe] border border-[rgba(37,99,235,0.3)] text-black font-bold">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-mono text-black font-semibold">
                    {project.period}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#2563eb] px-2.5 py-0.5 rounded-full bg-[#dbeafe] border border-[rgba(37,99,235,0.2)]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-black">{project.status}</span>
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#2563eb] mt-1 font-bold">
                  {project.subtitle}
                </p>
                {project.tagline && (
                  <p className="text-xs sm:text-sm text-black/80 font-space mt-2 italic leading-relaxed">
                    &ldquo;{project.tagline}&rdquo;
                  </p>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-[#dbeafe] hover:bg-[#bfdbfe] border border-[rgba(37,99,235,0.3)] text-black hover:text-[#2563eb] transition-colors cursor-pointer shrink-0"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Detailed Description */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#2563eb] mb-2 flex items-center gap-2 font-semibold">
                  <Layers className="w-3.5 h-3.5 text-[#2563eb]" />
                  Architectural Overview
                </h4>
                <p className="text-sm text-black leading-relaxed font-space">
                  {project.detailedDescription || project.description}
                </p>
              </div>

              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#2563eb] mb-3 flex items-center gap-2 font-semibold">
                    <BarChart3 className="w-3.5 h-3.5 text-[#2563eb]" />
                    Key Performance Metrics
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {project.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-[#dbeafe] border border-[rgba(37,99,235,0.3)] text-center shadow-xs"
                      >
                        <div className="text-base sm:text-lg font-bold font-mono text-black">
                          {m.value}
                        </div>
                        <div className="text-[11px] text-black font-mono font-semibold mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#2563eb] mb-3 flex items-center gap-2 font-semibold">
                  <Cpu className="w-3.5 h-3.5 text-[#2563eb]" />
                  Engineering Highlights
                </h4>
                <ul className="space-y-2.5">
                  {project.keyFeatures.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-black font-sans"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Tags */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#2563eb] mb-2 font-semibold">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-[#dbeafe] border border-[rgba(37,99,235,0.3)] text-black font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-[#dbeafe]/80 border-t border-[rgba(37,99,235,0.25)] flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-black font-mono font-medium">
                Role: <span className="text-black font-bold">{project.role}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-warm inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono text-black border border-[rgba(37,99,235,0.3)] bg-[#dbeafe] hover:bg-[#bfdbfe]"
                  >
                    <Github className="w-3.5 h-3.5 text-[#2563eb]" />
                    <span>Source Code</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-[#dbeafe] text-black border border-[rgba(37,99,235,0.3)] font-semibold">
                    <Lock className="w-3 h-3 text-[#2563eb]" />
                    <span>Proprietary System</span>
                  </span>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-dark inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono"
                  >
                    <span>Visit Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

