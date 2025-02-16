import { useQueries, useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';

export interface StoryData {
  id: number;
  title_text: string;
  summary_text: string;
  banner: string;
  scriptPath: string | null;
  chapter_text?: string;
  before_id?: number;
  pack_id: string; // 70001 etc
  list_icon_type: string; // member | still | background etc
  list_icon_id: string; // 1071100 etc
}

export type StoryType = 'main' | 'member' | 'event' | 'gacha' | 'unique' | 'reminiscence' | 'etc';

const STORY_ENDPOINTS: Record<StoryType, string> = {
  main: 'v1/stories-main.json',
  member: 'v1/stories-member.json',
  event: 'v1/stories-event.json',
  gacha: 'v1/stories-gacha.json',
  unique: 'v1/stories-unique.json',
  reminiscence: 'v1/stories-reminiscence.json',
  etc: 'v1/stories-etc.json',
};

async function fetchStoryType(type: StoryType): Promise<StoryData[]> {
  const response = await fetch(`${API_URL_BASE}${STORY_ENDPOINTS[type]}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} stories`);
  }
  return response.json();
}

export function useAllStories() {
  const storyTypes = Object.keys(STORY_ENDPOINTS) as StoryType[];
  
  const results = useQueries({
    queries: storyTypes.map(type => ({
      queryKey: ['stories', type],
      queryFn: () => fetchStoryType(type),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    })),
  });

  return {
    data: results.map((result, index) => ({
      type: storyTypes[index],
      stories: result.data ?? [],
    })),
    isLoading: results.some(result => result.isLoading),
    isError: results.some(result => result.isError),
    errors: results.map(result => result.error).filter(Boolean),
  };
}

async function fetchStoryContent(path: string | null): Promise<string> {
  if (!path) throw new Error('No path provided');
  const response = await fetch(
    `https://raw.githubusercontent.com/HaiKonofanDesu/konofan-story/refs/heads/main/${path}`
  );
  if (!response.ok) {
    throw new Error(`Failed to load story content for ${path}`);
  }
  return response.text();
}

export function useStoryScriptData(path: string | null) {
  return useQuery({
    queryKey: ['storyContent', path],
    queryFn: () => fetchStoryContent(path),
    enabled: !!path,
  });
} 
