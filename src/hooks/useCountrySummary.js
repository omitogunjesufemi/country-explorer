import { useState, useEffect } from "react";
import { fetchCountrySummary } from "../service/countryService";

const CACHE_PREFIX = "country_summary_v1_";

function getCached(cca3) {
  try {
    return localStorage.getItem(CACHE_PREFIX + cca3) ?? null;
  } catch {
    return null;
  }
}

function setCached(cca3, text) {
  try {
    localStorage.setItem(CACHE_PREFIX + cca3, text);
  } catch {
    console.warn("Failed to cache summary for", cca3);
  }
}

export default function useCountrySummary(country) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!country) return;

    console.log("Fetching summary for country", country.name.common);

    const cached = getCached(country.cca3);
    if (cached) {
      setSummary(cached);
      setLoading(false);
      return;
    }

    setLoading(true);
    setSummary(null);
    setError(null);

    const fetchSummary = async () => {
      try {
        const summary = await fetchCountrySummary(country);
        setSummary(summary);
        setCached(country.cca3, summary);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch summary");
        setLoading(false);
      }
    };
    fetchSummary();
  }, [country?.cca3]);

  return { summary, loading, error };
}
