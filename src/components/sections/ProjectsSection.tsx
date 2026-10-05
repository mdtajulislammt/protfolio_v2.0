"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/portfolio";
import { PROJECTS } from "@/data/portfolioData";
import { ProjectModal } from "@/components/ui/ProjectModal";
import {
  ArrowUpRight,
  Layers,
  Search,
  X,
  ExternalLink,
} from "lucide-react";
import { gsap } from "@/lib/gsap";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        project.title.toLowerCase().includes(query) ||
        project.subtitle.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        project.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Clean Header Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 25,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Clean Card Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".simple-project-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            toggleActions: "play none none none",
          },
          y: 25,
          opacity: 0,
          duration: 0.5,
          delay: (i % 3) * 0.08,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 sm:py-28 relative z-10 bg-[#e8f1fd] border-y border-blue-200/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Simple & Clean Header */}
        <div ref={headerRef} className="mb-10 sm:mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-blue-200/60">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bebas text-black tracking-tight leading-none">
                SELECTED PROJECTS.
              </h2>
              <p className="text-black/75 max-w-xl text-sm sm:text-base mt-2 font-space">
                Production-grade backend architectures, distributed systems, and real-time platforms.
              </p>
            </div>
          </div>

          {/* Simple Category Tabs */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-mono px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium ${
                    isSelected
                      ? "bg-[#2563eb] text-white shadow-xs"
                      : "bg-white/70 text-black/75 hover:bg-white hover:text-black border border-blue-200/50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Simple & Clean Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-white/60 border border-blue-200/60 p-8">
            <Layers className="w-8 h-8 text-blue-600 mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-black font-space">
              No projects found
            </h3>
            <p className="text-xs font-mono text-black/60 mt-1">
              Try clearing your search query or switching categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-mono cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const orderNumber = String(index + 1).padStart(2, "0");
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <SimpleProjectCard
                      project={project}
                      orderNumber={orderNumber}
                      onClick={() => setActiveModalProject(project)}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}

// -------------------------------------------------------------
// Simple, Clean & Modern Project Card
// -------------------------------------------------------------
interface SimpleProjectCardProps {
  project: Project;
  orderNumber: string;
  onClick: () => void;
}

function SimpleProjectCard({
  project,
  orderNumber,
  onClick,
}: SimpleProjectCardProps) {
  // Extract simple clean title (remove long bracketed subtitles)
  const cleanTitle = project.title.split("(")[0].trim();

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      className="simple-project-card group bg-white/90 hover:bg-white border border-blue-200/80 hover:border-blue-500 rounded-xl p-5 flex flex-col justify-between h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer select-none text-left"
    >
      <div>
        {/* Top Meta Row: Number & Status */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-blue-100">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-blue-600">
              {orderNumber}
            </span>
            <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-100">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{project.status}</span>
          </div>
        </div>

        {/* Project Title */}
        <div className="mt-3.5">
          <h3 className="text-base sm:text-lg font-bold text-black group-hover:text-blue-600 transition-colors line-clamp-1 flex items-center justify-between gap-1">
            <span>{cleanTitle}</span>
            <ArrowUpRight className="w-4 h-4 text-black/40 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </h3>
          <p className="text-[11px] font-mono text-blue-600 font-medium mt-0.5">
            {project.subtitle || project.category}
          </p>
        </div>

        {/* Short Description */}
        <p className="text-xs text-black/70 font-space mt-2.5 line-clamp-2 leading-relaxed">
          {project.tagline || project.description}
        </p>
      </div>

      {/* Bottom Tech Tags */}
      <div className="mt-5 pt-3 border-t border-blue-100 flex flex-wrap items-center gap-1.5">
        {project.tags.slice(0, 4).map((tag, idx) => (
          <span
            key={idx}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50/80 text-black/80 border border-blue-200/50"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="text-[10px] font-mono text-black/50 font-medium ml-0.5">
            +{project.tags.length - 4}
          </span>
        )}
      </div>
    </div>
  );
}
