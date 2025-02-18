import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';

/* 🎉 Moved type definition from src/types.ts: StoryData */
export interface StoryData {
  id: string;
  bg: string;
  icon_bg: string | null;
}

async function fetchStoryData(): Promise<StoryData[]> {
  const response = await fetch(API_URL_BASE + 'v0/stories.json');
  if (!response.ok) {
    throw new Error('Failed to fetch story data');
  }
  return response.json();
}

export function useStoryBackgroundData() {
  return useQuery({
    queryKey: ['storyData'],
    queryFn: fetchStoryData,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
  });
}
