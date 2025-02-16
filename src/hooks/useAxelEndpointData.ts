import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';
import type {
  Assist, BattleEnemy, Campaign, Character, Costume,
  DungeonArea, DungeonStage, Dungeon, EquipAccessory, EquipWeapon,
  EventBossCount, EventConfig, EventMember, EventQuestStage,
  GachaTab, Gacha, GalleryGroup, GalleryMovie, GalleryStill, Honor, Item,
  Member, MissionHonor, ShopBalloon, ShopItem, Shop,
  StoryEtc, StoryEvent, StoryGacha, StoryMain, StoryMember,
  StoryReminiscence, StoryUnique, TargetCostume, TitleTheme, Voice
} from '@/types/api-axel';

// Type mapping for all Axel endpoints and their return types
export type AxelEndpoints = {
  'assist': Assist[];
  'battle_enemy': BattleEnemy[];
  'campaign': Campaign[];
  'character': Character[];
  'costume': Costume[];
  'dungeon_area': DungeonArea[];
  'dungeon_stage': DungeonStage[];
  'dungeon': Dungeon[];
  'equip_accessory': EquipAccessory[];
  'equip_weapon': EquipWeapon[];
  'event_boss_count': EventBossCount[];
  'event_config': EventConfig[];
  'event_member': EventMember[];
  'event_quest_stage': EventQuestStage[];
  'gacha_tab': GachaTab[];
  'gacha': Gacha[];
  'gallery_group': GalleryGroup[];
  'gallery_movie': GalleryMovie[];
  'gallery_still': GalleryStill[];
  'honor': Honor[];
  'item': Item[];
  'member': Member[];
  'mission_honor': MissionHonor[];
  'shop_balloon': ShopBalloon[];
  'shop_item': ShopItem[];
  'shop': Shop[];
  'story_etc': StoryEtc[];
  'story_event': StoryEvent[];
  'story_gacha': StoryGacha[];
  'story_main': StoryMain[];
  'story_member': StoryMember[];
  'story_reminiscence': StoryReminiscence[];
  'story_unique': StoryUnique[];
  'target_costume': TargetCostume[];
  'title_theme': TitleTheme[];
  'voice': Voice[];
};

async function fetchAxelEndpointData<T extends keyof AxelEndpoints>(
  endpoint: T
): Promise<AxelEndpoints[T]> {
  const response = await fetch(`${API_URL_BASE}axel/${endpoint}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint} data`);
  }
  return response.json();
}

export function useAxelEndpointData<T extends keyof AxelEndpoints>(endpoint: T) {
  return useQuery({
    queryKey: ['axelData', endpoint],
    queryFn: () => fetchAxelEndpointData(endpoint),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
} 
