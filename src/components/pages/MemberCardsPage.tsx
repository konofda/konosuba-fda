import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { useMemo, useState } from 'react';

import { ASSET_URL_BASE } from '@/constants';
import { useMemberCardData } from '@/hooks/useMemberCardData';
import { useStore } from '@/store';
import { handleCardClick } from '@/utils/cardUtils';
import { CharacterFilter } from '@/components/CharacterFilter';
import { LoadingImage } from '@/components/common/LoadingImage';
import {
  ZoomControls,
  type ZoomOption,
} from '@/components/common/ZoomControls';
import { Header } from '@/components/Header';

const sizeOptions: ZoomOption[] = [
  { label: 'Small', value: 0.32, icon: <ZoomOut className="w-4 h-4" /> },
  { label: 'Medium', value: 0.57, icon: <ZoomIn className="w-4 h-4" /> },
  { label: 'Large', value: 1.0, icon: <Maximize2 className="w-4 h-4" /> },
];

export function MemberCardsPage() {
  const [scale, setScale] = useState<number>(sizeOptions[1].value);
  const { data, isLoading, error } = useMemberCardData();
  const selectedCharacters = useStore((state) => state.selectedCharacters);

  const filteredData = useMemo(
    () =>
      (selectedCharacters.length > 0
        ? data?.filter((card) => selectedCharacters.includes(card.base_id))
        : data) ?? [],
    [data, selectedCharacters]
  );

  const controls = (
    <ZoomControls options={sizeOptions} value={scale} onChange={setScale} />
  );

  if (isLoading) {
    return (
      <>
        <Header title="Cards">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-white">
          Loading cards...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="Cards">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-red-500">
          Error loading cards: {error.message}
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Header title="Cards">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-white">
          No member cards found
        </div>
      </>
    );
  }

  const innerContainerClasses = 'p-4' + (scale >= 1.0 ? ' -m-10' : '');

  return (
    <>
      <Header title="Cards">{controls}</Header>
      <div className="container mx-auto py-8">
        <CharacterFilter />
        <div className={innerContainerClasses} style={{ zoom: scale }}>
          {filteredData.map((card) => {
            const hasFullCard = !!card.full_card;
            const displayText = card.name || `ID: ${card.id}`;

            return (
              <div
                key={card.id}
                className="group inline-block align-top m-1 relative"
              >
                <div
                  onClick={(e) => hasFullCard && handleCardClick(e, card)}
                  onMouseDown={(e) => e.preventDefault()}
                  onAuxClick={(e) => hasFullCard && handleCardClick(e, card)}
                  className={`
                    relative rounded-lg shadow-md transition-all duration-200 flex items-center justify-center
                    ${
                      hasFullCard
                        ? 'cursor-pointer hover:scale-105 hover:shadow-xl hover:z-10'
                        : 'cursor-not-allowed'
                    }
                  `}
                >
                  <LoadingImage
                    src={ASSET_URL_BASE + card.icon_middle}
                    placeholderSrc="./img/middle_icon_placeholder.webp"
                    alt={`${displayText} Icon`}
                  />
                </div>
                <div
                  className="
                  absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full pt-2
                  opacity-0 group-hover:opacity-100
                  transition-all duration-200 z-20
                  pointer-events-none
                "
                >
                  <div
                    className="
                    bg-black/80 backdrop-blur-sm rounded-lg px-8 py-2
                    text-center whitespace-nowrap
                  "
                  >
                    <p className="text-white font-bold text-3xl">
                      {displayText}
                    </p>
                    {card.is_collab && (
                      <p className="text-cyan-300 text-lg">(Collab)</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
