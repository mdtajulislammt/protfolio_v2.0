"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  Clock,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useToast } from "@/components/ui/Toast";
import confetti from "canvas-confetti";
import { gsap } from "@/lib/gsap";
import { LiveClock } from "@/components/ui/LiveClock";
import { Github, Linkedin, WhatsApp } from "@/components/ui/Icons";

const INQUIRY_TOPICS = [
  "Backend Architecture",
  "Full-Time Role",
  "Microservices",
  "Consultation",
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const channelsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          y: 30,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
        });
      }

      // Left Channels Animation
      if (channelsRef.current) {
        gsap.from(".contact-channel-card", {
          scrollTrigger: {
            trigger: channelsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          x: -25,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
        });
      }

      // Form Card Animation
      if (formRef.current) {
        gsap.from(formRef.current, {
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          x: 25,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    showToast("Email address copied to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleTopicSelect = (topic: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: prev.subject === topic ? "" : topic,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please fill in all required fields", "info");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast("Message sent successfully! Tajul will get back to you shortly.");

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#2563eb", "#3b82f6", "#60a5fa", "#0f172a"],
        });
      } catch {
        // canvas fallback
      }
    }, 850);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 sm:py-28 relative z-10 bg-[#dbeafe]/85 border-t border-[rgba(37,99,235,0.25)] overflow-hidden"
    >
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.14)_0%,transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-[450px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="mb-10 sm:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[rgba(37,99,235,0.2)]">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bebas text-black tracking-tight leading-[0.96]">
                LET&apos;S BUILD SOMETHING EXTRAORDINARY.
              </h2>
            </div>

            {/* Quick Status Pill */}
            <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/60 border border-[rgba(37,99,235,0.2)] shrink-0 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <div className="text-left font-mono">
                <div className="text-[11px] font-bold text-black">Available for Contracts</div>
                <div className="text-[10px] text-[#2563eb] font-semibold">Remote Worldwide &amp; Dhaka</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column (5 cols): Direct Communication Hub */}
          <div ref={channelsRef} className="lg:col-span-5 space-y-4">
            
            {/* Primary Channels Card Deck */}
            <div className="contact-channel-card rounded-2xl bg-white/50 backdrop-blur-sm border border-[rgba(37,99,235,0.22)] p-5 sm:p-6 shadow-sm divide-y divide-[rgba(37,99,235,0.14)] space-y-4">
              
              {/* Channel 1: Email Address */}
              <div className="pt-0 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#2563eb] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-black/60 uppercase tracking-wider font-bold">
                      Direct Email
                    </div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-xs sm:text-sm font-mono font-bold text-black hover:text-[#2563eb] transition-colors truncate block"
                      title={PERSONAL_INFO.email}
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white hover:bg-blue-50 border border-[rgba(37,99,235,0.25)] text-black hover:text-[#2563eb] transition-all cursor-pointer shadow-2xs"
                    title="Copy email"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="p-2 rounded-lg bg-white hover:bg-blue-50 border border-[rgba(37,99,235,0.25)] text-black hover:text-[#2563eb] transition-all cursor-pointer shadow-2xs"
                    title="Send email"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Channel 2: Phone & WhatsApp */}
              <div className="pt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-black/60 uppercase tracking-wider font-bold">
                      Phone &amp; WhatsApp
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-black">
                      {PERSONAL_INFO.phoneFormatted}
                    </div>
                  </div>
                </div>

                <a
                  href={PERSONAL_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-mono font-semibold transition-all inline-flex items-center gap-1 shrink-0 shadow-2xs"
                >
                  <WhatsApp className="w-3 h-3" />
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              {/* Channel 3: Location & Timezone */}
              <div className="pt-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono text-black/60 uppercase tracking-wider font-bold">
                    Base &amp; Timezone
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-black mt-0.5">
                    {PERSONAL_INFO.location}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <LiveClock showIcon={true} />
                  </div>
                  <p className="text-[11px] text-black/70 mt-1.5 font-space leading-relaxed">
                    Open for remote engineering contracts worldwide and on-site engineering leadership in Dhaka.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Response & Social Bar */}
            <div className="contact-channel-card rounded-2xl bg-white/40 border border-[rgba(37,99,235,0.2)] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#2563eb]" />
                <span className="text-[11px] font-mono text-black font-medium">
                  Average Response: <span className="font-bold text-[#2563eb]">&lt; 12 Hours</span>
                </span>
              </div>

              {/* Social Profiles */}
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-black hover:text-[#2563eb] border border-[rgba(37,99,235,0.2)] transition-all shadow-2xs"
                  title="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-black hover:text-[#2563eb] border border-[rgba(37,99,235,0.2)] transition-all shadow-2xs"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PERSONAL_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-black hover:text-emerald-600 border border-[rgba(37,99,235,0.2)] transition-all shadow-2xs"
                  title="WhatsApp"
                >
                  <WhatsApp className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Interactive Message Terminal */}
          <div ref={formRef} className="lg:col-span-7">
            <div className="rounded-2xl bg-gradient-to-br from-white/70 via-[#eff6ff]/80 to-[#dbeafe]/70 backdrop-blur-md border border-[rgba(37,99,235,0.25)] shadow-md overflow-hidden">
              
              {/* Terminal-Style Title Bar */}
              <div className="px-5 py-3 border-b border-[rgba(37,99,235,0.18)] bg-white/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="text-[11px] font-mono text-black/60 font-semibold tracking-wider ml-1">
                    direct_message.ts
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-[#2563eb] bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                  <ShieldCheck className="w-3 h-3 text-[#2563eb]" />
                  <span>DIRECT INBOX</span>
                </div>
              </div>

              {/* Terminal Form Body */}
              <div className="p-6 sm:p-7">
                {submitted ? (
                  <div className="py-10 text-center space-y-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold font-space text-black">
                        Message Sent Successfully!
                      </h4>
                      <p className="text-xs text-black/70 max-w-sm mx-auto font-space mt-1">
                        Thank you for reaching out. I have received your note and will get back to you within 12–24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="btn-outline-warm px-4 py-2 rounded-full text-xs font-mono cursor-pointer bg-white hover:bg-blue-50 text-black border border-[rgba(37,99,235,0.3)] shadow-2xs mt-2"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <h3 className="text-base sm:text-lg font-bold text-black font-space tracking-tight">
                        Tell me about your project or opportunity
                      </h3>
                      <p className="text-xs text-black/65 font-space mt-0.5">
                        Choose a quick topic or write your message below:
                      </p>

                      {/* Quick Topic Chips */}
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {INQUIRY_TOPICS.map((topic) => {
                          const isSelected = formData.subject === topic;
                          return (
                            <button
                              key={topic}
                              type="button"
                              onClick={() => handleTopicSelect(topic)}
                              className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#2563eb] text-white border-[#2563eb] shadow-2xs font-bold"
                                  : "bg-white/60 hover:bg-white text-black/80 border-[rgba(37,99,235,0.2)] font-medium"
                              }`}
                            >
                              {topic}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Name */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-mono text-black font-bold block">
                            Your Name <span className="text-[#2563eb]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="e.g. Alex Miller"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 focus:bg-white border border-[rgba(37,99,235,0.25)] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 outline-none text-xs sm:text-sm text-black placeholder:text-black/40 transition-all font-sans"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-mono text-black font-bold block">
                            Email Address <span className="text-[#2563eb]">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="alex@company.com"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 focus:bg-white border border-[rgba(37,99,235,0.25)] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 outline-none text-xs sm:text-sm text-black placeholder:text-black/40 transition-all font-sans"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-black font-bold block">
                          Subject / Inquiry Type
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          placeholder="e.g. Distributed System Architecture / Backend Contract"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 focus:bg-white border border-[rgba(37,99,235,0.25)] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 outline-none text-xs sm:text-sm text-black placeholder:text-black/40 transition-all font-sans"
                        />
                      </div>

                      {/* Message */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-black font-bold block">
                          Message <span className="text-[#2563eb]">*</span>
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          placeholder="Briefly describe your project requirements, timeline, or engineering opportunity..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 focus:bg-white border border-[rgba(37,99,235,0.25)] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 outline-none text-xs sm:text-sm text-black placeholder:text-black/40 transition-all resize-none font-sans"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-dark w-full py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-mono tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50 mt-1"
                      >
                        {isSubmitting ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending message...</span>
                          </span>
                        ) : (
                          <>
                            <span>Send Direct Message</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
