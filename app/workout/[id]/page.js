"use client";
import Image from "next/image";
import Toast from "../../components/Toast";
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

export default function WorkoutDetails() {
  const params = useParams();
  const router = useRouter();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isAdded, setIsAdded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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

        // Check localStorage
        const plan =
          JSON.parse(localStorage.getItem("fitlog-plan")) || [];

        const saved =
          JSON.parse(localStorage.getItem("fitlog-saved")) || [];

        const alreadyAdded = plan.some(
          (item) => item.id === data.id
        );

        const alreadySaved = saved.some(
          (item) => item.id === data.id
        );

        setIsAdded(alreadyAdded);
        setIsSaved(alreadySaved);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [params.id]);

  // Add to Today's Plan
  const handleAddToPlan = () => {
    const plan =
      JSON.parse(localStorage.getItem("fitlog-plan")) || [];

    const alreadyExists = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyExists) {
      setIsAdded(true);
      return;
    }

    const updatedPlan = [...plan, workout];

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    setIsAdded(true);
  };

  // Save for Later
  const handleSave = () => {
    const saved =
      JSON.parse(localStorage.getItem("fitlog-saved")) || [];

    const alreadyExists = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadyExists) {
      setIsSaved(true);
      return;
    }

    const updatedSaved = [...saved, workout];

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    setIsSaved(true);
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#ccff00] border-t-transparent"></div>
      </div>
    );
  }

  // If workout doesn't exist
  if (!workout) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">
          WORKOUT NOT FOUND
        </h1>

        <p className="mt-3 text-gray-500">
          The workout you are looking for does not exist.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-6 rounded-md bg-[#ccff00] px-5 py-3 text-sm font-bold text-black"
        >
          BACK TO WORKOUTS
        </button>
      </div>
    );
  }

  return (
    <section className="container py-8">

      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-[#ccff00]"
      >
        <ArrowLeft size={17} />
        Back to workouts
      </button>

      {/* Main Details */}
      <div className="grid overflow-hidden rounded-lg border border-[#242830] bg-[#15181e] md:grid-cols-2">

        {/* Image */}
        <div className="min-h-[350px]">
          <Image
            src={workout.image}
            alt={workout.name}
            className="h-full min-h-[350px] w-full object-cover"
            width={300}
            height={300}
          ></Image>
        </div>

        {/* Information */}
        <div className="p-6 sm:p-8">

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
            {workout.name}
          </h1>

          {/* Equipment */}
          <p className="mt-3 text-sm text-gray-500">
            Equipment:{" "}
            <span className="text-gray-300">
              {workout.equipment}
            </span>
          </p>

          {/* Stats */}
          <div className="mt-7 grid grid-cols-3 gap-3">

            <div className="rounded-md border border-[#242830] p-4">
              <Clock
                size={18}
                className="text-[#ccff00]"
              />

              <p className="mt-2 text-xs text-gray-500">
                Duration
              </p>

              <p className="mt-1 font-semibold">
                {workout.duration} min
              </p>
            </div>

            <div className="rounded-md border border-[#242830] p-4">
              <Flame
                size={18}
                className="text-[#ccff00]"
              />

              <p className="mt-2 text-xs text-gray-500">
                Calories
              </p>

              <p className="mt-1 font-semibold">
                {workout.caloriesBurned} kcal
              </p>
            </div>

            <div className="rounded-md border border-[#242830] p-4">
              <Star
                size={18}
                className="text-[#ccff00]"
              />

              <p className="mt-2 text-xs text-gray-500">
                Rating
              </p>

              <p className="mt-1 font-semibold">
                {workout.rating}
              </p>
            </div>

          </div>

          {/* Sets and reps */}
          <div className="mt-4 rounded-md border border-[#242830] p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Sets
              </span>

              <span className="font-semibold">
                {workout.sets}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Reps
              </span>

              <span className="font-semibold">
                {workout.reps}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">

            <button
              onClick={handleAddToPlan}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold ${
                isAdded
                  ? "bg-[#242830] text-[#ccff00]"
                  : "bg-[#ccff00] text-black hover:bg-white"
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={17} />
                  ADDED TO PLAN
                </>
              ) : (
                <>
                  <Plus size={17} />
                  ADD TO TODAY'S PLAN
                </>
              )}
            </button>

            <button
              onClick={handleSave}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-bold ${
                isSaved
                  ? "border-[#ccff00] text-[#ccff00]"
                  : "border-[#444] text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]"
              }`}
            >
              {isSaved ? (
                <>
                  <Check size={17} />
                  SAVED
                </>
              ) : (
                <>
                  <Bookmark size={17} />
                  SAVE FOR LATER
                </>
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Description */}
      <div className="mt-8 rounded-lg border border-[#242830] bg-[#15181e] p-6 sm:p-8">

        <h2 className="text-2xl font-bold">
          ABOUT THIS WORKOUT
        </h2>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-400">
          {workout.description}
        </p>

      </div>

      {/* Instructions */}
      <div className="mt-5 rounded-lg border border-[#242830] bg-[#15181e] p-6 sm:p-8">

        <h2 className="text-2xl font-bold">
          HOW TO PERFORM
        </h2>

        <div className="mt-5 space-y-4">

          {workout.instructions?.map(
            (instruction, index) => (
              <div
                key={index}
                className="flex gap-4"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
                  {index + 1}
                </div>

                <p className="text-sm leading-6 text-gray-400">
                  {instruction}
                </p>
              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
}