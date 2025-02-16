import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';
import type { Live2DModel } from '@/types';

async function fetchLive2DData(): Promise<Live2DModel[]> {
  const response = await fetch(API_URL_BASE + 'v0/live2d.json');
  if (!response.ok) {
    throw new Error('Failed to fetch Live2D data');
  }
  return response.json();
}

export function useLive2DData() {
  return useQuery({
    queryKey: ['live2dData'],
    queryFn: fetchLive2DData,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
  });
}
