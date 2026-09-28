"use client";

import Link from "next/link";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const plan = JSON.parse(localStorage.getItem("fitlog-plan")) || [];
      const saved = JSON.parse(localStorage.getItem("fitlog-saved")) || [];

      setPlanCount(plan.length);
      setSavedCount(saved.length);
    };

    updateCounts();

    window.addEventListener("storage", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
    };
  }, []);

  return (
    <nav className="border-b border-[#242830] bg-[#0d0f12]">
      <div className="container flex min-h-[72px] items-center justify-between gap-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Activity size={20} color="#ccff00" />

          <span className="font-bold tracking-wide">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 sm:flex">
          <Link
            href="/"
            className="text-sm text-gray-300 hover:text-[#ccff00]"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="text-sm text-gray-300 hover:text-[#ccff00]"
          >
            My Plan
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold text-black"
          >
            Plan {planCount}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-[#444] px-3 py-1 text-xs text-gray-300"
          >
            Saved {savedCount}
          </Link>
        </div>
      </div>
    </nav>
  );
}