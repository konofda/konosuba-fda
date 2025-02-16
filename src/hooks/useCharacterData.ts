import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';

export interface CharacterData {
  base_id: string;
  name: string;
  is_collab: boolean;
  image_sprite: string;
  weapon_type?: string;
  flavor_text?: string;
  character_voice?: string;
  notice_text?: string;
  birthday?: string;
}

async function fetchCharacterSelectData(): Promise<CharacterData[]> {
  const response = await fetch(API_URL_BASE + 'v1/member-characters.json');
  if (!response.ok) {
    throw new Error('Failed to fetch character select data');
  }
  return response.json();
}

export function useCharacterData() {
  return useQuery({
    queryKey: ['characterSelectData'],
    queryFn: fetchCharacterSelectData,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
  });
}
