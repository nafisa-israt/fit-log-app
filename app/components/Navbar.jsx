"use client";

import Link from "next/link";
import { Activity, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const updateCounts = () => {
    const plan = JSON.parse(localStorage.getItem("fitlog-plan")) || [];
    const saved = JSON.parse(localStorage.getItem("fitlog-saved")) || [];

    setPlanCount(plan.length);
    setSavedCount(saved.length);
  };

  useEffect(() => {
    updateCounts();

    window.addEventListener("storage", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
    };
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <nav className="relative border-b border-[#242830] bg-[#0d0f12]">
      <div className="container flex min-h-[72px] items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2"
        >
          <Activity size={20} className="text-[#ccff00]" />

          <span className="font-bold tracking-wide">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 sm:flex">

          <Link
            href="/"
            className={`text-sm transition ${
              isActive("/")
                ? "font-bold text-[#ccff00]"
                : "text-gray-300 hover:text-[#ccff00]"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`text-sm transition ${
              isActive("/my-plan")
                ? "font-bold text-[#ccff00]"
                : "text-gray-300 hover:text-[#ccff00]"
            }`}
          >
            My Plan
          </Link>

        </div>

        {/* Counters */}
        <div className="hidden items-center gap-2 sm:flex">

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold text-black hover:bg-white"
          >
            PLAN
            <span>{planCount}</span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-[#ccff00] px-3 py-1 text-xs font-bold text-[#ccff00] hover:bg-[#ccff00] hover:text-black"
          >
            SAVED
            <span>{savedCount}</span>
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-[#242830] bg-[#111419] px-5 py-5 sm:hidden">

          <div className="flex flex-col gap-5">

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`text-sm ${
                isActive("/")
                  ? "font-bold text-[#ccff00]"
                  : "text-gray-300"
              }`}
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className={`text-sm ${
                isActive("/my-plan")
                  ? "font-bold text-[#ccff00]"
                  : "text-gray-300"
              }`}
            >
              My Plan
            </Link>

            <div className="flex gap-2 pt-2">

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold text-black"
              >
                PLAN {planCount}
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-[#ccff00] px-3 py-1 text-xs font-bold text-[#ccff00]"
              >
                SAVED {savedCount}
              </Link>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
}