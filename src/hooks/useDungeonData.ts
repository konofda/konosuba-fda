import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';

export interface Stage {
  id: string;
  area_id: string;
  title: string;
  unlock_clear_stage: string;
  attr1: string;
  attr2: string;
  bad_state1: string;
  bad_state2: string;
  bad_state3: string;
  wave_id1: string;
  boss: string;
  advice: string;
  graphic: string;
  bgm: string;
  bgm_boss: string;
  recommend_power: string;
  time_limit: string;
  thumbnail: string;
  infobg: string;
  battlebg: string;
}

export interface Area {
  id: string;
  dungeon_id: string;
  difficulty: string;
  title: string;
  member_num: string;
  unlock_id: string;
  background: string;
  skip_ticket: string;
  clear_rank_group: string;
  recommend_power: string;
  benefit_lot_group: string;
  attr1: string;
  attr2: string;
  button_image: string;
  ng_character: string;
  ng_assist: string;
  stages: Stage[];
}

export interface Dungeon {
  id: string;
  type: string;
  name: string;
  start_at: string;
  end_at: string;
  info_url: string;
  max_limit: string;
  top_button_image: string;
  areas: Area[];
}

async function fetchDungeonData(): Promise<Dungeon[]> {
  console.log('🏰 Fetching dungeon data...');
  const response = await fetch(`${API_URL_BASE}v1/dungeons.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch dungeon data');
  }
  const data = await response.json();
  console.log(`🎯 Found ${data.length} dungeons`);
  return data;
}

export function useDungeonData() {
  return useQuery({
    queryKey: ['dungeonData'],
    queryFn: fetchDungeonData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
} 