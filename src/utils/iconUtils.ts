import { StoryData, StillData } from '@/types';

// Find the closest existing icon by searching backwards through IDs
export function findClosestIcon<
  T extends { id: string; icon_bg?: string | null; icon_still?: string | null },
>(
  items: T[],
  currentId: string,
  iconKey: 'icon_bg' | 'icon_still'
): string | null {
  // Convert ID to number for comparison
  const currentNum = parseInt(currentId, 10);
  if (isNaN(currentNum)) return null;

  // Sort items by ID in descending order
  const sortedItems = [...items].sort(
    (a, b) => parseInt(b.id, 10) - parseInt(a.id, 10)
  );

  // Find the closest item with an icon that comes before the current ID
  const closestItem = sortedItems.find(
    (item) => parseInt(item.id, 10) <= currentNum && item[iconKey]
  );

  return closestItem?.[iconKey] ?? null;
}

// Process story data to include fallback icons
export function processStoryData(stories: StoryData[]): StoryData[] {
  return stories
    .filter((story) => story.bg) // Filter out entries without a background
    .map((story) => {
      if (story.icon_bg) return story;

      // Find fallback icon
      const fallbackIcon = findClosestIcon(stories, story.id, 'icon_bg');
      return {
        ...story,
        icon_bg: fallbackIcon || story.bg, // Use bg as last resort
      };
    });
}

// Process still data to include fallback icons
export function processStillData(stills: StillData[]): StillData[] {
  return stills
    .filter((still) => still.stills.length > 0) // Filter out entries without stills
    .map((still) => {
      if (still.icon_still) return still;

      // Find fallback icon
      const fallbackIcon = findClosestIcon(stills, still.id, 'icon_still');
      return {
        ...still,
        icon_still: fallbackIcon || still.stills[0], // Use first still as last resort
      };
    });
}
