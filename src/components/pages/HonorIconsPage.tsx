import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Header } from '@/components/Header';
import { ZoomControls, type ZoomOption } from '@/components/common/ZoomControls';
import { ASSET_URL_BASE } from '@/constants';
import { useHonorIconData } from '@/hooks/useHonorIconData';

const sizeOptions: ZoomOption[] = [
  { label: 'Small', value: 0.5, icon: <ZoomOut className="w-4 h-4" /> },
  { label: 'Medium', value: 0.75, icon: <ZoomIn className="w-4 h-4" /> },
  { label: 'Original', value: 1.0, icon: <Maximize2 className="w-4 h-4" /> },
];

export function HonorIconsPage() {
  const [scale, setScale] = useState<number>(sizeOptions[1].value);
  const { data, isLoading, error } = useHonorIconData();

  const filteredData = useMemo(() => data?.filter((icon) => icon.icon) ?? [], [data]);

  const controls = <ZoomControls options={sizeOptions} value={scale} onChange={setScale} />;

  if (isLoading) {
    return (
      <>
        <Header title="Honor Icons">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-white">
          <span role="img" aria-label="loading">
            ⌛
          </span>{' '}
          Loading honor icons...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="Honor Icons">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-red-500">
          <span role="img" aria-label="error">
            ❌
          </span>{' '}
          Error loading honor icons: {error.message}
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Header title="Honor Icons">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-white">
          <span role="img" aria-label="not found">
            🔍
          </span>{' '}
          No honor icons found
        </div>
      </>
    );
  }

  const innerContainerClasses = 'p-4' + (scale >= 1.0 ? ' -m-10' : '');

  return (
    <>
      <Header title="Honor Icons">{controls}</Header>
      <div className="container mx-auto py-8">
        <div className={`${innerContainerClasses} text-center`} style={{ zoom: scale }}>
          {filteredData.map((icon) => (
            <div key={icon.id} className="group inline-block align-top m-1 relative">
              <div className="relative transition-all duration-200 flex items-center justify-center">
                <img src={ASSET_URL_BASE + icon.icon} alt={`Honor Icon ${icon.id}`} />
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
                  <p className="text-white font-bold text-lg">ID: {icon.id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
