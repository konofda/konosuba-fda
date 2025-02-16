import { Eye, EyeOff, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { useMemo, useState } from 'react';

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

type StoryStillProps = {
  id: string;
  splash: string;
  icon: string | null;
  index: number;
  total: number;
};

export function StoryStillsPage() {
  const [scale, setScale] = useState<number>(sizeOptions[1].value);
  const [showAllStills, setShowAllStills] = useState(false);
  const { data, isLoading, error } = useStoryStillData();

  const flattenedStills = useMemo(() => {
    if (!data) return [];

    return data.reduce((acc, still) => {
      // Only process stills that have actual still images
      if (still.stills.length === 0) return acc;

      // Filter stills based on showAllStills
      const stillsToProcess = showAllStills
        ? still.stills
        : still.stills.slice(0, 1);

      // Add each still with its parent's metadata
      const stillsWithMetadata = stillsToProcess.map((stillUrl, index) => ({
        id: still.id,
        splash: stillUrl,
        icon: still.icon_still,
        index: index + 1,
        total: still.stills.length,
      }));

      return [...acc, ...stillsWithMetadata];
    }, [] as StoryStillProps[]);
  }, [data, showAllStills]);

  const controls = (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setShowAllStills(!showAllStills)}
        className={`
          flex items-center gap-2 px-3 py-1 rounded
          transition-all duration-200 text-sm
          ${
            showAllStills
              ? 'text-gray-300 hover:text-white'
              : 'bg-white text-gray-800 shadow'
          }
        `}
      >
        {showAllStills ? (
          <Eye className="w-4 h-4" />
        ) : (
          <EyeOff className="w-4 h-4" />
        )}
        <span className="font-medium">
          {showAllStills ? 'Showing all stills' : 'First stills only'}
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
          {flattenedStills.map((still) => {
            const hasIcon = !!still.icon;
            const isFirstStill = still.index === 1;
            const iconSrc = !hasIcon
              ? './img/frame_missing.png'
              : !isFirstStill
                ? './img/frame_na.png'
                : ASSET_URL_BASE + still.icon;

            return (
              <div
                key={`${still.id}-${still.index}`}
                className="group inline-block align-top m-1 relative"
              >
                <div
                  onClick={() => handleClick(still.splash)}
                  className="
                    relative rounded-lg shadow-md transition-all duration-200
                    cursor-pointer hover:scale-105 hover:shadow-xl hover:z-10
                  "
                >
                  <LoadingImage
                    src={iconSrc}
                    placeholderSrc="./img/middle_icon_placeholder.png"
                    alt={`Still ${still.id}-${still.index}`}
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
                    {still.total > 1 && (
                      <p className="text-gray-300 text-sm">
                        Still {still.index} of {still.total}
                      </p>
                    )}
                    {!hasIcon && (
                      <p className="text-yellow-400 text-sm">Missing icon</p>
                    )}
                    {hasIcon && !isFirstStill && (
                      <p className="text-yellow-400 text-sm">Icon mismatch</p>
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
