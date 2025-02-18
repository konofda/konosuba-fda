import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';

export interface CharacterData {
  id?: string;
  base_id: string;
  name: string;
  full_name?: string;
  flavor_text?: string;
  image_sprite: string;
  image_sprites_alt?: string[];
  notice_text?: string;
  birthday?: string;
  is_original_character?: boolean;
  is_collabo?: string | boolean;
  collabo?: string;
  konofan_wiki?: string;
  konosuba_wiki?: string;
  other_wiki?: string;
  // Gameplay
  weapon_type?: string;
  character_voice?: string;
  character_voice_2?: string;
  specialattack?: string;
  sort_order?: string;
  display_start?: string;
  display_end?: string;
  use_assist_motion?: string;
  assist_effect_timing?: string;
  full_cell_width?: string;
  full_cell_height?: string;
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
