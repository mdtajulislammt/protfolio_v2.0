"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  FileText,
  Copy,
  Briefcase,
  Layers,
  GraduationCap,
  Mail,
  Home,
  X,
  ExternalLink,
  Network,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { PERSONAL_INFO, PROJECTS } from "@/data/portfolioData";
import { useToast } from "@/components/ui/Toast";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();
  const { scrollTo: smoothScrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    showToast("Email address copied to clipboard!");
    onClose();
  };

  const scrollTo = (id: string) => {
    smoothScrollTo(`#${id}`);
    onClose();
  };

  const actions = [
    {
      id: "home",
      title: "Jump to Home / Hero",
      subtitle: "Back to top and live availability",
      icon: Home,
      category: "Navigation",
      action: () => scrollTo("hero"),
    },
    {
      id: "experience",
      title: "Jump to Professional Journey",
      subtitle: "Backbencher Studio & TechSoul",
      icon: Briefcase,
      category: "Navigation",
      action: () => scrollTo("experience"),
    },
    {
      id: "gallery",
      title: "Jump to Visual Gallery & Lab",
      subtitle: "System design diagrams, workstations & server clusters",
      icon: Layers,
      category: "Navigation",
      action: () => scrollTo("gallery"),
    },
    {
      id: "projects",
      title: "Jump to Selected Projects",
      subtitle: "6 core backend architectures & cloud systems",
      icon: Layers,
      category: "Navigation",
      action: () => scrollTo("projects"),
    },
    {
      id: "about",
      title: "Jump to About & Expertise",
      subtitle: "Bio, skills matrix & engineering mindset",
      icon: GraduationCap,
      category: "Navigation",
      action: () => scrollTo("about"),
    },
    {
      id: "contact",
      title: "Jump to Contact",
      subtitle: "Send a direct message or booking inquiry",
      icon: Mail,
      category: "Navigation",
      action: () => scrollTo("contact"),
    },
    {
      id: "copy-email",
      title: "Copy Email Address",
      subtitle: PERSONAL_INFO.email,
      icon: Copy,
      category: "Quick Actions",
      action: handleCopyEmail,
    },
    {
      id: "whatsapp",
      title: "WhatsApp Direct Chat",
      subtitle: `Message ${PERSONAL_INFO.name} directly on WhatsApp`,
      icon: FileText,
      category: "Quick Actions",
      action: () => {
        window.open(PERSONAL_INFO.whatsapp, "_blank");
        onClose();
      },
    },
    {
      id: "github",
      title: "Visit GitHub Profile",
      subtitle: "github.com/mdtajulislam",
      icon: Github,
      category: "Social Links",
      action: () => {
        window.open(PERSONAL_INFO.github, "_blank");
        onClose();
      },
    },
    {
      id: "linkedin",
      title: "Visit LinkedIn Profile",
      subtitle: `Connect with ${PERSONAL_INFO.name}`,
      icon: Linkedin,
      category: "Social Links",
      action: () => {
        window.open(PERSONAL_INFO.linkedin, "_blank");
        onClose();
      },
    },
  ];

  const projectActions = PROJECTS.map((proj) => ({
    id: `proj-${proj.id}`,
    title: proj.title,
    subtitle: `${proj.category} • ${proj.tags.slice(0, 3).join(", ")}`,
    icon: ExternalLink,
    category: "Projects",
    action: () => {
      scrollTo("projects");
      if (proj.liveUrl) {
        window.open(proj.liveUrl, "_blank");
      }
    },
  }));

  const allItems = [...actions, ...projectActions];

  const filteredItems = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#030201]/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-xl bg-[#eff6ff] border border-[rgba(37,99,235,0.3)] rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[rgba(37,99,235,0.2)]">
              <Search className="w-5 h-5 text-[#2563eb] shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, section, or project..."
                className="w-full bg-transparent text-sm text-black placeholder-[#64748b] focus:outline-none font-sans font-medium"
              />
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#dbeafe] border border-[rgba(37,99,235,0.3)] text-black font-bold">
                <Command className="w-3 h-3 text-[#2563eb]" /> ESC
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-black hover:text-[#2563eb] cursor-pointer"
                aria-label="Close command palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-[rgba(37,99,235,0.12)]">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono text-black font-medium">
                  No matching commands or projects found.
                </div>
              ) : (
                filteredItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-[#dbeafe] text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-lg bg-[#dbeafe] border border-[rgba(37,99,235,0.25)] text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white transition-colors shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-black truncate">
                            {item.title}
                          </div>
                          <div className="text-[11px] font-mono text-black truncate">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-black uppercase tracking-wider shrink-0 px-2.5 py-0.5 rounded-full bg-[#dbeafe] border border-[rgba(37,99,235,0.25)] font-bold">
                        {item.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-[#dbeafe]/80 border-t border-[rgba(37,99,235,0.25)] flex items-center justify-between text-[11px] font-mono text-black">
              <div className="flex items-center gap-2">
                <span>Select &amp; execute anytime with</span>
                <span className="text-black bg-[#bfdbfe] px-2 py-0.5 rounded border border-[rgba(37,99,235,0.3)] font-bold">
                  ⌘K
                </span>
              </div>
              <span className="font-bold">{PERSONAL_INFO.name}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

