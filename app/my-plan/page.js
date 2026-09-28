"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock,
  Flame,
  Trash2,
  Bookmark,
} from "lucide-react";

export default function MyPlan() {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const savedPlan =
      JSON.parse(localStorage.getItem("fitlog-plan")) || [];

    const savedWorkouts =
      JSON.parse(localStorage.getItem("fitlog-saved")) || [];

    const completedWorkouts =
      JSON.parse(localStorage.getItem("fitlog-completed")) || [];

    setPlan(savedPlan);
    setSaved(savedWorkouts);
    setCompleted(completedWorkouts);
  }, []);

  // Remove workout from Today's Plan
  const removeFromPlan = (id) => {
    const updatedPlan = plan.filter(
      (workout) => workout.id !== id
    );

    setPlan(updatedPlan);

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );
  };

  // Remove workout from Saved
  const removeFromSaved = (id) => {
    const updatedSaved = saved.filter(
      (workout) => workout.id !== id
    );

    setSaved(updatedSaved);

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );
  };

  // Mark workout as completed
  const markAsDone = (id) => {
    if (completed.includes(id)) {
      return;
    }

    const updatedCompleted = [...completed, id];

    setCompleted(updatedCompleted);

    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(updatedCompleted)
    );
  };

  // Calculate total minutes
  const totalMinutes = plan.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0
  );

  // Calculate total calories
  const totalCalories = plan.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  return (
    <section className="container py-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[3px] text-[#ccff00]">
          YOUR WORKOUTS
        </p>

        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
          MY PLAN
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Keep track of today's workout and your saved exercises.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Exercises */}
        <div className="rounded-lg border border-[#242830] bg-[#15181e] p-5">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Exercises
          </p>

          <p className="mt-2 text-3xl font-bold">
            {plan.length}
          </p>
        </div>

        {/* Minutes */}
        <div className="rounded-lg border border-[#242830] bg-[#15181e] p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Minutes
            </p>

            <Clock
              size={18}
              className="text-[#ccff00]"
            />
          </div>

          <p className="mt-2 text-3xl font-bold">
            {totalMinutes}
          </p>
        </div>

        {/* Calories */}
        <div className="rounded-lg border border-[#242830] bg-[#15181e] p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Calories
            </p>

            <Flame
              size={18}
              className="text-[#ccff00]"
            />
          </div>

          <p className="mt-2 text-3xl font-bold">
            {totalCalories}
          </p>
        </div>

      </div>

      {/* Today's Plan */}
      <div className="mt-10">

        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              TODAY'S PLAN
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Exercises you added for today.
            </p>
          </div>

          <span className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold text-black">
            {plan.length}
          </span>
        </div>

        {plan.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#30343c] bg-[#15181e] px-6 py-16 text-center">

            <h3 className="text-xl font-bold">
              YOUR PLAN IS EMPTY
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Browse the workout library and add exercises
              to build your plan for today.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-bold text-black hover:bg-white"
            >
              BROWSE WORKOUTS
              <ArrowRight size={15} />
            </Link>

          </div>
        ) : (
          <div className="space-y-3">

            {plan.map((workout) => {

              const isCompleted = completed.includes(
                workout.id
              );

              return (
                <div
                  key={workout.id}
                  className={`flex flex-col gap-4 rounded-lg border bg-[#15181e] p-4 sm:flex-row sm:items-center ${
                    isCompleted
                      ? "border-[#ccff00]/40"
                      : "border-[#242830]"
                  }`}
                >

                  {/* Image */}
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    className="h-24 w-full rounded-md object-cover sm:w-32"
                    width={300}
                    height={300}
                  ></Image>

                  {/* Information */}
                  <div className="flex-1">

                    <div className="flex flex-wrap gap-2">
                      {workout.muscleGroups?.map(
                        (muscle) => (
                          <span
                            key={muscle}
                            className="text-[9px] font-bold text-[#ccff00]"
                          >
                            {muscle.toUpperCase()}
                          </span>
                        )
                      )}
                    </div>

                    <h3 className="mt-1 text-lg font-bold">
                      {workout.name}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        {workout.duration} min
                      </span>

                      <span className="flex items-center gap-1">
                        <Flame size={13} />
                        {workout.caloriesBurned} kcal
                      </span>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">

                    <Link
                      href={`/workout/${workout.id}`}
                      className="flex items-center gap-1 rounded-md border border-[#333] px-3 py-2 text-xs text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]"
                    >
                      View
                      <ArrowRight size={13} />
                    </Link>

                    <button
                      onClick={() =>
                        markAsDone(workout.id)
                      }
                      disabled={isCompleted}
                      className={`flex items-center gap-1 rounded-md px-3 py-2 text-xs font-bold ${
                        isCompleted
                          ? "bg-[#ccff00] text-black"
                          : "border border-[#333] text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]"
                      }`}
                    >
                      <Check size={13} />

                      {isCompleted
                        ? "DONE"
                        : "MARK DONE"}
                    </button>

                    <button
                      onClick={() =>
                        removeFromPlan(workout.id)
                      }
                      className="flex items-center justify-center rounded-md border border-[#333] px-3 py-2 text-gray-400 hover:border-red-500 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* Saved for Later */}
      <div className="mt-12">

        <div className="mb-5 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              SAVED FOR LATER
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Workouts you want to try later.
            </p>
          </div>

          <Bookmark
            size={20}
            className="text-[#ccff00]"
          />

        </div>

        {saved.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#30343c] bg-[#15181e] px-6 py-12 text-center">

            <p className="text-sm text-gray-500">
              You haven't saved any workouts yet.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {saved.map((workout) => (
              <div
                key={workout.id}
                className="overflow-hidden rounded-lg border border-[#242830] bg-[#15181e]"
              >

                <Image
                  src={workout.image}
                  alt={workout.name}
                  className="h-44 w-full object-cover"
                  width={300}
                  height={300}
                ></Image>

                <div className="p-4">

                  <h3 className="font-bold">
                    {workout.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {workout.equipment}
                  </p>

                  <div className="mt-4 flex gap-2">

                    <Link
                      href={`/workout/${workout.id}`}
                      className="flex flex-1 items-center justify-center gap-1 rounded-md bg-[#ccff00] px-3 py-2 text-xs font-bold text-black"
                    >
                      VIEW
                      <ArrowRight size={13} />
                    </Link>

                    <button
                      onClick={() =>
                        removeFromSaved(workout.id)
                      }
                      className="rounded-md border border-[#333] px-3 py-2 text-gray-400 hover:border-red-500 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </section>
  );
}