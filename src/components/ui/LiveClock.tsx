"use client";

import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function LiveClock({ showIcon = true }: { showIcon?: boolean }) {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Dhaka (GMT+6)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatted = new Intl.DateTimeFormat("en-US", options).format(now);
      setTimeString(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeString) {
    return (
      <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Dhaka, BD • GMT+6</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
      {showIcon && <Clock className="w-3.5 h-3.5 text-emerald-500" />}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span>Dhaka, BD • {timeString} GMT+6</span>
    </div>
  );
}
