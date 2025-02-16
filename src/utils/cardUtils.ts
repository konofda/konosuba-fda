import { CardData } from '@/types';
import { ASSET_URL_BASE } from '@/constants';

export const handleCardClick = (e: React.MouseEvent, card: CardData) => {
  if (!card.full_card) return;

  // Always prevent default to avoid scroll behavior
  e.preventDefault();

  const url = ASSET_URL_BASE + card.full_card;

  // Middle click or Ctrl/Cmd + click
  if (e.button === 1 || e.ctrlKey || e.metaKey) {
    window.open(url, '_blank', 'noopener');
    return;
  }

  // Normal left click
  if (e.button === 0) {
    window.open(url, '_blank')?.focus();
  }
};
