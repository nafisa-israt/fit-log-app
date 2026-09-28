import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import Image from "next/image";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-md border border-[#242830] bg-[#15181e] hover:border-[#ccff00]"
    >
      {/* Image */}
      <div className="aspect-[16/10] overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          width={160}
          height={100}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        ></Image>
      </div>

      {/* Content */}
      <div className="p-4">
        
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#ccff00] px-2 py-1 text-[9px] font-bold text-black"
            >
              {muscle.toUpperCase()}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-semibold">
          {workout.name.toUpperCase()}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-3 text-[10px] text-gray-400">
          <span className="flex items-center gap-1">
            <Clock3 size={12} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <Flame size={12} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <Star size={12} />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}