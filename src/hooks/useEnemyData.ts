import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';

export interface EnemyData {
  id: string;
  image: string | null;
  icon: string | null;
  unitTexture: string;
}

async function fetchEnemyData(): Promise<EnemyData[]> {
  console.log('🦹 Fetching enemy data...');
  const response = await fetch(`${API_URL_BASE}v1/enemies.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch enemy data');
  }
  return response.json();
}

export function useEnemyData() {
  return useQuery({
    queryKey: ['enemyData'],
    queryFn: fetchEnemyData,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
  });
} 