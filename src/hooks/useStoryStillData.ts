import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';

/* 🎉 Moved type definition from src/types.ts: StillData */
export interface StillData {
  id: string;
  stills: string[];
  icon_still: string | null;
}

type StoryStill = {
  id: string;
  still: string;
  icon_still: string | null;
};

async function fetchStillData(): Promise<StoryStill[]> {
  const response = await fetch(API_URL_BASE + 'v1/all-story-stills.json');
  if (!response.ok) {
    throw new Error('Failed to fetch still data');
  }
  return response.json();
}

export function useStoryStillData() {
  return useQuery({
    queryKey: ['stillData'],
    queryFn: fetchStillData,
  });
}
