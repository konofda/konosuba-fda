export interface CardData {
  id: string;
  name: string;
  is_collab: boolean;
  rarity: number;
  event: string;
  base_id: string;
  full_card: string;
  icon_small: string;
  icon_middle: string;
  icon_large: string;
}

export interface StoryData {
  id: string;
  bg: string;
  icon_bg: string | null;
}

export interface StillData {
  id: string;
  stills: string[];
  icon_still: string | null;
}

export interface Live2DModel {
  base_id: string;
  character_name: string;
  model_name: string;
  path: string;
  icon_small: string | null;
}

export interface SpineModel {
  name: string;
  character_base_id: string;
  character_name: string;
  path_json: string;
  category: 'ally' | 'enemy' | 'assist';
}

export type IconSize = 'small' | 'middle' | 'large';

export interface MusicData {
  path: string;
  category: string;
  name: string;
}

export interface VideoData {
  path: string;
  category: string;
  name: string;
}

export interface SongData {
  movie: string;
  story_id: string;
  group_id: string;
  list_icon: string;
  title: string;
  artist_name: string;
  scale_type: string;
  display_start: string;
  title_alt: string;
  youtube: string[];
  icon?: string;
}
