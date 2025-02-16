import { useQuery } from '@tanstack/react-query';
import { API_URL_BASE } from '@/constants';
import type { CardData } from '@/types';

async function fetchCardData(): Promise<CardData[]> {
  const response = await fetch(API_URL_BASE + 'v1/member-cards.json');
  if (!response.ok) {
    throw new Error('Failed to fetch card data');
  }
  return response.json();
}

export function useMemberCardData() {
  return useQuery({
    queryKey: ['cardData'],
    queryFn: fetchCardData,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
  });
}
