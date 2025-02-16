// Base interface for common story properties
interface BaseStory {
  id: string;
  title_text: string;
  short_title_text: string;
  summary_text: string;
  pack_id: string;
  list_icon_type: string;
  list_icon_id: string;
  start_load_voice_id: string;
  end_load_voice_id: string;
}

export interface StoryEtc extends BaseStory {
  type: string;
  category: string;
  sort_order: string;
  play_order: string;
  chapter_text: string;
  start_at: string;
  end_at: string;
  banner: string;
}

export interface StoryEvent extends BaseStory {
  event_type: string;
  event_id: string;
  story: string;
  type_sort_order: string;
  chapter_text: string;
  unlock_quest_id: string;
  before_id: string;
  unlock_event_id: string;
  banner: string;
  selection: string;
}

export interface StoryGacha extends BaseStory {
  sort_order: string;
  gacha_id: string;
  banner_group: string;
  banner_group_title_text: string;
  banner: string;
}

export interface StoryMain extends BaseStory {
  part: string;
  chapter: string;
  story: string;
  sort_order: string;
  unlock_id: string;
  part_title_text: string;
  chapter_title_text: string;
  unlock_chapter_quest: string;
  unlock_quest_id: string;
  before_id: string;
  display_start: string;
}

export interface StoryMember extends BaseStory {
  chara_id: string;
  chara_sort_order: string;
  chapter_text: string;
  before_id: string;
  chara1: string;
  chara1_intimacy: string;
  chara2: string;
  chara2_intimacy: string;
  chara3: string;
  chara3_intimacy: string;
  unlock_quest_id: string;
  unlock_member_id: string;
  display_start: string;
  display_end: string;
}

export interface StoryReminiscence extends BaseStory {
  sort_order: string;
  category: string;
  category_title: string;
  chapter_title_text: string;
  before_id: string;
  total_intimacy: string;
  chara1: string;
  chara1_intimacy: string;
  chara2: string;
  chara2_intimacy: string;
  chara3: string;
  chara3_intimacy: string;
}

export interface StoryUnique extends BaseStory {
  sort_order: string;
  category: string;
  story: string;
  category_title: string;
  chapter_title_text: string;
  short_title_text_after: string;
  event_id: string;
  unlock_quest_id: string;
  before_id: string;
  unlock_event_id: string;
  total_intimacy: string;
  member_rank3: string;
  banner: string;
}

// Assist interface
export interface Assist {
  id: string;
  name: string;
  display_start: string;
  display_end: string;
  rare: string;
  spine_id: string;
  character_id: string;
  type: string;
  item_type1: string;
  material1: string;
  num1: string;
  item_type2: string;
  material2: string;
  num2: string;
  item_type3: string;
  material3: string;
  num3: string;
  item_type4: string;
  material4: string;
  num4: string;
  item_type5: string;
  material5: string;
  num5: string;
  money: string;
}

// Battle Enemy interface
export interface BattleEnemy {
  id: string;
  enemy_id: string;
  shape: string;
  name: string;
  lv: string;
  hp: string;
  attack: string;
  defense: string;
  magicattak: string;
  magicdefence: string;
  agility: string;
  dexterity: string;
  skill_id1: string;
  skill_id2: string;
  skill_id3: string;
  enemy_ai_id: string;
  sp_up: string;
  sp_up_time: string;
  boss_flag: string;
  multitarget_flag: string;
  blow_resistance: string;
  water_resistance: string;
  poison_damage_max: string;
  lacerations_damage_max: string;
  enemy_size: string;
  description: string;
}

// Campaign interface
export interface Campaign {
  id: string;
  priority: string;
  type: string;
  quest_type: string;
  event_id: string;
  quest_difficulty: string;
  boss_flag: string;
  quest_area: string;
  quest_stage: string;
  start: string;
  end: string;
  rank_start: string;
  rank_end: string;
  name_text: string;
  description_text: string;
}

// Character interface
export interface Character {
  id: string;
  name: string;
  weapon_type: string;
  specialattack: string;
  flavor_text: string;
  background: string;
  costume: string;
  character_voice: string;
  character_voice_2: string;
  sort_order: string;
  description: string;
  is_collabo: string;
  display_start: string;
  display_end: string;
  notice_text: string;
  birthday: string;
  use_assist_motion: string;
  assist_effect_timing: string;
  full_cell_width: string;
  full_cell_height: string;
}

// Costume interface
export interface Costume {
  id: string;
  name: string;
  pos_y: string;
  multi_id: string;
  multi_pos_x: string;
  multi_pos_y: string;
  multi_id_2: string;
  multi_pos_x_2: string;
  multi_pos_y_2: string;
  texture_width: string;
  unlock_member_id: string;
  display: string;
  display_start: string;
  display_end: string;
}

// Dungeon Area interface
export interface DungeonArea {
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
}

// Dungeon Stage interface
export interface DungeonStage {
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
}

// Dungeon interface
export interface Dungeon {
  id: string;
  type: string;
  name: string;
  start_at: string;
  end_at: string;
  info_url: string;
  max_limit: string;
  top_button_image: string;
}

// Equipment interfaces
export interface BaseEquipment {
  id: string;
  item_id: string;
  enable: string;
  start_at: string;
  end_at: string;
  unlock_playerrank: string;
  unlock_character_id: string;
  unlock_character_intimacy: string;
  unlock_quest_id: string;
  display_end: string;
  display_check_material: string;
  name: string;
  flavor_text: string;
  rare: string;
  item_type1: string;
  material1: string;
  num1: string;
  item_type2: string;
  material2: string;
  num2: string;
  item_type3: string;
  material3: string;
  num3: string;
  item_type4: string;
  material4: string;
  num4: string;
  money: string;
}

