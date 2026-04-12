import { useEffect, useState } from "react";
import type { CatalogResponse } from "../types/catalog.types";

export const useFetchCatalog = () => {
  const [data, setData] = useState<CatalogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const response = await fetch("/catalog.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch catalog: ${response.statusText}`);
        }
        const catalogData = await response.json();
        setData(catalogData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  return { data, loading, error };
};
