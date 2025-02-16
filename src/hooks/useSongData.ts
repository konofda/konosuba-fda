import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';
import type { SongData } from '@/types';

async function fetchSongData(): Promise<SongData[]> {
  const response = await fetch(API_URL_BASE + 'v1/gallery-songs.json');
  if (!response.ok) {
    throw new Error('Failed to fetch song data');
  }
  return response.json();
}

export function useSongData() {
  return useQuery({
    queryKey: ['songData'],
    queryFn: fetchSongData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
} 
