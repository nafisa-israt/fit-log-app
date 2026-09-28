"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import WorkoutCard from "./components/WorkoutCard";
import { ChevronDown } from "lucide-react";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((response) => response.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    return a[sortBy] - b[sortBy];
  });

  return (
    <>
      <Hero />

      <section id="library" className="container py-8">
        
        {/* Heading */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold">
              THE LIBRARY
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort */}
          <div className="relative w-fit">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-md border border-[#242830] bg-[#15181e] py-2 pl-4 pr-10 text-xs text-gray-300 outline-none"
            >
              <option value="duration">Duration</option>
              <option value="caloriesBurned">Calories</option>
              <option value="rating">Rating</option>
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ccff00] border-t-transparent"></div>
          </div>
        )}

        {/* Cards */}
        {!loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}