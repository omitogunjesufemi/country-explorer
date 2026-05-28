import FavButton from "../components/FavButton";

export default function PendingCountryCard() {
  return (
    <div className="animate-pulse border border-gray-300 rounded-sm hover:border-blue-700 p-3 h-full flex flex-col">
      <div className="rounded-sm h-48 w-full overflow-hidden">
        <svg
          width="100%"
          height="100%"
          xmlns="http://w3.org"
          className="w-full h-full object-cover"
        >
          <rect width="100%" height="100%" fill="#e0e0e0" rx="4" />
        </svg>
      </div>

      <div className="w-full mt-2 p-2">
        <div className="flex justify-between gap-2 mb-3">
          <div class="h-10 w-3/4 bg-gray-200"></div>
          <div class="h-10 w-1/4 bg-gray-200"></div>
        </div>
        <div class="h-4 w-3/4 bg-gray-200 mb-3"></div>
        <div class="h-4 w-3/4 bg-gray-200 mb-3"></div>
        <div class="h-4 w-3/4 bg-gray-200"></div>
      </div>
    </div>
  );
}
