export default function Spinner({ label }) {
  return (
    <div className="flex items-center justify-center gap-3 text-gray-400 py-4">
      <svg
        className="animate-spin size-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>
      <span className="text-sm">{label}</span>
    </div>
  );
}
