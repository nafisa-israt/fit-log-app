export default function Loading() {
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