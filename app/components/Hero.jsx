import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="container py-8">
      <div className="grid overflow-hidden rounded-lg border border-[#242830] bg-[#15181e] md:grid-cols-2">
        
        {/* Left */}
        <div className="flex flex-col justify-center p-7 sm:p-10">
          <p className="mb-4 text-xs font-bold tracking-[3px] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-[500px] text-4xl font-bold leading-[1.05] sm:text-5xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-5 max-w-[500px] text-sm leading-6 text-gray-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today's plan, and watch the week's work add up.
          </p>

          <Link
            href="#library"
            className="mt-6 flex w-fit items-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-bold text-black hover:bg-white"
          >
            BROWSE WORKOUTS
            <ArrowDownRight size={16} />
          </Link>
        </div>

        {/* Right image */}
        <div className="min-h-70">
          { <Image
            src="/banner.png"
            alt="Banner"
            width={334}
            height={334}
            className="h-full min-h-70 w-full object-cover"
          ></Image>}
        </div>
      </div>
    </section>
  );
}