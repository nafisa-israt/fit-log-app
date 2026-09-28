"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">

      <p className="text-7xl font-bold text-[#ccff00]">
        404
      </p>

      <h1 className="mt-4 text-3xl font-bold">
        WORKOUT NOT FOUND
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
        The workout you are looking for doesn't exist
        or the page may have been removed.
      </p>

      <button
        onClick={() => router.push("/")}
        className="mt-7 flex items-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-bold text-black hover:bg-white"
      >
        <ArrowLeft size={15} />
        BACK TO WORKOUTS
      </button>

    </div>
  );
}