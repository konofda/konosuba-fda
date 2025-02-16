import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';
import type { StillData } from '@/types';

async function fetchStillData(): Promise<StillData[]> {
  const response = await fetch(API_URL_BASE + 'v0/stills.json');
  if (!response.ok) {
    throw new Error('Failed to fetch still data');
  }
  return response.json();
}

export function useStoryStillData() {
  return useQuery({
    queryKey: ['stillData'],
    queryFn: fetchStillData,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
  });
}
