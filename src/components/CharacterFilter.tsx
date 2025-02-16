import { useMemo } from 'react';

import { ASSET_URL_BASE } from '@/constants';
import { useMemberCardData } from '@/hooks/useMemberCardData';
import { useStore } from '@/store';

export function CharacterFilter() {
  const { data } = useMemberCardData();
  const { selectedCharacters, toggleCharacter } = useStore();
  const isFilterActive = selectedCharacters.length > 0;

  const characters = useMemo(() => {
    if (!data) return [];

    const charMap = new Map<string, { name: string; icons: string[] }>();

    data.forEach((card) => {
      if (!charMap.has(card.base_id)) {
        charMap.set(card.base_id, {
          name: card.name,
          icons: [card.icon_small],
        });
      } else {
        charMap.get(card.base_id)?.icons.push(card.icon_small);
      }
    });

    return Array.from(charMap.entries()).map(([base_id, info]) => ({
      base_id,
      name: info.name,
      icons: info.icons,
    }));
  }, [data]);

  const handleClick = (e: React.MouseEvent, baseId: string) => {
    const isMultiSelect = e.ctrlKey || e.metaKey || e.shiftKey;
    toggleCharacter(baseId, isMultiSelect);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 p-4">
        {characters.map((char) => {
          const isSelected = selectedCharacters.includes(char.base_id);
          return (
            <button
              key={char.base_id}
              onClick={(e) => handleClick(e, char.base_id)}
              className="relative group"
            >
              <div
                className={`
                transition-all duration-200
                ${isSelected ? 'scale-110 z-20' : 'hover:scale-110 hover:z-10'}
                ${isFilterActive && !isSelected ? 'brightness-50 saturate-50' : ''}
              `}
              >
                <img
                  src={ASSET_URL_BASE + char.icons[0]}
                  alt={char.name}
                  className="w-20 h-20 rounded-lg"
                  loading="lazy"
                />
              </div>
              {char.name && (
                <div
                  className="
                  absolute left-1/2 -translate-x-1/2 -bottom-6
                  opacity-0 group-hover:opacity-100
                  transition-all duration-200
                  whitespace-nowrap z-30
                "
                >
                  <span
                    className="
                    text-white font-bold text-sm
                    bg-black/80 backdrop-blur-sm rounded px-2 py-0.5
                  "
                  >
                    {char.name}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="text-center my-8">
        <img className="inline-block" src="./sep.png" />
      </div>
    </div>
  );
}
