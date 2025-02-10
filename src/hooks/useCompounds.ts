import { useEffect, useState } from "react";
import { fetchCompounds } from "../api/compounds";
import type { Compound } from "../components/CompoundItem";

export const useCompounds = (token: string) => {
  const [compounds, setCompounds] = useState<Compound[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchCompounds(token);
        setCompounds(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return { compounds, loading, error };
};
