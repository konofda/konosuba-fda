import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
  ZoomControls,
  type ZoomOption,
} from '@/components/common/ZoomControls';
import { Header } from '@/components/Header';
import { ASSET_URL_BASE } from '@/constants';
import { useMemberCardData } from '@/hooks/useMemberCardData';
import { handleCardClick } from '@/utils/cardUtils';

const sizeOptions: ZoomOption[] = [
  { label: 'Small', value: 0.5, icon: <ZoomOut className="w-4 h-4" /> },
  { label: 'Medium', value: 0.75, icon: <ZoomIn className="w-4 h-4" /> },
  { label: 'Original', value: 1.0, icon: <Maximize2 className="w-4 h-4" /> },
];

export function MemberTallIconsPage() {
  const [scale, setScale] = useState<number>(sizeOptions[1].value);
  const { data, isLoading, error } = useMemberCardData();

  const filteredData = useMemo(
    () => data?.filter((card) => card.icon_large) ?? [],
    [data]
  );

  const controls = (
    <ZoomControls options={sizeOptions} value={scale} onChange={setScale} />
  );

  if (isLoading) {
    return (
      <>
        <Header title="Tall Icons">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-white">
          Loading icons...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="Tall Icons">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-red-500">
          Error loading icons: {error.message}
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Header title="Tall Icons">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-white">
          No icons found
        </div>
      </>
    );
  }

  const innerContainerClasses = 'p-4' + (scale >= 1.0 ? ' -m-10' : '');

  return (
    <>
      <Header title="Tall Icons">{controls}</Header>
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
                    relative rounded-lg shadow-md transition-all duration-200 flex items-center justify-center overflow-hidden
                    group-hover:z-10
                    ${hasFullCard ? 'cursor-pointer hover:scale-105 hover:shadow-xl' : 'opacity-50 cursor-not-allowed'}
                  `}
                >
                  <img
                    src={ASSET_URL_BASE + card.icon_large}
                    alt={`${displayText} Icon`}
                    className="w-auto h-auto rounded-lg"
                    loading="lazy"
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
                    bg-black/80 backdrop-blur-sm rounded px-3 py-1.5
                    text-center whitespace-nowrap
                  "
                  >
                    {card.is_collab && (
                      <p className="text-cyan-400 text-sm font-bold">
                        (Collab)
                      </p>
                    )}
                    <p className="text-white font-bold text-lg">
                      {displayText}
                    </p>
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
