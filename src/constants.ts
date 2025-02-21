import { ComponentType } from 'react';
import { GalleryItemsPage } from './components/pages/GalleryItemsPage';
import { HonorIconsPage } from './components/pages/HonorIconsPage';
import { ItemsAccessoryPage } from './components/pages/ItemsAccessoryPage';
import { ItemsMiscPage } from './components/pages/ItemsMiscPage';
import { ItemsWeaponPage } from './components/pages/ItemsWeaponPage';
import { MemberCardsPage } from './components/pages/MemberCardsPage';
import { MemberCharactersCarouselPage } from './components/pages/MemberCharactersCarouselPage';
import { MemberCharactersListPage } from './components/pages/MemberCharactersListPage';
import { MemberSmallIconsPage } from './components/pages/MemberSmallIconsPage';
import { MemberTallIconsPage } from './components/pages/MemberTallIconsPage';
import { ModelsLive2DPage } from './components/pages/ModelsLive2DPage';
import { ModelsSpineGridPage } from './components/pages/ModelsSpineGridPage';
import { MusicPage } from './components/pages/MusicPage';
import { PixiDemoPage } from './components/pages/PixiDemoPage';
import { RoulettePage } from './components/pages/RoulettePage';
import { SongsPage } from './components/pages/SongsPage';
import { StoryBackgroundsPage } from './components/pages/StoryBackgroundsPage';
import { StoryIconsPage } from './components/pages/StoryIconsPage';
import { StoryScriptsPage } from './components/pages/StoryScriptsPage';
import { StoryStillsPage } from './components/pages/StoryStillsPage';
import { TitlePage } from './components/pages/TitlePage';
import { VideosPage } from './components/pages/VideosPage';
import { EnemiesPage } from './components/pages/EnemiesPage';
import { DungeonsPage } from './components/pages/DungeonsPage';
import { EventsPage } from './components/pages/EventsPage';

export const ASSET_URL_BASE =
  'https://raw.githubusercontent.com/HaiKonofanDesu/konofan-assets-jp-sortet/main/';
export const API_URL_BASE = 'https://konofda.github.io/konosuba-fda-api/';

