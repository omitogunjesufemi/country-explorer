import { useState, useEffect } from "react";
import { fetchCountryNews } from "../service/newsService";

export default function useCountryNews(countryName) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryName) return;

    let cancelled = false;
    setLoading(true);
    setArticles([]);
    setError(null);

    fetchCountryNews(countryName)
      .then((results) => {
        if (!cancelled) setArticles(results);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [countryName]);

  return { articles, loading, error };
}
