"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Flame,
  Star,
  Plus,
  Bookmark,
  Check,
} from "lucide-react";
import Image from "next/image";
import Toast from "../../components/Toast";

export default function WorkoutDetails() {
  const params = useParams();
  const router = useRouter();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isAdded, setIsAdded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [planFull, setPlanFull] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    if (!params.id) return;

    fetch(`https://api.abcz.workers.dev/api/fitlog/${params.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Workout not found");
        }

        return response.json();
      })
      .then((data) => {
        setWorkout(data);
        setLoading(false);

        const plan =
          JSON.parse(localStorage.getItem("fitlog-plan")) || [];

        const saved =
          JSON.parse(localStorage.getItem("fitlog-saved")) || [];

        setIsAdded(
          plan.some((item) => item.id === data.id)
        );

        setIsSaved(
          saved.some((item) => item.id === data.id)
        );

        setPlanFull(plan.length >= 5);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [params.id]);

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

  const handleAddToPlan = () => {
    const plan =
      JSON.parse(localStorage.getItem("fitlog-plan")) || [];

    // Check if this workout is already added
    if (plan.some((item) => item.id === workout.id)) {
      setIsAdded(true);
      return;
    }

    // Maximum 5 workouts
    if (plan.length >= 5) {
      setPlanFull(true);
      showToast("Today's plan is full (5 workouts)");
      return;
    }

    const updatedPlan = [...plan, workout];

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    setIsAdded(true);

    // If this was the 5th workout, mark plan as full
    setPlanFull(updatedPlan.length >= 5);

    // Update navbar counter instantly
    window.dispatchEvent(
      new Event("fitlog-storage")
    );

    showToast("Added to today's plan");
  };

  const handleSave = () => {
    const saved =
      JSON.parse(localStorage.getItem("fitlog-saved")) || [];

    // Check if already saved
    if (saved.some((item) => item.id === workout.id)) {
      setIsSaved(true);
      return;
    }

    const updatedSaved = [...saved, workout];

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    setIsSaved(true);

    // Update navbar counter instantly
    window.dispatchEvent(
      new Event("fitlog-storage")
    );

    showToast("Saved for later");
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#ccff00] border-t-transparent"></div>

          <p className="mt-4 text-sm text-gray-500">
            LOADING...
          </p>
        </div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="text-6xl font-bold text-[#ccff00]">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold">
          WORKOUT NOT FOUND
        </h1>

        <button
          onClick={() => router.push("/")}
          className="mt-6 flex items-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-bold text-black hover:bg-white"
        >
          <ArrowLeft size={15} />
          BACK TO WORKOUTS
        </button>
      </div>
    );
  }

  return (
    <>
      <section className="container py-10">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-7 flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#ccff00]"
        >
          <ArrowLeft size={15} />
          BACK
        </button>

        {/* Main details */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="overflow-hidden rounded-md border border-[#242830] bg-[#15181e]">
            <Image
              src={workout.image}
              alt={workout.name}
              className="h-full min-h-[320px] w-full object-cover"
              width={300}
              height={300}
            ></Image>
          </div>

          {/* Information */}
          <div className="flex flex-col justify-center">
            {/* Muscle groups */}
            <div className="mb-4 flex flex-wrap gap-2">
              {workout.muscleGroups?.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-bold text-black"
                >
                  {muscle.toUpperCase()}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              {workout.name.toUpperCase()}
            </h1>

            {/* Equipment */}
            <p className="mt-2 text-sm text-gray-500">
              {workout.equipment}
            </p>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-md border border-[#242830] bg-[#15181e] p-4">
                <Clock
                  size={17}
                  className="text-[#ccff00]"
                />

                <p className="mt-2 text-lg font-bold">
                  {workout.duration}
                </p>

                <p className="text-[10px] text-gray-500">
                  MINUTES
                </p>
              </div>

              <div className="rounded-md border border-[#242830] bg-[#15181e] p-4">
                <Flame
                  size={17}
                  className="text-[#ccff00]"
                />

                <p className="mt-2 text-lg font-bold">
                  {workout.caloriesBurned}
                </p>

                <p className="text-[10px] text-gray-500">
                  KCAL
                </p>
              </div>

              <div className="rounded-md border border-[#242830] bg-[#15181e] p-4">
                <Star
                  size={17}
                  className="text-[#ccff00]"
                />

                <p className="mt-2 text-lg font-bold">
                  {workout.rating}
                </p>

                <p className="text-[10px] text-gray-500">
                  RATING
                </p>
              </div>
            </div>

            {/* Workout specs */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-md border border-[#242830] p-4">
                <p className="text-[10px] text-gray-500">
                  EQUIPMENT
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {workout.equipment}
                </p>
              </div>

              <div className="rounded-md border border-[#242830] p-4">
                <p className="text-[10px] text-gray-500">
                  DIFFICULTY
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {workout.difficulty}
                </p>
              </div>

              <div className="rounded-md border border-[#242830] p-4">
                <p className="text-[10px] text-gray-500">
                  SETS
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {workout.sets}
                </p>
              </div>

              <div className="rounded-md border border-[#242830] p-4">
                <p className="text-[10px] text-gray-500">
                  REPS
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {workout.reps}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex gap-3">
              <button
                onClick={handleAddToPlan}
                disabled={isAdded || planFull}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold ${
                  isAdded || planFull
                    ? "cursor-not-allowed bg-[#242830] text-gray-500"
                    : "bg-[#ccff00] text-black hover:bg-white"
                }`}
              >
                {isAdded ? (
                  <Check size={17} />
                ) : (
                  <Plus size={17} />
                )}

                {isAdded
                  ? "ADDED TO PLAN"
                  : planFull
                  ? "PLAN FULL"
                  : "ADD TO PLAN"}
              </button>

              <button
                onClick={handleSave}
                className={`flex items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-bold ${
                  isSaved
                    ? "border-[#ccff00] text-[#ccff00]"
                    : "border-[#242830] text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]"
                }`}
              >
                <Bookmark size={17} />

                {isSaved ? "SAVED" : "SAVE"}
              </button>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold">
                ABOUT THIS WORKOUT
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                {workout.description}
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 border-t border-[#242830] pt-10">
          <h2 className="text-3xl font-bold">
            HOW TO DO IT
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {workout.instructions?.map((instruction, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-md border border-[#242830] bg-[#15181e] p-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-sm font-bold text-black">
                  {index + 1}
                </div>

                <p className="text-sm leading-6 text-gray-400">
                  {instruction}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
      />
    </>
  );
}