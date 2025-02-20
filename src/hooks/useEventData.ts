import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';

async function fetchEventData(): Promise<Event[]> {
  console.log('🎉 Fetching event data...');
  const response = await fetch(`${API_URL_BASE}v1/all-events.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch event data');
  }
  const data = await response.json();
  console.log(`🎯 Found ${data.length} events`);
  return data;
}

export function useEventData() {
  return useQuery({
    queryKey: ['eventData'],
    queryFn: fetchEventData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export interface Event {
  event_id: string;
  name: string;
  type: string;
  exchange_id: string;
  gacha_ticket_id: string;
  boss_ticket_id: string;
  boss_ticket_use_ratio: string;
  special_boss_ticket_id: string;
  start_at: string;
  end_at: string;
  reward_start_at: string;
  reward_end_at: string;
  boss_count_group_id: string;
  event_emergency_group_id: string;
  mission_introduction_text: string;
  bgm: string;
  multi_no_ticket_limit: string;
  guide_num: string;
  enemy_image: string;
  scorechallenge_enemy_image: string;
  logo?: string;
  story_button?: string;
  quest_button?: string;
  event_quest_button?: string;
  boss_battle_button?: string;
  boss_battle_sp_button: any;
  emergency_boss_button?: string;
  scorechallenge_button?: string;
  members: Member[];
  stages: Stage[];
  missions: Mission[];
  infinity_gacha: InfinityGacha[];
  limit_gacha: LimitGacha[];
  story_events: StoryEvent[];
  story_uniques: StoryUnique[];
}

export interface Member {
  member_id: string;
  event_id: string;
  item_type: string;
  item_id: string;
}

export interface Stage {
  id: string;
  event_id: string;
  stage_id: string;
  title: string;
  start_at: string;
  end_at: string;
  skipticket: string;
  save: string;
  bossticket: string;
  limit: string;
  mode: string;
  mainmission: string;
  submission1: string;
  submission2: string;
  mainmission_reward1_packid: string;
  mainmission_reward2_packid: string;
  mainmission_reward3_packid: string;
  unlock_clearstage1: string;
  unlock_clearstage2: string;
  stamina: string;
  attr1: string;
  attr2: string;
  wave_id1: string;
  wave_id2: string;
  wave_id3: string;
  boss: string;
  advice: string;
  graphic: string;
  bgm: string;
  bgm_boss: string;
  recommend_power: string;
  player_exp: string;
  intimacy_exp: string;
  member_exp: string;
  money: string;
  time_limit: string;
  ng_character: string;
  ng_assist: string;
}

export interface Mission {
  id: string;
  mission_type: string;
  event_id: string;
  mission_id: string;
  enable: string;
  enabled_id: string;
  mission_name: string;
  pack_id: string;
  rule: string;
  rule_x: string;
  rule_y: string;
  rule_z: string;
  reward_period: string;
  start_at: string;
  end_at: string;
  description: string;
}

export interface InfinityGacha {
  event_id: string;
  sort: string;
  item_type: string;
  item_id: string;
  item_num: string;
  limit: string;
  reset: string;
}

export interface LimitGacha {
  event_id: string;
  sort: string;
  item_type: string;
  item_id: string;
  item_num_1: string;
  item_num_2: string;
  item_num_3: string;
  item_num_4: string;
  item_num_5: string;
  limit_1: string;
  limit_2: string;
  limit_3: string;
  limit_4: string;
  limit_5: string;
  reset: string;
}

export interface StoryEvent {
  id: string;
  event_type: string;
  event_id: string;
  story: string;
  type_sort_order: string;
  chapter_text: string;
  title_text: string;
  short_title_text: string;
  summary_text: string;
  unlock_quest_id: string;
  before_id: string;
  unlock_event_id: string;
  pack_id: string;
  list_icon_type: string;
  list_icon_id: string;
  start_load_voice_id: string;
  end_load_voice_id: string;
  banner: string;
  selection: string;
}

export interface StoryUnique {
  id: string;
  sort_order: string;
  category: string;
  story: string;
  category_title: string;
  chapter_title_text: string;
  title_text: string;
  short_title_text: string;
  short_title_text_after: string;
  summary_text: string;
  event_id: string;
  unlock_quest_id: string;
  before_id: string;
  unlock_event_id: string;
  total_intimacy: string;
  member_rank3: string;
  pack_id: string;
  list_icon_type: string;
  list_icon_id: string;
  start_load_voice_id: string;
  end_load_voice_id: string;
  banner: string;
}
