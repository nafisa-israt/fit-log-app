import { Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#242830] bg-[#0a0c0f]">
      <div className="container flex min-h-[90px] flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        
        <div className="flex items-center gap-2">
          <Activity size={18} color="#ccff00" />

          <span className="font-bold">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </div>

        <p className="text-center text-xs text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}