import { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Image, UserCircle2 } from 'lucide-react';

import { ASSET_URL_BASE } from '@/constants';
import { Header } from '@/components/Header';
import { LoadingImage } from '@/components/common/LoadingImage';
import {
  ZoomControls,
  type ZoomOption,
} from '@/components/common/ZoomControls';
import { useEnemyData, type EnemyData } from '@/hooks/useEnemyData';

type ViewMode = 'icon' | 'image';

const ICON_SIZE_OPTIONS: ZoomOption[] = [
  { label: 'Small', value: 0.5, icon: <ZoomOut className="w-4 h-4" /> },
  { label: 'Medium', value: 0.75, icon: <ZoomIn className="w-4 h-4" /> },
  { label: 'Original', value: 1.0, icon: <Maximize2 className="w-4 h-4" /> },
];

const IMAGE_SIZE_OPTIONS: ZoomOption[] = [
  { label: 'Small', value: 0.2, icon: <ZoomOut className="w-4 h-4" /> },
  { label: 'Medium', value: 0.45, icon: <ZoomIn className="w-4 h-4" /> },
  { label: 'Original', value: 1.0, icon: <Maximize2 className="w-4 h-4" /> },
];

interface ViewToggleProps {
  viewMode: ViewMode;
  onToggle: () => void;
}

function ViewToggle({ viewMode, onToggle }: ViewToggleProps) {
  const icon = viewMode === 'icon' ? (
    <UserCircle2 className="w-4 h-4" />
  ) : (
    <Image className="w-4 h-4" />
  );
  const label = viewMode === 'icon' ? 'Icons' : 'Images';

  return (
    <button
      onClick={onToggle}
      className="
        flex items-center gap-2 px-3 py-1.5 rounded-lg
        bg-white/10 hover:bg-white/20
        transition-colors duration-200
        text-sm font-medium text-white
      "
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

interface BaseViewProps {
  onToggle: () => void;
  data: EnemyData[];
}

function LoadingView({ onToggle }: Pick<BaseViewProps, 'onToggle'>) {
  return (
    <>
      <Header title="Enemies">
        <ViewToggle viewMode="icon" onToggle={onToggle} />
      </Header>
      <div className="container mx-auto py-8 text-center text-white">
        <span role="img" aria-label="loading">⌛</span> Loading enemies...
      </div>
    </>
  );
}

function IconsView({ data, onToggle }: BaseViewProps) {
  const [scale, setScale] = useState<number>(ICON_SIZE_OPTIONS[1].value);
  const innerContainerClasses = 'p-4' + (scale >= 1.0 ? ' -m-10' : '');

  return (
    <>
      <Header title="Enemies">
        <div className="flex items-center gap-4">
          <ViewToggle viewMode="icon" onToggle={onToggle} />
          <ZoomControls
            options={ICON_SIZE_OPTIONS}
            value={scale}
            onChange={setScale}
          />
        </div>
      </Header>
      <div className="container mx-auto py-8">
        <div className={`${innerContainerClasses} text-center`} style={{ zoom: scale }}>
          {data.map((enemy) => (
            <div
              key={enemy.id}
              className="group inline-block align-top m-1 relative"
            >
              <div className="relative transition-all duration-200 flex items-center justify-center">
                <LoadingImage
                  src={ASSET_URL_BASE + enemy.icon}
                  alt={`Enemy ${enemy.id} Icon`}
                  placeholderSrc="/img/small_icon_placeholder.webp"
                />
              </div>
              <div className="
                absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full pt-2
                opacity-0 group-hover:opacity-100
                transition-all duration-200 z-20
                pointer-events-none
              ">
                <div className="
                  bg-black/80 backdrop-blur-sm rounded px-2 py-1
                  text-center whitespace-nowrap
                ">
                  <p className="text-white font-bold text-lg">
                    ID: {enemy.id}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ImagesView({ data, onToggle }: BaseViewProps) {
  const [scale, setScale] = useState<number>(IMAGE_SIZE_OPTIONS[1].value);
  const innerContainerClasses = 'p-4' + (scale >= 1.0 ? ' -m-10' : '');

  return (
    <>
      <Header title="Enemies">
        <div className="flex items-center gap-4">
          <ViewToggle viewMode="image" onToggle={onToggle} />
          <ZoomControls
            options={IMAGE_SIZE_OPTIONS}
            value={scale}
            onChange={setScale}
          />
        </div>
      </Header>
      <div className="container mx-auto py-8">
        <div className={`${innerContainerClasses} text-center`} style={{ zoom: scale }}>
          {data.map((enemy) => (
            <div
              key={enemy.id}
              className="group inline-block align-top m-1 relative"
            >
              <div className="relative transition-all duration-200 flex items-center justify-center">
                <img
                  src={ASSET_URL_BASE + enemy.image}
                  alt={`Enemy ${enemy.id} Image`}
                />
              </div>
              <div className="
                absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full pt-2
                opacity-0 group-hover:opacity-100
                transition-all duration-200 z-20
                pointer-events-none
              ">
                <div className="
                  bg-black/80 backdrop-blur-sm rounded px-2 py-1
                  text-center whitespace-nowrap
                ">
                  <p className="text-white font-bold text-lg">
                    ID: {enemy.id}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function EnemiesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('icon');
  const { data, isLoading } = useEnemyData();

  const toggleView = () => {
    setViewMode((prev) => {
      const next = prev === 'icon' ? 'image' : 'icon';
      console.log('👁️ Switching to', next, 'view');
      return next;
    });
  };

  if (isLoading || !data) {
    return <LoadingView onToggle={toggleView} />;
  }

  const filteredData = data.filter((enemy) => enemy[viewMode]);
  
  return viewMode === 'icon' ? (
    <IconsView data={filteredData} onToggle={toggleView} />
  ) : (
    <ImagesView data={filteredData} onToggle={toggleView} />
  );
} 