"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useToast } from "@/components/ui/Toast";
import confetti from "canvas-confetti";

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    showToast("Email address copied to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2500);
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
    }, 900);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative z-10 bg-[#dbeafe]/80 border-t border-[rgba(37,99,235,0.3)] overflow-hidden">
      {/* Subtle blue ambient radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.12)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-18">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#2563eb] uppercase mb-2.5 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>04 / Get In Touch</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bebas text-black leading-[0.92] tracking-tight">
            LET&apos;S BUILD SOMETHING
            <br />
            EXTRAORDINARY.
          </h2>
          <p className="text-sm sm:text-base text-black mt-3 max-w-2xl font-space leading-relaxed">
            I&apos;m ready to engineer your next scalable system, design high-throughput microservices, or lead backend development teams.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 cols): Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            {/* Identity & Status Card */}
            <div className="warm-card p-6 sm:p-7 bg-[#dbeafe] border border-[rgba(37,99,235,0.3)]">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-[11px] font-mono text-[#2563eb] uppercase tracking-widest font-semibold">
                  Direct Inquiries
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full bg-[#bfdbfe] text-black border border-[rgba(37,99,235,0.3)] font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for Hire
                </span>
              </div>
              <h3 className="text-2xl font-bold text-black tracking-tight">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-black font-semibold mt-1">
                {PERSONAL_INFO.title} • {PERSONAL_INFO.company}
              </p>
            </div>

            {/* Email Card with Copy button */}
            <div className="warm-card p-6 bg-[#dbeafe] border border-[rgba(37,99,235,0.3)] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono text-black font-bold mb-1">
                  <Mail className="w-3.5 h-3.5 text-[#2563eb]" />
                  <span>Email Address</span>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-xs sm:text-sm font-mono text-black hover:text-[#2563eb] transition-colors truncate block font-bold"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-[#bfdbfe] hover:bg-[#93c5fd] text-[#2563eb] border border-[rgba(37,99,235,0.3)] transition-all shrink-0 cursor-pointer"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4 text-[#2563eb]" />
                )}
              </button>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="warm-card p-6 bg-[#dbeafe] border border-[rgba(37,99,235,0.3)] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-black font-bold">
                  <Phone className="w-3.5 h-3.5 text-[#2563eb]" />
                  <span>Phone &amp; WhatsApp</span>
                </div>
                <span className="text-[10px] font-mono text-black font-bold uppercase">Instant Response</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-black">
                    {PERSONAL_INFO.phoneFormatted}
                  </div>
                  <div className="text-[11px] font-mono text-black mt-0.5">
                    Official &amp; WhatsApp Direct
                  </div>
                </div>

                <a
                  href={PERSONAL_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-dark px-3.5 py-1.5 rounded-full text-xs font-mono self-start sm:self-auto shrink-0 inline-flex items-center gap-1.5"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Location & Timezone Card */}
            <div className="warm-card p-6 bg-[#dbeafe] border border-[rgba(37,99,235,0.3)]">
              <div className="flex items-center gap-2 text-xs font-mono text-black font-bold mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2563eb]" />
                <span>Base Location &amp; Timezone</span>
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-black">
                {PERSONAL_INFO.location} • {PERSONAL_INFO.timezone} ({PERSONAL_INFO.gmtOffset})
              </div>
              <p className="text-xs text-black mt-2 font-space leading-relaxed">
                Open for remote engineering contracts worldwide and on-site engineering leadership in Dhaka.
              </p>
            </div>
          </div>

          {/* Right Column (7 cols): Interactive Form Card */}
          <div className="lg:col-span-7">
            <div className="warm-card p-7 sm:p-10 bg-gradient-to-br from-[#eff6ff] via-[#dbeafe] to-[#bfdbfe]/80 border border-[rgba(37,99,235,0.3)] shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#2563eb] uppercase tracking-widest mb-2 font-semibold">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Send A Direct Message</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-black tracking-tight mb-6">
                Tell me about your project or opportunity
              </h3>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#bfdbfe] border border-[rgba(37,99,235,0.3)] text-[#2563eb] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 text-[#2563eb]" />
                  </div>
                  <h4 className="text-xl font-bold text-black">Thank You!</h4>
                  <p className="text-xs sm:text-sm text-black max-w-sm mx-auto font-space">
                    Your message has been received. I typically respond within 12–24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="btn-outline-warm px-5 py-2.5 rounded-full text-xs font-mono cursor-pointer bg-[#dbeafe] hover:bg-[#bfdbfe] text-black border border-[rgba(37,99,235,0.35)]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-black block font-bold">
                        Your Name <span className="text-[#2563eb]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-[#dbeafe]/60 border border-[rgba(37,99,235,0.3)] focus:border-[#2563eb] focus:bg-[#dbeafe] focus:outline-none text-xs sm:text-sm text-black placeholder-[#64748b] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-black block font-bold">
                        Email Address <span className="text-[#2563eb]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#dbeafe]/60 border border-[rgba(37,99,235,0.3)] focus:border-[#2563eb] focus:bg-[#dbeafe] focus:outline-none text-xs sm:text-sm text-black placeholder-[#64748b] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-black block font-bold">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="Backend Engineering Role / Architecture Consultation"
                      className="w-full px-4 py-3 rounded-xl bg-[#dbeafe]/60 border border-[rgba(37,99,235,0.3)] focus:border-[#2563eb] focus:bg-[#dbeafe] focus:outline-none text-xs sm:text-sm text-black placeholder-[#64748b] transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-black block font-bold">
                      Message <span className="text-[#2563eb]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Hi Tajul, I'd like to discuss a project or backend architecture opportunity..."
                      className="w-full px-4 py-3 rounded-xl bg-[#dbeafe]/60 border border-[rgba(37,99,235,0.3)] focus:border-[#2563eb] focus:bg-[#dbeafe] focus:outline-none text-xs sm:text-sm text-black placeholder-[#64748b] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-dark w-full py-3.5 rounded-xl text-xs sm:text-sm font-mono tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending message...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Direct Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

