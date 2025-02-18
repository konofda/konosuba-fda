import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';

/* 🎉 Moved type definition from src/types.ts: MusicData */
export interface MusicData {
  path: string;
  category: string;
  name: string;
}

async function fetchMusicData(): Promise<MusicData[]> {
  const response = await fetch(API_URL_BASE + 'v1/music.json');
  if (!response.ok) {
    throw new Error('Failed to fetch music data');
  }
  return response.json();
}

export function useMusicData() {
  return useQuery({
    queryKey: ['musicData'],
    queryFn: fetchMusicData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
} 
