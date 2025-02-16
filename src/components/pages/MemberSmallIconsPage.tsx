import { useState, useMemo } from 'react';

import { ASSET_URL_BASE } from '@/constants';
import { handleCardClick } from '@/utils/cardUtils';
import {
  ZoomControls,
  type ZoomOption,
} from '@/components/common/ZoomControls';
import { Header } from '@/components/Header';
import { useMemberCardData } from '@/hooks/useMemberCardData';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { LoadingImage } from '../common/LoadingImage';

const sizeOptions: ZoomOption[] = [
  { label: 'Tiny', value: 0.4, icon: <ZoomOut className="w-4 h-4" /> },
  { label: 'Small', value: 0.7, icon: <ZoomIn className="w-4 h-4" /> },
  { label: 'Original', value: 1.0, icon: <Maximize2 className="w-4 h-4" /> },
];

export function MemberSmallIconsPage() {
  const [scale, setScale] = useState<number>(sizeOptions[1].value);
  const { data, isLoading, error } = useMemberCardData();

  const filteredData = useMemo(
    () => data?.filter((card) => card.icon_small) ?? [],
    [data]
  );

  const controls = (
    <ZoomControls options={sizeOptions} value={scale} onChange={setScale} />
  );

  if (isLoading) {
    return (
      <>
        <Header title="Small Icons">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-white">
          Loading icons...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="Small Icons">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-red-500">
          Error loading icons: {error.message}
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Header title="Small Icons">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-white">
          No icons found
        </div>
      </>
    );
  }

  const innerContainerClasses = 'p-4' + (scale >= 1.0 ? ' -m-10' : '');

  return (
    <>
      <Header title="Small Icons">{controls}</Header>
      <div className="container mx-auto py-8">
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
                    group-hover:z-10
                    ${hasFullCard ? 'cursor-pointer hover:scale-105 hover:shadow-xl' : 'opacity-50 cursor-not-allowed'}
                  `}
                >
                  <LoadingImage
                    src={ASSET_URL_BASE + card.icon_small}
                    placeholderSrc={'/img/small_icon_placeholder.webp'}
                    alt={`${displayText} Icon`}
                    className="w-auto h-auto rounded-lg"
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
                    bg-black/80 backdrop-blur-sm rounded px-2 py-1
                    text-center whitespace-nowrap
                  "
                  >
                    <p className="text-white font-bold text-3xl">
                      {displayText}
                    </p>
                    {card.is_collab && (
                      <p className="text-cyan-400 text-md">(Collab)</p>
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
