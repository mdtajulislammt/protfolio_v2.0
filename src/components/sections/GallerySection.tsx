"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

interface GalleryPhotoItem {
  id: string;
  src: string;
  className: string; // Compact Bento layout spans (choto, boro, lomba)
  alt: string;
}

// Exactly 15 curated high-resolution photos in a low-height, highly compact Bento mosaic
const FIFTEEN_PHOTOS: GalleryPhotoItem[] = [
  // 1. Boro / Large 2x2 Hero
  {
    id: "photo-1",
    src: "/gallery/architecture_design.jpg",
    className: "col-span-2 sm:col-span-2 lg:col-span-2 row-span-2",
    alt: "Distributed Microservices Architecture",
  },
  // 2. Lomba / Tall 1x2 Portrait
  {
    id: "photo-2",
    src: "/profile_abedin_suit.png",
    className: "col-span-1 sm:col-span-1 lg:col-span-1 row-span-2",
    alt: "Engineering Leadership Portrait",
  },
  // 3. Coto / Small 1x1
  {
    id: "photo-3",
    src: "/gallery/code_notebook.jpg",
    className: "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1",
    alt: "Database ERD Modeling Notebook",
  },
  // 4. Coto / Small 1x1
  {
    id: "photo-4",
    src: "/gopher_machine.png",
    className: "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1",
    alt: "Concurrent Go Runtime Engine",
  },
  // 5. Wide 2x1 Landscape
  {
    id: "photo-5",
    src: "/gallery/golang_editor.jpg",
    className: "col-span-2 sm:col-span-2 lg:col-span-2 row-span-1",
    alt: "Curved OLED Golang Code Editor",
  },
  // 6. Wide 2x1 Landscape
  {
    id: "photo-6",
    src: "/gallery/dev_workstation.jpg",
    className: "col-span-2 sm:col-span-2 lg:col-span-2 row-span-1",
    alt: "Dual Ultrawide Command Station",
  },
  // 7. Lomba / Tall 1x2 Portrait
  {
    id: "photo-7",
    src: "/profile_extended.png",
    className: "col-span-1 sm:col-span-1 lg:col-span-1 row-span-2",
    alt: "System Architecture Lead",
  },
  // 8. Coto / Small 1x1
  {
    id: "photo-8",
    src: "/gallery/cloud_servers.jpg",
    className: "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1",
    alt: "Cloud Datacenter Server Infrastructure",
  },
  // 9. Coto / Small 1x1
  {
    id: "photo-9",
    src: "/profile_natural.png",
    className: "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1",
    alt: "Natural Engineering Profile",
  },
  // 10. Wide 2x1 Landscape
  {
    id: "photo-10",
    src: "/pm2_terminal.png",
    className: "col-span-2 sm:col-span-2 lg:col-span-2 row-span-1",
    alt: "Live PM2 28+ Microservices Fleet",
  },
  // 11. Wide 2x1 Landscape
  {
    id: "photo-11",
    src: "/gemini_img.jpeg",
    className: "col-span-2 sm:col-span-2 lg:col-span-2 row-span-1",
    alt: "High Performance Compute Environment",
  },
  // 12. Coto / Small 1x1
  {
    id: "photo-12",
    src: "/profile_portrait.png",
    className: "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1",
    alt: "Technical Leadership Close-up",
  },
  // 13. Coto / Small 1x1
  {
    id: "photo-13",
    src: "/profile_zoomed.png",
    className: "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1",
    alt: "Backend Architect Profile",
  },
  // 14. Wide 2x1 Landscape
  {
    id: "photo-14",
    src: "/minhajul_portrait.png",
    className: "col-span-2 sm:col-span-2 lg:col-span-2 row-span-1",
    alt: "Lead Engineer Portrait",
  },
  // 15. Coto / Small 1x1
  {
    id: "photo-15",
    src: "/profile.png",
    className: "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1",
    alt: "Tajul Islam Engineering Signature",
  },
];

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { lenis } = useSmoothScroll();

  // Smooth staggered reveal animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".compact-gallery-item");
      cards.forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            toggleActions: "play none none none",
          },
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: (idx % 5) * 0.04,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Lightbox keyboard controls & scroll freezing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % FIFTEEN_PHOTOS.length : 0));
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + FIFTEEN_PHOTOS.length) % FIFTEEN_PHOTOS.length : 0
        );
      }
    };

    if (lightboxIndex !== null) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, lenis]);

  const activePhoto = lightboxIndex !== null ? FIFTEEN_PHOTOS[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-4 sm:py-6 md:py-8 relative z-10 bg-[#dbeafe] border-y border-[rgba(37,99,235,0.2)] overflow-hidden"
    >
      {/* Low-Height Compact Container displaying all 15 images with ZERO text */}
      <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6">
        {/* Compact auto-rows: row height strictly kept to ~125px-135px so all 15 fit in ~600px total height */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5 lg:gap-3 auto-rows-[105px] sm:auto-rows-[120px] md:auto-rows-[130px] lg:auto-rows-[135px]">
          {FIFTEEN_PHOTOS.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              className={`compact-gallery-item group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white/90 border border-blue-200/80 hover:border-blue-500 shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-0.5 ${photo.className}`}
            >
              {/* Pure Photo with NO text */}
              <div className="relative w-full h-full bg-neutral-900 overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-400 ease-out"
                />

                {/* Subtle Hover Overlay with Maximize Icon */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md text-black flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Photo Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 md:p-8"
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Lightbox Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              data-lenis-prevent="true"
              className="relative w-full max-w-5xl max-h-[90vh] bg-neutral-950 border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10"
            >
              {/* Top Bar with Counter & Close */}
              <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between text-white shrink-0 bg-black/50 backdrop-blur-md">
                <span className="text-xs font-mono text-white/70">
                  {lightboxIndex + 1} of {FIFTEEN_PHOTOS.length}
                </span>

                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Photo Area */}
              <div className="relative flex-1 min-h-[350px] sm:min-h-[550px] w-full bg-black/95 flex items-center justify-center overflow-hidden">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  className="object-contain"
                  priority
                />

                {/* Left Navigation Button */}
                <button
                  onClick={() =>
                    setLightboxIndex(
                      (lightboxIndex - 1 + FIFTEEN_PHOTOS.length) % FIFTEEN_PHOTOS.length
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer hover:scale-105 z-20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right Navigation Button */}
                <button
                  onClick={() =>
                    setLightboxIndex((lightboxIndex + 1) % FIFTEEN_PHOTOS.length)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer hover:scale-105 z-20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
