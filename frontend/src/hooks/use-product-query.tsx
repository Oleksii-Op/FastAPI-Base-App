import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface UseProductQueryProps<T, F> {
  queryKey: string;
  fetchUrl: string;
  filters: F;
  limit?: number;
}

export function useProductQuery<T, F>({ 
  queryKey, 
  fetchUrl, 
  filters,
  limit = 25 
}: UseProductQueryProps<T, F>) {
  const { toast } = useToast();
  const [offset, setOffset] = useState(0);
  const [allItems, setAllItems] = useState<T[]>([]);

  useEffect(() => {
    setOffset(0);
    setAllItems([]);
  }, [filters]);

  const buildQueryString = (filters: F, offset: number) => {
    const queryParams = new URLSearchParams();
    queryParams.append('offset', offset.toString());
    queryParams.append('limit', limit.toString());

    Object.entries(filters as Record<string, any>).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v.toString()));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    return queryParams.toString();
  };

  const { data: items, isLoading, error, isFetching } = useQuery({
    queryKey: [queryKey, offset, filters],
    queryFn: async () => {
      const queryString = buildQueryString(filters, offset);
      console.log(`Fetching ${queryKey} with query:`, queryString);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}${fetchUrl}?${queryString}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch ${queryKey}`);
      }
      return response.json();
    },
  });

  useEffect(() => {
    if (items && !isLoading) {
      setAllItems(prev => offset === 0 ? items : [...prev, ...items]);
    }
  }, [items, isLoading, offset]);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: `Error loading ${queryKey}`,
        description: "Please try again later.",
      });
    }
  }, [error, toast, queryKey]);

  const loadMore = () => {
    setOffset(prev => prev + limit);
  };

  const showLoadMore = items?.length === limit;

  return {
    items: allItems,
    isLoading,
    isFetching,
    error,
    loadMore,
    showLoadMore
  };
}