export interface EquipAccessory extends BaseEquipment {}

export interface EquipWeapon extends BaseEquipment {
  weapon_type: string;
  description: string;
  chara_id: string;
  goddess: string;
}

// Event interfaces
export interface EventBossCount {
  id: string;
  group_id: string;
  count_point: string;
  navi_play_place: string;
  boss_image: string;
  start_at: string;
  pack_id: string;
}

export interface EventConfig {
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
  info_url: string;
  info_url_boss: string;
  mission_introduction_text: string;
  bgm: string;
  multi_no_ticket_limit: string;
  guide_num: string;
  enemy_image: string;
  scorechallenge_enemy_image: string;
}

export interface EventMember {
  member_id: string;
  event_id: string;
  item_type: string;
  item_id: string;
}

export interface EventQuestStage {
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

// Gacha interfaces
export interface GachaTab {
  id: string;
  tab: string;
  start_at: string;
  end_at: string;
  text: string;
  gacha_id: string;
}

export interface Gacha {
  gacha_id: string;
  name: string;
  description_text: string;
  enable: string;
  start_at: string;
  end_at: string;
  limit: string;
  limit_x: string;
  banner_url: string;
  movie: string;
  introduction_image: string;
  info_banner_url: string;
  gacha_info_url: string;
  other_tab_priority: string;
  footer_banner: string;
  footer_banner_order: string;
  limit_id: string;
  exchang_id: string;
  story: string;
  story_fes: string;
  ratio_text_pattern: string;
  exchang_bonus_id: string;
  exchang_name: string;
  always_display_flag: string;
  step_loop_count: string;
  result_bg: string;
  card_img_2: string;
  card_img_3: string;
  card_img_4: string;
  home_appeal_priority: string;
}

// Gallery interfaces
export interface GalleryGroup {
  id: string;
  group_name: string;
}

export interface GalleryMovie {
  movie: string;
  story_id: string;
  group_id: string;
  list_icon: string;
  title: string;
  artist_name: string;
  scale_type: string;
  display_start: string;
}

export interface GalleryStill {
  id: string;
  group_id: string;
  still: string;
}

// Honor interface
export interface Honor {
  id: string;
  start_at: string;
  end_at: string;
  character_id: string;
  name: string;
}

// Item interface
export interface Item {
  type: string;
  id: string;
  name: string;
  description: string;
  sell: string;
  rarity: string;
  questskip_target: string;
}

// Member interface
export interface Member {
  id: string;
  character_id: string;
  name: string;
  graphics: string;
  rare: string;
  activeskill1: string;
  activeskill2: string;
  activeskill3: string;
  activeskill_motion1: string;
  activeskill_motion2: string;
  activeskill_motion3: string;
  passiveskill1: string;
  resist_attr: string;
  growth_type: string;
  min_hp: string;
  min_attack: string;
  min_magicattak: string;
  min_defense: string;
  min_magicdefence: string;
  min_agility: string;
  min_dexterity: string;
  min_luck: string;
  max_hp: string;
  max_attack: string;
  max_magicattak: string;
  max_defense: string;
  max_magicdefence: string;
  max_agility: string;
  max_dexterity: string;
  max_luck: string;
  book: string;
  isundead: string;
  display_start: string;
  display_end: string;
  description: string;
  notice_text: string;
}

// Mission Honor interface
export interface MissionHonor {
  mission_type: string;
  mission_id: string;
  enable: string;
  enabled_id: string;
  start_at: string;
  end_at: string;
  mission_name: string;
  pack_id: string;
  rule: string;
  rule_x: string;
  rule_y: string;
  rule_z: string;
  description: string;
}

// Shop interfaces
export interface ShopBalloon {
  id: string;
  item_id: string;
  start_at: string;
  end_at: string;
  name: string;
}

export interface ShopItem {
  id: string;
  name: string;
  shop_id: string;
  type: string;
  sale_type: string;
  pay_money_first: string;
  pay_money_second: string;
  pay_realmoney_first: string;
  pay_realmoney_second: string;
  pay_realmoneyfree_first: string;
  pay_realmoneyfree_second: string;
  pack_id: string;
  external_id: string;
  apple_tier: string;
  google_yen_price: string;
  dmm_point: string;
  info_url: string;
  banner_url: string;
  graphics: string;
  limit_type: string;
  limit: string;
  buy_limit_resale: string;
  start_at: string;
  end_at: string;
  enable: string;
  description: string;
  recommend: string;
  value: string;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
}

// Target Costume interface
export interface TargetCostume {
  target_costume_id: string;
  target_cosutume_name: string;
  display_start: string;
}

// Title Theme interface
export interface TitleTheme {
  movie: string;
  logo: string;
  logo_sub: string;
  copyright_notation: string;
  jasrac_notation: string;
  copyright_image: string;
  display_start_at: string;
  display_end_at: string;
  bgm: string;
}

// Voice interface
export interface Voice {
  id: string;
  voice_set_id: string;
  set_order: string;
  chara_set_id: string;
  chara_id: string;
  name: string;
  quote_text: string;
  live2d_motion_id: string;
  motion_option: string;
  playplace: string;
  unlock_member: string;
  display_start: string;
  display_end: string;
  start_at: string;
  end_at: string;
}

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
