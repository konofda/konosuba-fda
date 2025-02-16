import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';

export interface MiscItemData {
  type: string;
  id: string;
  name: string;
  description: string;
  questskip_target?: string;
  icon_path: string;
  category: string;
}

export const CATEGORY_LABELS: Record<MiscItemData['category'], string> = {
  lv: 'Power Potions',
  love: 'Gift Items',
  skill: 'Skill Potions',
  wa: 'Weapon/Accessory Materials',
  limit: 'Limit Break Materials',
};

async function fetchMiscItemData(): Promise<MiscItemData[]> {
  const response = await fetch(`${API_URL_BASE}v1/items-misc.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch misc item data');
  }
  return response.json();
}

export function useItemMiscData() {
  return useQuery({
    queryKey: ['miscItemData'],
    queryFn: fetchMiscItemData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
