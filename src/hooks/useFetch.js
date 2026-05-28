import { useEffect, useState } from "react";

export default function useFetch(fetchFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const customFetchFunction = async () => {
      try {
        const resp = await fetchFunction();
        setData(resp);
        setError(null);
      } catch (error) {
        setError(error);
        console.log("Error in useFetch:", error);
      } finally {
        setLoading(false);
      }
    };
    customFetchFunction();
  }, [fetchFunction]);

  return { data, loading, error };
}
