"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "@/lib/gsap";

interface SystemPreloaderProps {
  onComplete?: () => void;
}

// PM2 startup log sequence directly matching user's server screenshot
const PM2_LOGS = [
  { name: "menu-auth", id: 13 },
  { name: "menu-admin", id: 14 },
  { name: "menu-application", id: 15 },
  { name: "menu-ai", id: 16 },
  { name: "menu-gateway", id: 17 },
  { name: "gueloprboy-backend", id: 18 },
  { name: "sstewarti-backend", id: 19 },
  { name: "sstewarti_dashboard", id: 20 },
  { name: "zvonsystem-backend", id: 21 },
  { name: "zvonsystem-frontend", id: 22 },
  { name: "mindunite", id: 23 },
  { name: "noeldslv-backend", id: 24 },
  { name: "amar-khoroch-backend", id: 25 },
  { name: "mayogo-backend", id: 30 },
  { name: "amar-khoroch-frontend", id: 29 },
  { name: "keynote-backend", id: 31 },
];

// PM2 process table items directly from user's live server screenshot
const PM2_TABLE_ROWS = [
  { id: 9, name: "abbasfassaei", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639655", uptime: "4s", restart: 7, status: "online", cpu: "0%", mem: "99.8mb", user: "root", watching: "disabled" },
  { id: 25, name: "amar-khoroch-backend", namespace: "default", version: "1.0.0", mode: "fork", pid: "2639888", uptime: "1s", restart: 3, status: "online", cpu: "0%", mem: "44.9mb", user: "root", watching: "disabled" },
  { id: 29, name: "amar-khoroch-frontend", namespace: "default", version: "N/A", mode: "fork", pid: "2639957", uptime: "0s", restart: 123, status: "online", cpu: "0%", mem: "32.1mb", user: "root", watching: "disabled" },
  { id: 4, name: "amazinge719_backend", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639593", uptime: "5s", restart: 7, status: "online", cpu: "0%", mem: "130.2mb", user: "root", watching: "disabled" },
  { id: 2, name: "flutter_task", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639596", uptime: "5s", restart: 7, status: "online", cpu: "0%", mem: "110.1mb", user: "root", watching: "disabled" },
  { id: 18, name: "gueloprboy-backend", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639761", uptime: "3s", restart: 7, status: "online", cpu: "0%", mem: "91.0mb", user: "root", watching: "disabled" },
  { id: 0, name: "jwells", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639552", uptime: "5s", restart: 7, status: "online", cpu: "0%", mem: "108.6mb", user: "root", watching: "disabled" },
  { id: 3, name: "kaisouaret", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639572", uptime: "5s", restart: 7, status: "online", cpu: "0%", mem: "101.8mb", user: "root", watching: "disabled" },
  { id: 31, name: "keynote-backend", namespace: "default", version: "1.0.0", mode: "fork", pid: "2639968", uptime: "0s", restart: 1, status: "online", cpu: "0%", mem: "8.2mb", user: "root", watching: "disabled" },
  { id: 6, name: "limitless", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639630", uptime: "4s", restart: 8, status: "online", cpu: "0%", mem: "95.6mb", user: "root", watching: "disabled" },
  { id: 5, name: "matthewmoec_backend", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639596", uptime: "5s", restart: 7, status: "online", cpu: "0%", mem: "100.8mb", user: "root", watching: "disabled" },
  { id: 30, name: "mayogo-backend", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639910", uptime: "0s", restart: 3, status: "online", cpu: "0%", mem: "32.8mb", user: "root", watching: "disabled" },
  { id: 14, name: "menu-admin", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639708", uptime: "4s", restart: 7, status: "online", cpu: "0%", mem: "118.6mb", user: "root", watching: "disabled" },
  { id: 16, name: "menu-ai", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639741", uptime: "4s", restart: 7, status: "online", cpu: "0%", mem: "117.7mb", user: "root", watching: "disabled" },
  { id: 15, name: "menu-application", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639727", uptime: "4s", restart: 7, status: "online", cpu: "0%", mem: "122.0mb", user: "root", watching: "disabled" },
  { id: 13, name: "menu-auth", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639681", uptime: "4s", restart: 7, status: "online", cpu: "0%", mem: "126.4mb", user: "root", watching: "disabled" },
  { id: 17, name: "menu-gateway", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639743", uptime: "3s", restart: 7, status: "online", cpu: "0%", mem: "99.9mb", user: "root", watching: "disabled" },
  { id: 23, name: "mindunite", namespace: "default", version: "N/A", mode: "fork", pid: "2639860", uptime: "1s", restart: 34, status: "online", cpu: "0%", mem: "73.3mb", user: "root", watching: "disabled" },
  { id: 24, name: "noeldslv-backend", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639866", uptime: "1s", restart: 7, status: "online", cpu: "0%", mem: "63.8mb", user: "root", watching: "disabled" },
  { id: 8, name: "ptgeorge-backend", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639642", uptime: "4s", restart: 7, status: "online", cpu: "0%", mem: "93.6mb", user: "root", watching: "disabled" },
  { id: 7, name: "sparmat", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639621", uptime: "4s", restart: 26, status: "online", cpu: "0%", mem: "102.3mb", user: "root", watching: "disabled" },
  { id: 19, name: "sstewarti-backend", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639790", uptime: "2s", restart: 8, status: "online", cpu: "0%", mem: "77.7mb", user: "root", watching: "disabled" },
  { id: 20, name: "sstewarti_dashboard", namespace: "default", version: "N/A", mode: "fork", pid: "2639792", uptime: "2s", restart: 7, status: "online", cpu: "0%", mem: "72.8mb", user: "root", watching: "disabled" },
  { id: 1, name: "streamly", namespace: "default", version: "1.0.0", mode: "fork", pid: "2639575", uptime: "5s", restart: 7, status: "online", cpu: "0%", mem: "114.6mb", user: "root", watching: "disabled" },
  { id: 10, name: "teojunping-backend", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639668", uptime: "4s", restart: 7, status: "online", cpu: "0%", mem: "99.7mb", user: "root", watching: "disabled" },
  { id: 11, name: "unit-backend", namespace: "default", version: "0.0.1", mode: "fork", pid: "2639672", uptime: "4s", restart: 7, status: "online", cpu: "0%", mem: "93.5mb", user: "root", watching: "disabled" },
  { id: 21, name: "zvonsystem-backend", namespace: "default", version: "N/A", mode: "fork", pid: "2639824", uptime: "2s", restart: 7, status: "online", cpu: "0%", mem: "72.4mb", user: "root", watching: "disabled" },
  { id: 22, name: "zvonsystem-frontend", namespace: "default", version: "N/A", mode: "fork", pid: "2639852", uptime: "1s", restart: 7, status: "online", cpu: "0%", mem: "68.9mb", user: "root", watching: "disabled" },
];

// Generate glass shard pieces across a 6x5 grid
function generateGlassShards() {
  const shards = [];
  const rows = 5;
  const cols = 6;
  const cellW = 100 / cols;
  const cellH = 100 / rows;

  let id = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cellW;
      const y = r * cellH;

      const p1 = `${Math.random() * 20}% ${Math.random() * 20}%`;
      const p2 = `${80 + Math.random() * 20}% ${Math.random() * 20}%`;
      const p3 = `${80 + Math.random() * 20}% ${80 + Math.random() * 20}%`;
      const p4 = `${Math.random() * 20}% ${80 + Math.random() * 20}%`;

      const cx = x + cellW / 2;
      const cy = y + cellH / 2;
      const angle = Math.atan2(cy - 50, cx - 50);

      shards.push({
        id: id++,
        left: x,
        top: y,
        width: cellW,
        height: cellH,
        clipPath: `polygon(${p1}, ${p2}, ${p3}, ${p4})`,
        angle,
      });
    }
  }
  return shards;
}

export function SystemPreloader({ onComplete }: SystemPreloaderProps) {
  // Stream states
  const [visibleLogsCount, setVisibleLogsCount] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [visibleRowsCount, setVisibleRowsCount] = useState(0);
  const [cpuUsage, setCpuUsage] = useState("8.8%");
  const [ramUsage, setRamUsage] = useState("20.3%");
  const [isShattered, setIsShattered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const terminalScrollRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);
  const crackLinesRef = useRef<SVGSVGElement>(null);
  const shardsContainerRef = useRef<HTMLDivElement>(null);

  const shards = useMemo(() => generateGlassShards(), []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // 1. Rapid Typewriter / Streaming Logs (code typing effect)
  useEffect(() => {
    // Stream top logs 1 by 1 rapidly
    const logInterval = setInterval(() => {
      setVisibleLogsCount((prev) => {
        if (prev < PM2_LOGS.length) {
          return prev + 1;
        } else {
          clearInterval(logInterval);
          setShowTable(true);
          return prev;
        }
      });
    }, 45); // 45ms per log = ~700ms total for all logs

    return () => clearInterval(logInterval);
  }, []);

  // 2. Cascade Table Rows once logs finish
  useEffect(() => {
    if (!showTable) return;

    const rowInterval = setInterval(() => {
      setVisibleRowsCount((prev) => {
        if (prev < PM2_TABLE_ROWS.length) {
          return prev + 4; // rapid chunk render
        } else {
          clearInterval(rowInterval);
          return PM2_TABLE_ROWS.length;
        }
      });
    }, 35);

    return () => clearInterval(rowInterval);
  }, [showTable]);

  // 3. Dynamic fluctuation for bottom host metrics
  useEffect(() => {
    const metricInterval = setInterval(() => {
      setCpuUsage((8.2 + Math.random() * 1.8).toFixed(1) + "%");
      setRamUsage((20.1 + Math.random() * 0.6).toFixed(1) + "%");
    }, 500);

    return () => clearInterval(metricInterval);
  }, []);

  // 4. Auto-dismiss after 2.8 seconds ("2/3 second thakbe pore cole jabe")
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerExit();
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  // 5. Enter key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !isShattered) {
        triggerExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isShattered]);

  // 6. Glass shatter & smooth terminal exit explosion
  const triggerExit = () => {
    if (isShattered) return;
    setIsShattered(true);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        if (onComplete) onComplete();
      },
    });

    // Flash cracks
    if (crackLinesRef.current) {
      tl.set(crackLinesRef.current, { opacity: 1, scale: 1 });
    }

    // Shockwave burst
    if (shockwaveRef.current) {
      tl.fromTo(
        shockwaveRef.current,
        { scale: 0.1, opacity: 1 },
        { scale: 35, opacity: 0, duration: 0.65, ease: "power2.out" },
        0
      );
    }

    // Terminal stage fade & scale
    if (stageRef.current) {
      tl.to(
        stageRef.current,
        { opacity: 0, scale: 0.95, duration: 0.2, ease: "power1.in" },
        0.05
      );
    }

    // 3D Glass shards explosion outwards radially
    if (shardsContainerRef.current) {
      tl.set(shardsContainerRef.current, { opacity: 1 }, 0.05);

      const shardElements = shardsContainerRef.current.children;
      Array.from(shardElements).forEach((el, idx) => {
        const shardData = shards[idx];
        const dist = 600 + Math.random() * 800;
        const targetX = Math.cos(shardData.angle) * dist;
        const targetY = Math.sin(shardData.angle) * dist;

        tl.to(
          el,
          {
            x: targetX,
            y: targetY,
            z: Math.random() * 450,
            rotationX: (Math.random() - 0.5) * 600,
            rotationY: (Math.random() - 0.5) * 600,
            rotationZ: (Math.random() - 0.5) * 720,
            scale: 0.1,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          0.05
        );
      });
    }

    // Final container fade
    if (containerRef.current) {
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
        },
        "-=0.25"
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col bg-black text-[#d1d5db] font-mono select-none overflow-hidden text-[11px] sm:text-[12px] md:text-[13px] leading-tight"
      aria-label="PM2 Terminal Booting Screen"
    >
      {/* Subtle CRT Scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-40" />

      {/* Top Header / Skip Button */}
      <div className="relative z-30 flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#0c0d12]/95 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span className="ml-2 text-xs text-white/60 tracking-wider font-semibold">
            root@tajul-production-server:~# pm2 status
          </span>
        </div>
        <button
          onClick={triggerExit}
          className="px-3 py-1 rounded border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-[11px] font-mono tracking-wider transition-all cursor-pointer font-bold"
        >
          SKIP [↵]
        </button>
      </div>

      {/* Main Terminal Screen */}
      <div
        ref={stageRef}
        className="relative z-10 flex-1 p-3 sm:p-5 overflow-auto flex flex-col justify-start"
      >
        {/* TOP LOGS (Streaming PM2 startup sequence) */}
        <div className="space-y-[1px] mb-3">
          {PM2_LOGS.slice(0, visibleLogsCount).map((log) => (
            <div key={log.name} className="flex items-center gap-1.5 font-mono">
              <span className="text-[#22c55e] font-semibold">[PM2]</span>
              <span className="text-white/90">[{log.name}]({log.id})</span>
              <span className="text-[#22c55e] font-bold">✓</span>
            </div>
          ))}
          {visibleLogsCount < PM2_LOGS.length && (
            <div className="text-white/40 flex items-center gap-1">
              <span>[PM2] spawning process...</span>
              <span className="inline-block w-2 h-3.5 bg-emerald-400 animate-pulse" />
            </div>
          )}
        </div>

        {/* PM2 STATUS TABLE */}
        {showTable && (
          <div className="overflow-x-auto my-2 border border-[#38bdf8]/40 rounded bg-black/60 shadow-[0_0_20px_rgba(56,189,248,0.1)]">
            <table className="w-full text-left border-collapse min-w-[780px]">
              <thead>
                <tr className="border-b border-[#38bdf8]/40 text-[#38bdf8] text-[11px] uppercase tracking-wide bg-[#0f172a]/70">
                  <th className="py-1 px-2 border-r border-[#38bdf8]/40 font-bold">id</th>
                  <th className="py-1 px-3 border-r border-[#38bdf8]/40 font-bold">name</th>
                  <th className="py-1 px-2 border-r border-[#38bdf8]/40 font-bold">namespace</th>
                  <th className="py-1 px-2 border-r border-[#38bdf8]/40 font-bold">version</th>
                  <th className="py-1 px-2 border-r border-[#38bdf8]/40 font-bold">mode</th>
                  <th className="py-1 px-2 border-r border-[#38bdf8]/40 font-bold">pid</th>
                  <th className="py-1 px-2 border-r border-[#38bdf8]/40 font-bold">uptime</th>
                  <th className="py-1 px-2 border-r border-[#38bdf8]/40 font-bold text-center">↺</th>
                  <th className="py-1 px-3 border-r border-[#38bdf8]/40 font-bold text-center">status</th>
                  <th className="py-1 px-2 border-r border-[#38bdf8]/40 font-bold text-right">cpu</th>
                  <th className="py-1 px-2 border-r border-[#38bdf8]/40 font-bold text-right">mem</th>
                  <th className="py-1 px-2 border-r border-[#38bdf8]/40 font-bold">user</th>
                  <th className="py-1 px-2 font-bold">watching</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#38bdf8]/20 font-mono text-[11px]">
                {PM2_TABLE_ROWS.slice(0, visibleRowsCount).map((row) => (
                  <tr
                    key={row.name}
                    className="hover:bg-white/5 transition-colors leading-none"
                  >
                    <td className="py-1 px-2 border-r border-[#38bdf8]/30 text-white/70">
                      {row.id}
                    </td>
                    <td className="py-1 px-3 border-r border-[#38bdf8]/30 text-white font-medium">
                      {row.name}
                    </td>
                    <td className="py-1 px-2 border-r border-[#38bdf8]/30 text-white/60">
                      {row.namespace}
                    </td>
                    <td className="py-1 px-2 border-r border-[#38bdf8]/30 text-white/60">
                      {row.version}
                    </td>
                    <td className="py-1 px-2 border-r border-[#38bdf8]/30 text-white/60">
                      {row.mode}
                    </td>
                    <td className="py-1 px-2 border-r border-[#38bdf8]/30 text-white/60">
                      {row.pid}
                    </td>
                    <td className="py-1 px-2 border-r border-[#38bdf8]/30 text-white/60">
                      {row.uptime}
                    </td>
                    <td className="py-1 px-2 border-r border-[#38bdf8]/30 text-center text-white/60">
                      {row.restart}
                    </td>
                    <td className="py-1 px-3 border-r border-[#38bdf8]/30 text-center font-bold text-[#22c55e]">
                      {row.status}
                    </td>
                    <td className="py-1 px-2 border-r border-[#38bdf8]/30 text-right text-white/70">
                      {row.cpu}
                    </td>
                    <td className="py-1 px-2 border-r border-[#38bdf8]/30 text-right text-white/70">
                      {row.mem}
                    </td>
                    <td className="py-1 px-2 border-r border-[#38bdf8]/30 text-white/60">
                      {row.user}
                    </td>
                    <td className="py-1 px-2 text-white/50">
                      {row.watching}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* BOTTOM HOST METRICS LINE (Exact match from screenshot) */}
        <div className="mt-3 pt-2 text-[10px] sm:text-[11px] font-mono leading-relaxed border-t border-white/10">
          <div className="flex flex-wrap items-center gap-x-2 text-white/80">
            <span className="text-[#38bdf8] font-bold">Host metrics</span>
            <span className="text-white/40">│</span>
            <span className="text-white/90">cpu: <span className="text-[#22c55e] font-semibold">{cpuUsage}</span></span>
            <span className="text-white/40">│</span>
            <span className="text-white/90">ram usage: <span className="text-[#22c55e] font-semibold">{ramUsage}</span></span>
            <span className="text-white/40">│</span>
            <span className="text-white/80">lo: <span className="text-[#22c55e]">⇓ 0.01mb/s</span> <span className="text-[#38bdf8]">⇑ 0.01mb/s</span></span>
            <span className="text-white/40">│</span>
            <span className="text-white/80">eth0: <span className="text-[#22c55e]">⇓ 0mb/s</span> <span className="text-[#38bdf8]">⇑ 0.001mb/s</span></span>
            <span className="text-white/40">│</span>
            <span className="text-white/80">br-78fd123c2334: <span className="text-[#22c55e]">⇓ 0.001mb/s</span> <span className="text-[#38bdf8]">⇑ 0.005mb/s</span></span>
            <span className="text-white/40">│</span>
            <span className="text-white/80">vethaf586b: <span className="text-[#22c55e]">⇓ 0.001mb/s</span> <span className="text-[#38bdf8]">⇑ 0.005mb/s</span></span>
            <span className="text-white/40">│</span>
            <span className="text-white/80">disk: <span className="text-[#22c55e]">⇓ 0.123mb/s</span> <span className="text-[#38bdf8]">⇑ 0.365mb/s</span></span>
            <span className="text-white/40">│</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-[#22c55e]">
            <span>mb/s │</span>
            <span className="inline-block w-2.5 h-4 bg-white animate-pulse" />
          </div>
        </div>
      </div>

      {/* --- GLASS SHATTER EXPLOSION OVERLAYS --- */}

      {/* 1. Center Shockwave Burst */}
      <div
        ref={shockwaveRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-4 border-emerald-400 bg-white shadow-[0_0_120px_60px_rgba(52,211,153,0.9)] pointer-events-none opacity-0 z-50 will-change-transform"
      />

      {/* 2. Radial Glass Spiderweb Cracks */}
      <svg
        ref={crackLinesRef}
        viewBox="0 0 1000 1000"
        className="absolute inset-0 w-full h-full pointer-events-none z-45 opacity-0 overflow-visible"
      >
        <path
          d="M 500 500 L 400 350 L 320 280 L 150 200 M 500 500 L 620 380 L 750 300 L 920 180 M 500 500 L 680 520 L 850 560 L 980 580 M 500 500 L 600 680 L 720 820 L 850 960 M 500 500 L 420 660 L 300 800 L 120 950 M 500 500 L 320 540 L 180 520 L 20 510 M 400 350 L 620 380 M 620 380 L 680 520 M 680 520 L 600 680 M 600 680 L 420 660 L 420 660 L 320 540 L 320 540 L 400 350"
          fill="none"
          stroke="rgba(255, 255, 255, 0.95)"
          strokeWidth="3.5"
          filter="drop-shadow(0 0 10px rgba(52,211,153,0.9))"
        />
      </svg>

      {/* 3. 30+ 3D Glass Shards that Explode Outward in 360 Degrees */}
      <div
        ref={shardsContainerRef}
        className="absolute inset-0 pointer-events-none opacity-0 z-40 overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {shards.map((shard) => (
          <div
            key={shard.id}
            className="absolute backdrop-blur-md bg-gradient-to-br from-white/70 via-[#0f172a]/90 to-black/95 border border-[#38bdf8]/60 shadow-[0_0_20px_rgba(56,189,248,0.5)] will-change-transform"
            style={{
              left: `${shard.left}%`,
              top: `${shard.top}%`,
              width: `${shard.width}%`,
              height: `${shard.height}%`,
              clipPath: shard.clipPath,
            }}
          />
        ))}
      </div>
    </div>
  );
}
