import { useState } from 'react';
import { ZoomOut, Maximize2 } from 'lucide-react';

import { ASSET_URL_BASE } from '@/constants';
import { useCharacterData } from '@/hooks/useCharacterData';
import { ZoomControls, type ZoomOption } from '@/components/common/ZoomControls';
import { Header } from '@/components/Header';

const sizeOptions: ZoomOption[] = [
  { label: 'Small', value: 0.5, icon: <ZoomOut className="w-4 h-4" /> },
  { label: 'Original', value: 1.0, icon: <Maximize2 className="w-4 h-4" /> },
];

export function MemberCharactersListPage() {
  const [scale, setScale] = useState<number>(sizeOptions[0].value);
  const { data, isLoading, error } = useCharacterData();

  const controls = (
    <ZoomControls options={sizeOptions} value={scale} onChange={setScale} />
  );

  if (isLoading) {
    return (
      <>
        <Header title="Member Characters List">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-white">
          Loading character select images...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="Member Characters List">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-red-500">
          Error loading character select images: {error.message}
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Header title="Member Characters List">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-white">
          No character images found
        </div>
      </>
    );
  }

  const innerContainerClasses = 'p-4' + (scale >= 1.0 ? ' -m-10' : '');

  return (
    <>
      <Header title="Member Characters List">{controls}</Header>
      <div className="container mx-auto py-8">
        <div className={innerContainerClasses} style={{ zoom: scale }}>
          {data.map((character, index) => {
            return (
              <div
                key={character.base_id}
                className="group inline-block align-top m-1 relative"
              >
                <div
                  className="
                  relative rounded-lg transition-all duration-200
                  hover:scale-105 hover:z-10
                "
                >
                  <img
                    src={ASSET_URL_BASE + character.image_sprite}
                    alt={character.name}
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
                    bg-black/80 backdrop-blur-sm rounded px-2 py-1
                    text-center whitespace-nowrap
                  "
                  >
                    <p className="text-white font-bold text-lg">
                      {character.name}
                      {character.is_collab && " (Collab)"}
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
