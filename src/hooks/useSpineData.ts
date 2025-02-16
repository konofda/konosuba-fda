import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';
import type { SpineModel } from '@/types';

async function fetchSpineData(): Promise<SpineModel[]> {
  const response = await fetch(API_URL_BASE + 'v0/spines.json');
  if (!response.ok) {
    throw new Error('Failed to fetch spine data');
  }
  const data = await response.json();

  // Filter out entries with .json files
  return data.filter((model: SpineModel) => !model.path_json.endsWith('.json'));
}

export function useSpineData() {
  return useQuery({
    queryKey: ['spineData'],
    queryFn: fetchSpineData,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
  });
}
