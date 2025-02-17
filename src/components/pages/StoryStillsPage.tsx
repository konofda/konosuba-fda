import { Eye, EyeOff, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

import { ASSET_URL_BASE } from '@/constants';
import { useStoryStillData } from '@/hooks/useStoryStillData';
import { LoadingImage } from '@/components/common/LoadingImage';
import { ZoomControls, type ZoomOption } from '@/components/common/ZoomControls';
import { Header } from '@/components/Header';

const sizeOptions: ZoomOption[] = [
  { label: 'Small', value: 0.32, icon: <ZoomOut className="w-4 h-4" /> },
  { label: 'Medium', value: 0.57, icon: <ZoomIn className="w-4 h-4" /> },
  { label: 'Large', value: 1.0, icon: <Maximize2 className="w-4 h-4" /> },
];

export function StoryStillsPage() {
  const [scale, setScale] = useState<number>(sizeOptions[1].value);
  const [showOnlyWithIcons, setShowOnlyWithIcons] = useState(true);
  const { data, isLoading, error } = useStoryStillData();

  const stills = data?.filter(still => 
    showOnlyWithIcons ? !!still.icon_still : true
  ) ?? [];

  const controls = (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setShowOnlyWithIcons(!showOnlyWithIcons)}
        className={`
          flex items-center gap-2 px-3 py-1 rounded
          transition-all duration-200 text-sm
          ${
            showOnlyWithIcons
              ? 'text-gray-300 hover:text-white'
              : 'bg-white text-gray-800 shadow'
          }
        `}
      >
        {showOnlyWithIcons ? (
          <Eye className="w-4 h-4" />
        ) : (
          <EyeOff className="w-4 h-4" />
        )}
        <span className="font-medium">
          {showOnlyWithIcons ? 'Showing only with icons' : 'Showing all stills'}
        </span>
      </button>
      <ZoomControls options={sizeOptions} value={scale} onChange={setScale} />
    </div>
  );

  if (isLoading) {
    return (
      <>
        <Header title="Story Stills">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-white">
          Loading stills...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="Story Stills">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-red-500">
          Error loading stills: {error.message}
        </div>
      </>
    );
  }

  const handleClick = (url: string) => {
    window.open(ASSET_URL_BASE + url, '_blank')?.focus();
  };

  const innerContainerClasses = 'p-4' + (scale >= 1.0 ? ' -m-10' : '');

  return (
    <>
      <Header title="Story Stills">{controls}</Header>
      <div className="container mx-auto py-8">
        <div className={innerContainerClasses} style={{ zoom: scale }}>
          {stills.map((still) => {
            const hasIcon = !!still.icon_still;
            const hasStill = !!still.still;
            const iconSrc = hasIcon
              ? ASSET_URL_BASE + still.icon_still
              : './img/frame_missing.png';

            return (
              <div
                key={still.id}
                className="group inline-block align-top m-1 relative"
              >
                <div
                  onClick={hasStill ? () => handleClick(still.still) : undefined}
                  className={`
                    relative rounded-lg shadow-md transition-all duration-200
                    ${hasStill ? 'cursor-pointer hover:scale-105 hover:shadow-xl hover:z-10' : 'cursor-not-allowed opacity-100'}
                  `}
                >
                  <LoadingImage
                    src={iconSrc}
                    placeholderSrc="./img/middle_icon_placeholder.png"
                    alt={`Still ${still.id}`}
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
                      ID: {still.id}
                    </p>
                    {!hasIcon && (
                      <p className="text-yellow-400 text-sm">Missing icon</p>
                    )}
                    {!hasStill && (
                      <p className="text-yellow-400 text-sm">Missing still</p>
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
