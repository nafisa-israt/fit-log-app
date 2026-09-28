"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Clock,
  Flame,
  Star,
  Check,
  X,
  ArrowRight,
} from "lucide-react";
import Toast from "../components/Toast";

export default function MyPlan() {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [activeTab, setActiveTab] = useState("plan");
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

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
    setLoading(false);
  }, []);

  const showToast = (message) => {
    setToast({
      show: true,
      message: message,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
      });
    }, 2000);
  };

  const removeFromPlan = (id) => {
    const updatedPlan = plan.filter(
      (workout) => workout.id !== id
    );

    setPlan(updatedPlan);

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    // Update navbar counter
    window.dispatchEvent(
      new Event("fitlog-storage")
    );

    showToast("Workout removed from plan");
  };

  const removeFromSaved = (id) => {
    const updatedSaved = saved.filter(
      (workout) => workout.id !== id
    );

    setSaved(updatedSaved);

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    // Update navbar counter
    window.dispatchEvent(
      new Event("fitlog-storage")
    );

    showToast("Workout removed from saved");
  };

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

    showToast("Workout marked as done");
  };

  const totalMinutes = plan.reduce(
    (total, workout) =>
      total + Number(workout.duration || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  return (
    <>
      <section className="container py-10">

        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold tracking-[3px] text-[#ccff00]">
            YOUR WORKOUT LOG
          </p>

          <h1 className="text-4xl font-bold sm:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-md border border-[#242830] bg-[#15181e] p-5">
            <p className="text-xs font-bold tracking-wider text-gray-500">
              EXERCISES
            </p>

            <p className="mt-2 text-3xl font-bold text-[#ccff00]">
              {plan.length}
            </p>
          </div>

          <div className="rounded-md border border-[#242830] bg-[#15181e] p-5">
            <p className="text-xs font-bold tracking-wider text-gray-500">
              MINUTES
            </p>

            <p className="mt-2 text-3xl font-bold text-[#ccff00]">
              {totalMinutes}
            </p>
          </div>

          <div className="rounded-md border border-[#242830] bg-[#15181e] p-5">
            <p className="text-xs font-bold tracking-wider text-gray-500">
              CALORIES
            </p>

            <p className="mt-2 text-3xl font-bold text-[#ccff00]">
              {totalCalories}
            </p>
          </div>

        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-[#242830]">
          <div className="flex gap-6">

            <button
              onClick={() => setActiveTab("plan")}
              className={`relative pb-4 text-sm font-bold ${
                activeTab === "plan"
                  ? "text-[#ccff00]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              TODAY&apos;S PLAN

              {activeTab === "plan" && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#ccff00]"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`relative pb-4 text-sm font-bold ${
                activeTab === "saved"
                  ? "text-[#ccff00]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              SAVED

              {activeTab === "saved" && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#ccff00]"></span>
              )}
            </button>

          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[250px] items-center justify-center rounded-md border border-[#242830] bg-[#15181e]">
            <div className="text-center">

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#ccff00] border-t-transparent"></div>

              <p className="mt-4 text-sm text-gray-500">
                Loading workouts…
              </p>

            </div>
          </div>
        )}

        {/* TODAY'S PLAN TAB */}
        {!loading && activeTab === "plan" && (
          <div>

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  TODAY&apos;S PLAN
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {plan.length} workout
                  {plan.length !== 1 ? "s" : ""}
                </p>
              </div>

              <span className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold text-black">
                {plan.length}/5
              </span>
            </div>

            {/* Empty Plan */}
            {plan.length === 0 && (
              <div className="rounded-md border border-dashed border-[#242830] bg-[#15181e] px-6 py-14 text-center">

                <h3 className="text-2xl font-bold">
                  NOTHING HERE YET
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Browse the library and add a lift to get today moving.
                </p>

                <Link
                  href="/"
                  className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-bold text-black hover:bg-white"
                >
                  GO TO WORKOUTS
                  <ArrowRight size={15} />
                </Link>

              </div>
            )}

            {/* Plan Cards */}
            {plan.length > 0 && (
              <div className="space-y-4">

                {plan.map((workout) => (
                  <div
                    key={workout.id}
                    className="overflow-hidden rounded-md border border-[#242830] bg-[#15181e]"
                  >
                    <div className="flex flex-col sm:flex-row">

                      {/* Image */}
                      <div className="h-48 w-full sm:h-auto sm:w-52">
                        <img
                          src={workout.image}
                          alt={workout.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col justify-between p-5">

                        <div>

                          <div className="mb-2 flex flex-wrap gap-1.5">
                            {workout.muscleGroups?.map(
                              (muscle) => (
                                <span
                                  key={muscle}
                                  className="rounded-full bg-[#ccff00] px-2 py-1 text-[9px] font-bold text-black"
                                >
                                  {muscle.toUpperCase()}
                                </span>
                              )
                            )}
                          </div>

                          <h3 className="text-xl font-bold">
                            {workout.name.toUpperCase()}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            {workout.equipment}
                          </p>

                          <div className="mt-4 flex flex-wrap items-center gap-4 text-[10px] text-gray-400">

                            <span className="flex items-center gap-1">
                              <Clock size={13} />
                              {workout.duration} min
                            </span>

                            <span className="flex items-center gap-1">
                              <Flame size={13} />
                              {workout.caloriesBurned} kcal
                            </span>

                            <span className="flex items-center gap-1">
                              <Star size={13} />
                              {workout.rating}
                            </span>

                          </div>

                        </div>

                        {/* Actions */}
                        <div className="mt-5 flex flex-wrap gap-2">

                          <Link
                            href={`/workout/${workout.id}`}
                            className="rounded-md border border-[#242830] px-4 py-2 text-[10px] font-bold text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]"
                          >
                            VIEW DETAILS
                          </Link>

                          <button
                            onClick={() =>
                              markAsDone(workout.id)
                            }
                            disabled={completed.includes(
                              workout.id
                            )}
                            className={`flex items-center gap-1 rounded-md px-4 py-2 text-[10px] font-bold ${
                              completed.includes(workout.id)
                                ? "cursor-not-allowed bg-[#242830] text-gray-500"
                                : "bg-[#ccff00] text-black hover:bg-white"
                            }`}
                          >
                            <Check size={13} />

                            {completed.includes(workout.id)
                              ? "DONE"
                              : "MARK AS DONE"}
                          </button>

                          <button
                            onClick={() =>
                              removeFromPlan(workout.id)
                            }
                            className="flex items-center gap-1 rounded-md border border-[#242830] px-3 py-2 text-gray-500 hover:border-red-500 hover:text-red-400"
                          >
                            <X size={14} />
                          </button>

                        </div>

                      </div>
                    </div>
                  </div>
                ))}

              </div>
            )}

          </div>
        )}

        {/* SAVED TAB */}
        {!loading && activeTab === "saved" && (
          <div>

            <div className="mb-5">
              <h2 className="text-2xl font-bold">
                SAVED FOR LATER
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Workouts you want to come back to.
              </p>
            </div>

            {/* Empty Saved */}
            {saved.length === 0 && (
              <div className="rounded-md border border-dashed border-[#242830] bg-[#15181e] px-6 py-14 text-center">

                <h3 className="text-2xl font-bold">
                  NOTHING HERE YET
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Save workouts from the details page to see them here.
                </p>

                <Link
                  href="/"
                  className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-bold text-black hover:bg-white"
                >
                  GO TO WORKOUTS
                  <ArrowRight size={15} />
                </Link>

              </div>
            )}

            {/* Saved Cards */}
            {saved.length > 0 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {saved.map((workout) => (
                  <div
                    key={workout.id}
                    className="overflow-hidden rounded-md border border-[#242830] bg-[#15181e]"
                  >

                    <div className="flex">

                      <img
                        src={workout.image}
                        alt={workout.name}
                        className="h-32 w-32 object-cover"
                      />

                      <div className="flex min-w-0 flex-1 flex-col justify-between p-4">

                        <div>

                          <h3 className="truncate text-base font-bold">
                            {workout.name.toUpperCase()}
                          </h3>

                          <p className="mt-1 truncate text-xs text-gray-500">
                            {workout.equipment}
                          </p>

                          <div className="mt-3 flex gap-3 text-[10px] text-gray-400">

                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {workout.duration} min
                            </span>

                            <span className="flex items-center gap-1">
                              <Star size={12} />
                              {workout.rating}
                            </span>

                          </div>

                        </div>

                        <div className="mt-3 flex items-center gap-3">

                          <Link
                            href={`/workout/${workout.id}`}
                            className="text-[10px] font-bold text-[#ccff00] hover:text-white"
                          >
                            VIEW DETAILS
                          </Link>

                          <button
                            onClick={() =>
                              removeFromSaved(workout.id)
                            }
                            className="text-gray-500 hover:text-red-400"
                          >
                            <X size={14} />
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>
        )}

      </section>

      {/* Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
      />
    </>
  );
}