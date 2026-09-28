"use client";

import { Check } from "lucide-react";

export default function Toast({ message, show }) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-md border border-[#ccff00]/30 bg-[#15181e] px-4 py-3 shadow-lg">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ccff00]">
        <Check size={15} className="text-black" />
      </div>

      <p className="text-sm text-gray-200">
        {message}
      </p>
    </div>
  );
}