import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';
import type * as AxelTypes from '@/types/api-axel';

// Type mapping for all Axel endpoints and their return types
export type AxelEndpoints = {
  assist: AxelTypes.Assist[];
  battle_enemy: AxelTypes.BattleEnemy[];
  campaign: AxelTypes.Campaign[];
  character: AxelTypes.Character[];
  costume: AxelTypes.Costume[];
  dungeon_area: AxelTypes.DungeonArea[];
  dungeon_stage: AxelTypes.DungeonStage[];
  dungeon: AxelTypes.Dungeon[];
  equip_accessory: AxelTypes.EquipAccessory[];
  equip_weapon: AxelTypes.EquipWeapon[];
  event_boss_count: AxelTypes.EventBossCount[];
  event_config: AxelTypes.EventConfig[];
  event_member: AxelTypes.EventMember[];
  event_quest_stage: AxelTypes.EventQuestStage[];
  gacha_tab: AxelTypes.GachaTab[];
  gacha: AxelTypes.Gacha[];
  gallery_group: AxelTypes.GalleryGroup[];
  gallery_movie: AxelTypes.GalleryMovie[];
  gallery_still: AxelTypes.GalleryStill[];
  honor: AxelTypes.Honor[];
  item: AxelTypes.Item[];
  member: AxelTypes.Member[];
  mission_honor: AxelTypes.MissionHonor[];
  shop_balloon: AxelTypes.ShopBalloon[];
  shop_item: AxelTypes.ShopItem[];
  shop: AxelTypes.Shop[];
  story_etc: AxelTypes.StoryEtc[];
  story_event: AxelTypes.StoryEvent[];
  story_gacha: AxelTypes.StoryGacha[];
  story_main: AxelTypes.StoryMain[];
  story_member: AxelTypes.StoryMember[];
  story_reminiscence: AxelTypes.StoryReminiscence[];
  story_unique: AxelTypes.StoryUnique[];
  target_costume: AxelTypes.TargetCostume[];
  title_theme: AxelTypes.TitleTheme[];
  voice: AxelTypes.Voice[];
};

async function fetchAxelEndpointData<T extends keyof AxelEndpoints>(endpoint: T): Promise<AxelEndpoints[T]> {
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
