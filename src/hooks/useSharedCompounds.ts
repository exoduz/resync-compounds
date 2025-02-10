import { useEffect, useState } from "react";
import type { Compound } from "../components/CompoundItem";
import { useAuth } from "../context/AuthContext";
import { fetchSharedCompounds } from "../api/compounds";

interface SharedCompoundType {
  compound: Compound;
  user: {
    id: string;
    username: string;
  };
}

export const useSharedCompounds = (token: string) => {
  const { userId } = useAuth();
  const [sharedCompounds, setSharedCompounds] = useState<SharedCompoundType[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const data = await fetchSharedCompounds(token, userId);
        setSharedCompounds(data);
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
  }, [token, userId]);

  return { sharedCompounds, loading, error };
};
