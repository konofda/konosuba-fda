import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';

export interface WeaponDetail {
  id: string;
  item_id: string;
  item_id_details: string;
  lv?: string;
  attack: string;
  skill?: string;
  sell?: string;
  material1?: string;
  material2?: string;
  material3?: string;
  material4?: string;
  num1?: string;
  num2?: string;
  num3?: string;
  num4?: string;
  money?: string;
}

export interface WeaponData {
  id: string;
  item_id: string;
  enable: string;
  start_at?: string;
  unlock_playerrank?: string;
  name?: string;
  flavor_text?: string;
  weapon_type?: string;
  rare?: string;
  material1?: string;
  material2?: string;
  material3?: string;
  num1?: string;
  num2?: string;
  num3?: string;
  money?: string;
  icon_path: string;
  details: WeaponDetail[];
}

async function fetchWeaponData(): Promise<WeaponData[]> {
  const response = await fetch(`${API_URL_BASE}v1/items-weapon.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch weapon data');
  }
  return response.json();
}

export function useItemWeaponData() {
  return useQuery({
    queryKey: ['weaponData'],
    queryFn: fetchWeaponData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
} 
