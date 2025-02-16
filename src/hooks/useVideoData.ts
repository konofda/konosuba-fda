import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';
import type { VideoData } from '@/types';

async function fetchVideoData(): Promise<VideoData[]> {
  const response = await fetch(API_URL_BASE + 'v1/videos.json');
  if (!response.ok) {
    throw new Error('Failed to fetch video data');
  }
  return response.json();
}

export function useVideoData() {
  return useQuery({
    queryKey: ['videoData'],
    queryFn: fetchVideoData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
} 
