export default function PendingCountryDetails() {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen animate-pulse">
        {/* ── Left Side (Sticky) ── */}
        <div className="md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-1/3 overflow-y-auto p-8 flex flex-col justify-center border-r border-gray-200">
          {/* Flag */}
          <svg
            width="100%"
            xmlns="http://w3.org"
            className="w-full h-48 object-cover"
          >
            <rect width="100%" height="100%" fill="#e0e0e0" rx="4" />
          </svg>

          {/* Name + Fav */}
          <div className="mt-5 mb-3">
            <div className="flex justify-between items-start gap-2">
              <div class="h-10 w-3/4 bg-gray-200"></div>
              <div class="h-10 w-1/4 bg-gray-200"></div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-col gap-2 text-sm text-gray-700 mt-2">
            {[1, 2].map((_, i) => (
              <div class="h-4 w-3/4 bg-gray-200 mb-2"></div>
            ))}
          </div>

          {/* Borders */}
          <div className="mt-5">
            <div class="h-4 w-3/4 bg-gray-200 mb-3"></div>
            <div className="flex flex-wrap gap-2">
              <div class="h-4 w-3/4 bg-gray-200 mb-2"></div>
            </div>
          </div>

          {/* Coat of Arms */}
          <div className="mt-10 flex flex-col items-center ">
            <div class="h-4 w-1/4 bg-gray-200 mb-3"></div>
            <svg
              width="100%"
              height="100%"
              xmlns="http://w3.org"
              className="w-2/4 h-full"
            >
              <rect width="100%" height="100%" fill="#e0e0e0" rx="4" />
            </svg>
          </div>
        </div>

        {/* ── Right Side (Scrollable) ── */}
        <div className="md:w-2/3 p-8 space-y-10">
          {/* Country Summary */}
          <section>
            <div class="h-10 w-3/4 bg-gray-200"></div>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
              <div class="h-4 w-3/4 bg-gray-200 mb-3"></div>
            </div>
          </section>

          {/* Economic LineChart */}
          <section>
            <div class="h-4 w-3/4 bg-gray-200 mb-3"></div>
            <svg
              width="100%"
              height="100%"
              xmlns="http://w3.org"
              className="w-full h-full object-cover"
            >
              <rect width="100%" height="100%" fill="#e0e0e0" rx="4" />
            </svg>
          </section>

          {/* Employment Details */}
          <section>
            <div class="h-4 w-3/4 bg-gray-200 mb-3"></div>
            <svg
              width="100%"
              height="100%"
              xmlns="http://w3.org"
              className="w-full h-full object-cover"
            >
              <rect width="100%" height="100%" fill="#e0e0e0" rx="4" />
            </svg>
          </section>

          {/* Details — unique fields not shown on the left */}
          <section>
            <div class="h-4 w-3/4 bg-gray-200 mb-3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              {[1, 2, 3, 4, 5, 6].map((_, i) => (
                <div class="h-4 w-3/4 bg-gray-200 mb-3"></div>
              ))}
            </div>

            {/* Map links */}
            <div className="mt-4 flex gap-4">
              <div class="h-4 w-3/4 bg-gray-200 mb-3"></div>
              <div class="h-4 w-3/4 bg-gray-200 mb-3"></div>
            </div>
          </section>

          {/* Latest News */}
          <section>
            <div class="h-4 w-3/4 bg-gray-200 mb-3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2].map((article) => (
                <a
                  key={article.id}
                  className="group flex flex-col rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition"
                >
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://w3.org"
                    className="w-full h-full object-cover"
                  >
                    <rect width="100%" height="100%" fill="#e0e0e0" rx="4" />
                  </svg>
                  <div className="p-3 flex flex-col gap-1 flex-1">
                    <div class="h-4 w-3/4 bg-gray-200 mb-3"></div>
                    <div class="h-4 w-3/4 bg-gray-200 mb-3"></div>
                    <div class="h-4 w-3/4 bg-gray-200 mb-3"></div>
                    <div class="h-4 w-3/4 bg-gray-200 mb-3"></div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
