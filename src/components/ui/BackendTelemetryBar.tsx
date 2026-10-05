"use client";

import React, { useState, useEffect } from "react";
import { Activity, Terminal, Shield, Zap, ChevronUp, ChevronDown, CheckCircle2 } from "lucide-react";
import { gsap } from "@/lib/gsap";

export function BackendTelemetryBar() {
  const [latency, setLatency] = useState(14);
  const [requestCount, setRequestCount] = useState(84920);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [lastPingTime, setLastPingTime] = useState<string>("12ms");

  // Simulate subtle real-time network latency variance
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(12 + Math.random() * 6));
      setRequestCount((prev) => prev + Math.floor(1 + Math.random() * 4));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleTestPing = () => {
    if (isPinging) return;
    setIsPinging(true);

    const start = performance.now();
    // Simulate real network ping round-trip
    setTimeout(() => {
      const duration = Math.round(performance.now() - start + 8);
      setLastPingTime(`${duration}ms`);
      setIsPinging(false);

      // Animate ping pulse effect
      gsap.fromTo(
        "#ping-indicator",
        { scale: 1, boxShadow: "0 0 0 0 rgba(16, 185, 129, 0.9)" },
        { scale: 1.3, boxShadow: "0 0 0 12px rgba(16, 185, 129, 0)", duration: 0.6, repeat: 1, yoyo: true }
      );
    }, 180);
  };

  return (
    <aside
      aria-label="Backend System Telemetry"
      className="fixed bottom-4 left-4 z-40 select-none font-mono transition-all duration-300 pointer-events-auto"
    >
      <div className="rounded-2xl bg-[#eff6ff]/95 backdrop-blur-xl border border-[rgba(37,99,235,0.3)] shadow-[0_8px_30px_rgba(37,99,235,0.18)] overflow-hidden transition-all duration-300 max-w-sm">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-3.5 py-2 bg-[#dbeafe]/80 border-b border-[rgba(37,99,235,0.2)] gap-3">
          <div className="flex items-center gap-2">
            <span
              id="ping-indicator"
              className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"
            />
            <span className="text-[11px] font-bold text-black tracking-tight flex items-center gap-1.5">
              <span>SYSTEM: 200 OK</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                HEALTHY
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-black font-semibold">
              {latency}ms
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-md text-[#2563eb] hover:bg-[#bfdbfe] transition-colors cursor-pointer"
              title={isExpanded ? "Collapse telemetry" : "Expand telemetry metrics"}
            >
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Detailed Metrics Body */}
        {isExpanded && (
          <div className="p-3.5 space-y-2.5 text-[11px] bg-gradient-to-b from-[#eff6ff] to-[#dbeafe]">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-[#dbeafe] border border-[rgba(37,99,235,0.2)]">
                <span className="text-[9px] text-[#2563eb] font-bold uppercase block">
                  Core Runtime
                </span>
                <span className="text-black font-bold text-[10.5px]">
                  NestJS • Go (v1.23)
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[#dbeafe] border border-[rgba(37,99,235,0.2)]">
                <span className="text-[9px] text-[#2563eb] font-bold uppercase block">
                  Datastores
                </span>
                <span className="text-black font-bold text-[10.5px]">
                  PostgreSQL • Redis
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#dbeafe] border border-[rgba(37,99,235,0.2)]">
              <span className="text-[10px] text-black">
                Total Handled Requests:
              </span>
              <span className="font-bold text-[#2563eb] tabular-nums">
                {requestCount.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-[10px] text-black">
                <Shield className="w-3 h-3 text-[#2563eb]" />
                <span>Zero-Trust Architecture</span>
              </div>

              <button
                onClick={handleTestPing}
                disabled={isPinging}
                className="px-2.5 py-1 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[10px] font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <Zap className="w-3 h-3" />
                <span>{isPinging ? "Pinging..." : `Ping API (${lastPingTime})`}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
