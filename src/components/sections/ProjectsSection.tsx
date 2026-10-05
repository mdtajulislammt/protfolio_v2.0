"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/portfolio";
import { PROJECTS } from "@/data/portfolioData";
import { ProjectModal } from "@/components/ui/ProjectModal";
import confetti from "canvas-confetti";
import {
  ArrowUpRight,
  Layers,
  Search,
  X,
  Zap,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { gsap } from "@/lib/gsap";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Work");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    return ["All Work", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === "All Work" || project.category === selectedCategory;

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

  // Card Reveal Animation on scroll / filter
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".compact-project-card");
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          y: 35,
          opacity: 0,
          duration: 0.65,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  const handleOpenModal = (project: Project) => {
    try {
      confetti({
        particleCount: 28,
        spread: 55,
        origin: { y: 0.65 },
        colors: ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"],
      });
    } catch {
      // ignore if confetti fails
    }
    setActiveModalProject(project);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 sm:py-32 relative z-10 bg-[#dbeafe]/60 border-y border-[rgba(37,99,235,0.2)]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12 sm:mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[rgba(37,99,235,0.2)]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#2563eb] uppercase mb-2 font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563eb] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563eb]"></span>
                </span>
                <Layers className="w-3.5 h-3.5 text-[#2563eb]" />
                <span>02 / Selected Projects</span>
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-bebas text-black leading-[0.92] tracking-tight">
                SELECTED PROJECTS.
              </h2>
              <p className="text-black max-w-2xl text-sm sm:text-base mt-2 font-space leading-relaxed">
                Click any project card to inspect deep architectural designs, live performance metrics, and engineering specifications.
              </p>
            </div>

            {/* Live Search Input */}
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2563eb]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or stack..."
                className="w-full pl-9 pr-8 py-2 rounded-full text-xs font-mono bg-[#eff6ff] border border-[rgba(37,99,235,0.3)] text-black placeholder:text-black/50 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Stat Counter Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="p-3 rounded-2xl bg-[#eff6ff]/90 border border-[rgba(37,99,235,0.25)] text-center shadow-xs">
              <div className="font-bebas text-3xl text-black leading-none">06</div>
              <div className="text-[11px] font-mono text-black font-semibold mt-0.5">
                Core Systems
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#eff6ff]/90 border border-[rgba(37,99,235,0.25)] text-center shadow-xs">
              <div className="font-bebas text-3xl text-[#2563eb] leading-none">&lt; 50ms</div>
              <div className="text-[11px] font-mono text-black font-semibold mt-0.5">
                Target Latency
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#eff6ff]/90 border border-[rgba(37,99,235,0.25)] text-center shadow-xs">
              <div className="font-bebas text-3xl text-black leading-none">100%</div>
              <div className="text-[11px] font-mono text-black font-semibold mt-0.5">
                ACID Integrity
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#eff6ff]/90 border border-[rgba(37,99,235,0.25)] text-center shadow-xs">
              <div className="font-bebas text-3xl text-emerald-600 leading-none">Live</div>
              <div className="text-[11px] font-mono text-black font-semibold mt-0.5">
                Production Ready
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-7 flex items-center gap-1.5 p-1 rounded-full bg-[#bfdbfe]/80 border border-[rgba(37,99,235,0.3)] shadow-xs overflow-x-auto max-w-full scrollbar-none">
            {categories.map((cat) => {
              const count =
                cat === "All Work"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.category === cat).length;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative text-xs font-mono px-3.5 py-1.5 rounded-full whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#2563eb] text-white font-bold shadow-xs"
                      : "text-black font-semibold hover:text-[#2563eb] hover:bg-[#dbeafe]"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-[#dbeafe] text-black"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact Projects Grid (3-column layout) */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-[#eff6ff] border border-[rgba(37,99,235,0.25)] p-8">
            <Layers className="w-10 h-10 text-[#2563eb] mx-auto mb-3 opacity-60" />
            <h3 className="text-xl font-bold text-black font-space">
              No matching projects found
            </h3>
            <p className="text-xs sm:text-sm font-mono text-black/70 mt-1 max-w-md mx-auto">
              Try clearing your search query or selecting &quot;All Work&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Work");
                setSearchQuery("");
              }}
              className="btn-dark px-4 py-2 mt-4 text-xs font-mono cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
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
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="h-full"
                  >
                    <CompactProjectCard
                      project={project}
                      orderNumber={orderNumber}
                      onClick={() => handleOpenModal(project)}
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
// Compact, Sleek Project Card with 3D Parallax Tilt
// -------------------------------------------------------------
interface CompactProjectCardProps {
  project: Project;
  orderNumber: string;
  onClick: () => void;
}

function CompactProjectCard({
  project,
  orderNumber,
  onClick,
}: CompactProjectCardProps) {
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
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const keyMetric =
    project.metrics && project.metrics.length > 0 ? project.metrics[0] : null;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateY(-4px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: isHovered
          ? "transform 0.08s ease-out, box-shadow 0.25s ease"
          : "transform 0.35s ease-out, box-shadow 0.35s ease",
      }}
      className="compact-project-card warm-card p-6 bg-gradient-to-br from-[#eff6ff] via-[#dbeafe] to-[#bfdbfe]/80 border border-[rgba(37,99,235,0.25)] rounded-2xl flex flex-col justify-between h-full relative group transition-all duration-300 hover:shadow-xl hover:border-[#2563eb] cursor-pointer text-left overflow-hidden select-none"
    >
      {/* Dynamic Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37,99,235,0.12), transparent 75%)`,
        }}
      />

      <div className="relative z-10">
        {/* Top Header: Order Number, Category & Status */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-[rgba(37,99,235,0.15)]">
          <div className="flex items-center gap-2">
            <span className="font-bebas text-2xl sm:text-3xl text-[#2563eb] leading-none">
              {orderNumber}
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#dbeafe] border border-[rgba(37,99,235,0.25)] text-black font-bold truncate max-w-[140px]">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-black shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{project.status}</span>
          </div>
        </div>

        {/* Project Title & Subtitle */}
        <div className="mt-3.5">
          <div className="text-[10px] font-mono font-bold text-[#2563eb] uppercase tracking-wider">
            {project.subtitle || project.category}
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-black group-hover:text-[#2563eb] transition-colors mt-0.5 line-clamp-1">
            {project.title.split("(")[0].trim()}
          </h3>
        </div>

        {/* Short Tagline / Description (2 lines max) */}
        <p className="text-xs text-black/80 font-space line-clamp-2 mt-2 leading-relaxed">
          {project.tagline || project.description}
        </p>

        {/* Highlight Metric Pill */}
        {keyMetric && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#eff6ff] border border-[rgba(37,99,235,0.2)] text-[11px] font-mono font-bold text-black shadow-2xs">
            <Zap className="w-3 h-3 text-[#2563eb]" />
            <span>{keyMetric.label}:</span>
            <span className="text-[#2563eb]">{keyMetric.value}</span>
          </div>
        )}

        {/* Tech Stack Pills (Top 3) */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag, tIdx) => (
            <span
              key={tIdx}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#dbeafe] text-black border border-[rgba(37,99,235,0.2)] font-semibold"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[10px] font-mono text-black/60 font-bold self-center">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer Action Bar */}
      <div className="pt-3 mt-4 border-t border-[rgba(37,99,235,0.15)] flex items-center justify-between text-xs font-mono relative z-10">
        <span className="font-bold text-[#2563eb] group-hover:underline inline-flex items-center gap-1">
          <span>Explore Details</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>

        <span className="text-[10px] text-black/50 font-medium">
          Click to inspect
        </span>
      </div>
    </div>
  );
}
