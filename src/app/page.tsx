"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { CommandMenu } from "@/components/ui/CommandMenu";
import { ToastProvider } from "@/components/ui/Toast";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  return (
    <SmoothScrollProvider>
      <ToastProvider>
        <div className="relative min-h-screen bg-[#dbeafe] text-black selection:bg-[#2563eb] selection:text-white font-sans">
          {/* Top Navbar */}
          <Navbar onOpenCommand={() => setCommandMenuOpen(true)} />

          {/* ⌘K Spotlight Command Palette */}
          <CommandMenu
            isOpen={commandMenuOpen}
            onClose={() => setCommandMenuOpen(false)}
          />

          {/* Main Content Sections */}
          <main className="relative z-10 flex flex-col">
            <HeroSection />
            <MarqueeSection />
            <ExperienceSection />
            <ProjectsSection />
            <AboutSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </ToastProvider>
    </SmoothScrollProvider>
  );
}

