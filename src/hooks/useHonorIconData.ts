import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';

export interface HonorIconData {
  id: string;
  icon: string;
  name?: string;
}

async function fetchHonorIconData(): Promise<HonorIconData[]> {
  const response = await fetch(`${API_URL_BASE}v1/honor-icons.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch honor icon data');
  }
  return response.json();
}

export function useHonorIconData() {
  return useQuery({
    queryKey: ['honorIconData'],
    queryFn: fetchHonorIconData,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
  });
} 