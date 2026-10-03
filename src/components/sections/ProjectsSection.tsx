"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/portfolio";
import { PROJECTS } from "@/data/portfolioData";
import { ProjectModal } from "@/components/ui/ProjectModal";
import {
  ExternalLink,
  ArrowUpRight,
  Layers,
  Sparkles,
  CheckCircle2,
  Cpu,
  BarChart3,
} from "lucide-react";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Work");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    "All Work",
    ...Array.from(new Set(PROJECTS.map((p) => p.category))),
  ];

  const filteredProjects =
    selectedCategory === "All Work"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 sm:py-32 relative z-10 bg-[#dbeafe]/60 border-y border-[rgba(37,99,235,0.25)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#2563eb] uppercase mb-2 font-bold">
              <Layers className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>02 / A Selection Of My Work</span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bebas text-black leading-[0.92] tracking-tight">
              SELECTED PROJECTS.
            </h2>
            <p className="text-black max-w-xl text-sm sm:text-base mt-2 font-space leading-relaxed">
              Showcasing design architectures, core system ledgers, microservices platforms, and automated SaaS implementations.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#bfdbfe]/80 border border-[rgba(37,99,235,0.3)] self-start md:self-auto shadow-xs overflow-x-auto max-w-full scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-mono px-4 py-2 rounded-full whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#2563eb] text-white font-bold shadow-xs"
                    : "text-black font-semibold hover:text-[#2563eb]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              return (
                <div
                  key={project.id}
                  className="warm-card p-7 sm:p-8 bg-gradient-to-br from-[#eff6ff] via-[#dbeafe] to-[#bfdbfe]/80 border border-[rgba(37,99,235,0.3)] flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-[#2563eb]"
                >
                  <div>
                    {/* Header: Icon, Subtitle/Tag, Role & Status */}
                    <div className="flex items-start justify-between gap-4 pb-4 border-b border-[rgba(37,99,235,0.18)]">
                      <div className="flex items-start gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-[#dbeafe] border border-[rgba(37,99,235,0.25)] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#2563eb] group-hover:text-white transition-colors">
                          {project.id === "aamardokan" && <Layers className="w-5 h-5 text-inherit" />}
                          {project.id === "finance-management-system" && <BarChart3 className="w-5 h-5 text-inherit" />}
                          {project.id === "realtime-streaming-platform" && <Sparkles className="w-5 h-5 text-inherit" />}
                          {project.id === "erp-system" && <Layers className="w-5 h-5 text-inherit" />}
                          {project.id === "gitjuris-hiring-platform" && <Cpu className="w-5 h-5 text-inherit" />}
                          {project.id === "mercury-ai-saas" && <Sparkles className="w-5 h-5 text-inherit" />}
                        </div>
                        <div>
                          <div className="text-[11px] font-mono font-bold tracking-wider text-[#2563eb] uppercase">
                            {project.subtitle || project.category}
                          </div>
                          {project.role && (
                            <span className="inline-block mt-1 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#dbeafe] text-black border border-[rgba(37,99,235,0.25)] font-bold">
                              {project.role}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#2563eb] shrink-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-bold text-black">{project.status}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black group-hover:text-[#2563eb] transition-colors mt-4">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-black leading-relaxed font-space mt-2.5">
                      {project.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="mt-5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-black font-bold block mb-2.5">
                        Key Highlights
                      </span>
                      <div className="space-y-2">
                        {project.keyFeatures.map((feature, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-start gap-2.5 text-xs text-black font-sans"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2563eb] shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mt-5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-black font-bold block mb-2">
                        Tech Stack
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {project.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs font-mono px-3 py-1 rounded-full bg-[#dbeafe] text-black border border-[rgba(37,99,235,0.25)] font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bottom Bar */}
                  <div className="pt-5 mt-6 border-t border-[rgba(37,99,235,0.18)] flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="btn-dark px-4 py-2 text-xs font-mono cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>Architecture Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={project.githubUrl || "https://github.com/mdtajulislam"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-warm px-3.5 py-2 text-xs font-mono inline-flex items-center gap-1.5 bg-[#dbeafe] hover:bg-[#bfdbfe] text-black border border-[rgba(37,99,235,0.35)]"
                    >
                      <span>Source Code</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#2563eb]" />
                    </a>
                  </div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}

