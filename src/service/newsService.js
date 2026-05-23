const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY || "test";
const GUARDIAN_BASE = "https://content.guardianapis.com/search";


export async function fetchCountryNews(countryName, pageSize = 6) {
    const params = new URLSearchParams({
        q: countryName,
        "page-size": pageSize,
        "order-by": "newest",
        "show-fields": "thumbnail,trailText,headline",
        "api-key": GUARDIAN_API_KEY,
    });

    const response = await fetch(`${GUARDIAN_BASE}?${params}`);
    if (!response.ok) throw new Error(`News fetch failed: ${response.statusText}`);

    const data = await response.json();
    return data.response.results ?? [];
}
