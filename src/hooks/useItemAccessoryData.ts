import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';

export interface AccessoryDetail {
  id: string;
  item_id: string;
  item_id_details: string;
  lv?: string;
  defense: string;
  magicdefence: string;
  skill?: string;
  sell: string;
  item_type1?: string;
  material1?: string;
  num1?: string;
  item_type2?: string;
  material2?: string;
  num2?: string;
  item_type3?: string;
  material3?: string;
  num3?: string;
  money?: string;
}

export interface AccessoryData {
  id: string;
  item_id: string;
  enable: string;
  start_at?: string;
  unlock_playerrank: string;
  name: string;
  flavor_text: string;
  rare: string;
  item_type1: string;
  material1: string;
  num1: string;
  item_type2: string;
  material2: string;
  num2: string;
  item_type3?: string;
  material3?: string;
  num3?: string;
  money: string;
  icon_path: string;
  details: AccessoryDetail[];
}

async function fetchAccessoryData(): Promise<AccessoryData[]> {
  const response = await fetch(`${API_URL_BASE}v1/items-accessory.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch accessory data');
  }
  return response.json();
}

export function useItemAccessoryData() {
  return useQuery({
    queryKey: ['accessoryData'],
    queryFn: fetchAccessoryData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
} 
