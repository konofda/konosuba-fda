import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';

/* 🎉 Moved type definition from src/types.ts: SpineModel */
export interface SpineModel {
  id: string;
  name: string;
  base_id: string;
  character_id: string;
  category: 'ally' | 'enemy' | 'assist';
  path: string;
  unlock_member_id?: string;
}

async function fetchSpineData(): Promise<SpineModel[]> {
  console.log('🔄 Fetching spine data from new API endpoint');
  const response = await fetch(API_URL_BASE + '/v1/all-models-spine.json');
  if (!response.ok) {
    throw new Error('Failed to fetch spine data');
  }
  const data = await response.json();
  console.log('✅ Successfully fetched spine data:', data.length, 'models');
  return data;
}

export function useSpineData() {
  return useQuery({
    queryKey: ['spineData'],
    queryFn: fetchSpineData,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
  });
}
