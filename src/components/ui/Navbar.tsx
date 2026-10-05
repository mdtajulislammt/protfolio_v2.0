"use client";

import React, { useState, useEffect } from "react";
import { Search, Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

interface NavbarProps {
  onOpenCommand: () => void;
}

export function Navbar({ onOpenCommand }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo: smoothScrollTo } = useSmoothScroll();

  const navLinks = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Gallery", href: "#gallery", id: "gallery" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "About", href: "#about", id: "about" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ["hero", "experience", "gallery", "projects", "about", "contact"];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    smoothScrollTo(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#dbeafe]/95 backdrop-blur-md shadow-[0_4px_18px_rgba(37,99,235,0.12)] border-b border-[rgba(37,99,235,0.2)] py-3.5"
          : "bg-[#dbeafe]/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Left: Brand Monogram */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#hero");
          }}
          className="group flex items-center text-3xl font-editorial italic font-medium tracking-tight text-[#0f172a] transition-opacity hover:opacity-80 cursor-pointer"
        >
          <span>Tajul<span className="text-[#2563eb]">.</span></span>
        </a>

        {/* Center / Right: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className={`text-sm font-space tracking-tight transition-colors cursor-pointer ${
                      isActive
                        ? "text-[#2563eb] font-semibold"
                        : "text-black font-medium hover:text-[#2563eb]"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Search ⌘K Button */}
          <button
            type="button"
            onClick={onOpenCommand}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dbeafe] hover:bg-[#bfdbfe] text-[#2563eb] hover:text-[#1d4ed8] border border-[rgba(37,99,235,0.25)] text-xs font-mono transition-all cursor-pointer shadow-xs group"
            title="Open command palette (⌘K or Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#2563eb] group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-space text-[#2563eb] font-medium">
              Search
            </span>
            <kbd className="text-[10px] bg-[#bfdbfe] px-1.5 py-0.5 rounded border border-[rgba(37,99,235,0.3)] font-sans text-black font-bold">
              ⌘K
            </kbd>
          </button>

          {/* GET IN TOUCH pill button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
            className="btn-dark px-5 py-2 text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>GET IN TOUCH</span>
          </a>
        </nav>

        {/* Mobile Action Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenCommand}
            aria-label="Open Search"
            className="p-2 rounded-full bg-[#dbeafe] border border-[rgba(37,99,235,0.25)] text-[#2563eb] hover:bg-[#bfdbfe]"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-[#dbeafe] border border-[rgba(37,99,235,0.25)] text-[#2563eb] hover:bg-[#bfdbfe] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-[rgba(37,99,235,0.25)] bg-[#dbeafe]/98 backdrop-blur-xl px-6 py-4 flex flex-col gap-2 overflow-hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`py-2 px-3 rounded-lg text-sm font-space transition-colors flex items-center justify-between ${
                  activeSection === link.id
                    ? "bg-[#bfdbfe] text-[#2563eb] font-semibold"
                    : "text-black font-medium hover:text-[#2563eb]"
                }`}
              >
                <span>{link.name}</span>
                {activeSection === link.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
                )}
              </a>
            ))}
            <div className="pt-3 mt-1 border-t border-[rgba(37,99,235,0.12)]">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact");
                }}
                className="btn-dark w-full py-2.5 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