interface RouteConfig {
  path: string;
  label: string;
  view: ComponentType;
  backgroundClass: string;
  patternColor: string;
  patternScale?: number;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const DEFAULT_ROUTE_PROPS: Partial<RouteConfig> = {
  type: 'secondary' as const,
  disabled: false,
  patternColor: '#FFF3',
  patternScale: 0.7,
};

export const ROUTES: Required<RouteConfig>[] = [
  {
    path: 'title',
    label: 'Title',
    view: TitlePage,
    // backgroundClass: 'bg-gradient-to-br from-sky-100 via-rose-50 to-lime-100',
    backgroundClass: `paperbg`,
    patternColor: '#fff0',
    patternScale: 1.2,
    type: 'primary',
    disabled: true,
  },
  {
    path: 'cards',
    label: 'Member Cards',
    view: MemberCardsPage,
    backgroundClass:
      'bg-gradient-to-r from-[#e5d8c7] via-[#f8f1e8] to-[#e5d8c7]',
    patternColor: '#FFF3',
    type: 'primary',
  },
  {
    path: 'character-carousel',
    label: 'Member Characters',
    view: MemberCharactersCarouselPage,
    backgroundClass:
      'bg-gradient-to-r from-[#e6d9d1] via-[#f7eae1] to-[#e6d9d1]',
    patternColor: '#fff3',
    patternScale: 1.25,
    type: 'primary',
  },
  {
    path: 'character-list',
    label: 'Member Characters List',
    view: MemberCharactersListPage,
    backgroundClass:
      'bg-gradient-to-br from-teal-100 via-slate-200 to-blue-200',
    patternColor: '#fff4',
    type: 'secondary',
  },
  {
    path: 'small-icons',
    label: 'Member Icons (small)',
    view: MemberSmallIconsPage,
    backgroundClass:
      'bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400',
    patternColor: '#fff2',
  },
  {
    path: 'tall-icons',
    label: 'Member Icons (tall)',
    view: MemberTallIconsPage,
    backgroundClass:
      'bg-gradient-to-r from-warm-gray-800 via-warm-gray-600 to-warm-gray-800',
    patternColor: '#fff1',
  },
  {
    path: 'story-backgrounds',
    label: 'Story Backgrounds',
    view: StoryBackgroundsPage,
    backgroundClass:
      'bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500',
    patternColor: '#f0f0f019',
    type: 'primary',
  },
  {
    path: 'story-stills',
    label: 'Story Stills',
    view: StoryStillsPage,
    backgroundClass: 'bg-gradient-to-br from-pink-950 via-red-800 to-red-950',
    patternColor: '#F092',
    type: 'primary',
  },
  {
    path: 'story-scripts',
    label: 'Story Scripts',
    view: StoryScriptsPage,
    backgroundClass: 'bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400',
    patternColor: '#90f1',
    type: 'primary',
  },
  {
    path: 'story-icons',
    label: 'Story Icons',
    view: StoryIconsPage,
    backgroundClass:
      'bg-gradient-to-br from-violet-400 via-fuchsia-500 to-pink-500',
    patternColor: '#fff2',
    type: 'secondary',
  },
  {
    path: 'gallery-items',
    label: 'Gallery Items',
    view: GalleryItemsPage,
    backgroundClass:
      'bg-gradient-to-br from-amber-500 via-orange-400 to-yellow-500',
    patternColor: '#fff2',
    type: 'secondary',
  },
  {
    path: 'live2d',
    label: 'Live2D Models (WIP)',
    view: ModelsLive2DPage,
    backgroundClass:
      'bg-gradient-to-br from-blue-950 via-indigo-950 to-violet-950',
    patternColor: '#3691',
    type: 'primary',
  },
  {
    path: 'spine-grid',
    label: 'Spine Models',
    view: ModelsSpineGridPage,
    backgroundClass:
      'bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950',
    patternColor: '#63f1',
    type: 'primary',
  },
  {
    path: 'pixi-demo',
    label: 'PixiJS Demo',
    view: PixiDemoPage,
    backgroundClass: 'bg-gradient-to-br from-gray-950 via-zinc-900 to-gray-950',
    patternColor: '#0002',
    patternScale: 1.0,
    type: 'secondary',
    disabled: true,
  },
  {
    path: 'videos',
    label: 'Videos',
    view: VideosPage,
    backgroundClass:
      'bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950',
    patternColor: '#0003',
    patternScale: 1.0,
    type: 'primary',
  },
  {
    path: 'songs',
    label: 'Songs',
    view: SongsPage,
    backgroundClass: 'bg-gradient-to-r from-rose-950 via-pink-900 to-rose-950',
    patternColor: '#0002',
    patternScale: 1.0,
    type: 'primary',
  },
  {
    path: 'music',
    label: 'Music',
    view: MusicPage,
    backgroundClass:
      'bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950',
    patternColor: '#0002',
    patternScale: 1.0,
    type: 'primary',
  },
  {
    path: 'items-weapon',
    label: 'Items (Weapon)',
    view: ItemsWeaponPage,
    backgroundClass:
      'bg-gradient-to-br from-orange-950 via-red-900 to-orange-950',
    patternColor: '#0002',
    type: 'primary',
    disabled: false,
  },
  {
    path: 'items-accessory',
    label: 'Items (Accessory)',
    view: ItemsAccessoryPage,
    backgroundClass:
      'bg-gradient-to-br from-amber-950 via-yellow-900 to-amber-950',
    patternColor: '#0002',
    type: 'primary',
    disabled: false,
  },
  {
    path: 'items-misc',
    label: 'Items (Misc)',
    view: ItemsMiscPage,
    backgroundClass:
      'bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950',
    patternColor: '#0002',
    type: 'primary',
    disabled: false,
  },
  {
    path: 'roulette',
    label: 'Roulette',
    view: RoulettePage,
    backgroundClass:
      'bg-gradient-to-br from-amber-950 via-yellow-900 to-amber-950',
    patternColor: '#0002',
    patternScale: 1.0,
    type: 'secondary',
    disabled: false,
  },
  {
    path: 'honor-icons',
    label: 'Honor Icons',
    view: HonorIconsPage,
    backgroundClass:
      'bg-gradient-to-b from-amber-950 via-yellow-900 to-amber-950',
    patternColor: '#fff1',
    type: 'primary',
    disabled: false,
  },
  {
    path: 'enemies',
    label: 'Enemies',
    view: EnemiesPage,
    backgroundClass:
      'bg-gradient-to-r from-gray-950 via-rose-950 to-gray-950',
    patternColor: '#0003',
    type: 'primary',
    disabled: false,
  },
  {
    path: 'dungeons',
    label: 'Dungeons',
    view: DungeonsPage,
    backgroundClass:
      'bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950',
    patternColor: '#0002',
    type: 'primary',
    disabled: false,
  },
  {
    path: 'events',
    label: 'Events',
    view: EventsPage,
    backgroundClass:
      'bg-gradient-to-r from-violet-950 via-purple-950 to-violet-950',
    patternColor: '#0002',
    type: 'primary',
    disabled: false,
  },
].map(
  (route) => ({ ...DEFAULT_ROUTE_PROPS, ...route }) as Required<RouteConfig>
);
