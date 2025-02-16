import { useState, useMemo } from 'react';
import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react';

import { ASSET_URL_BASE } from '@/constants';
import { useStoryBackgroundData } from '@/hooks/useStoryBackgroundData';
import { ZoomControls, type ZoomOption } from '@/components/common/ZoomControls';
import { LoadingImage } from '@/components/common/LoadingImage';
import { Header } from '@/components/Header';

const sizeOptions: ZoomOption[] = [
  { label: 'Small', value: 0.32, icon: <ZoomOut className="w-4 h-4" /> },
  { label: 'Medium', value: 0.57, icon: <ZoomIn className="w-4 h-4" /> },
  { label: 'Large', value: 1.0, icon: <Maximize2 className="w-4 h-4" /> },
];

export function StoryBackgroundsPage() {
  const [scale, setScale] = useState<number>(sizeOptions[1].value);
  const { data, isLoading, error } = useStoryBackgroundData();

  const processedData = useMemo(
    () => (data ? data.filter((story) => story.bg) : []),
    [data]
  );

  const controls = (
    <ZoomControls options={sizeOptions} value={scale} onChange={setScale} />
  );

  if (isLoading) {
    return (
      <>
        <Header title="Story Backgrounds">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-white">
          Loading backgrounds...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="Story Backgrounds">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-red-500">
          Error loading backgrounds: {error.message}
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
      <Header title="Story Backgrounds">{controls}</Header>
      <div className="container mx-auto py-8 w-full">
        <div className={innerContainerClasses} style={{ zoom: scale }}>
          {processedData.map((story) => {
            const hasIcon = !!story.icon_bg;

            return (
              <div
                key={story.id}
                className="group inline-block align-top m-2 relative"
              >
                <div
                  onClick={() => handleClick(story.bg)}
                  className="
                    relative rounded-lg shadow-md transition-all duration-200
                    cursor-pointer hover:scale-105 hover:shadow-xl hover:z-10
                  "
                >
                  <LoadingImage
                    src={
                      hasIcon
                        ? ASSET_URL_BASE + story.icon_bg
                        : './img/frame_na.png'
                    }
                    placeholderSrc="./img/middle_icon_placeholder.png"
                    alt={`Background ${story.id}`}
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
                      ID: {story.id}
                    </p>
                    {!hasIcon && (
                      <p className="text-yellow-400 text-sm">Missing icon</p>
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
