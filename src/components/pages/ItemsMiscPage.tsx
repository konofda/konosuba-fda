import { Package } from 'lucide-react';
import { useMemo, useState } from 'react';

import { LoadingImage } from '@/components/common/LoadingImage';
import { Header } from '@/components/Header';
import { ASSET_URL_BASE } from '@/constants';
import { CATEGORY_LABELS, useItemMiscData, type MiscItemData } from '@/hooks/useItemMiscData';

function MiscItemDetails({ item }: { item: MiscItemData }) {
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-white text-center">
          {item.name}
        </h2>
        <div className="flex justify-center">
          <LoadingImage
            src={ASSET_URL_BASE + item.icon_path}
            alt={item.name}
            placeholderSrc="/img/small_icon_placeholder.webp"
          />
        </div>
      </div>

      {item.description && (
        <div className="text-sm text-white/80 italic text-center">{item.description}</div>
      )}

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="text-white/60">Category</div>
        <div className="text-white">{CATEGORY_LABELS[item.category]}</div>
        <div className="text-white/60">Type</div>
        <div className="text-white">{item.type}</div>
        {item.questskip_target && (
          <>
            <div className="text-white/60">Quest Skip</div>
            <div className="text-white">{item.questskip_target}</div>
          </>
        )}
      </div>
    </div>
  );
}

export function ItemsMiscPage() {
  const { data: items, isLoading } = useItemMiscData();
  const [selectedItem, setSelectedItem] = useState<MiscItemData | null>(null);

  const itemsByCategory = useMemo(() => {
    if (!items?.length) return {};
    return items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, MiscItemData[]>);
  }, [items]);

  if (isLoading) {
    return (
      <>
        <Header title="Items (Misc)" />
        <div className="container mx-auto py-8 text-center text-white">
          Loading items...
        </div>
      </>
    );
  }

  if (!items?.length) {
    return (
      <>
        <Header title="Items (Misc)" />
        <div className="container mx-auto py-8 text-center text-white">
          No items found
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Items (Misc)" />
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-6">
            {Object.entries(itemsByCategory).map(([category, categoryItems]) => (
              <div key={category} className="space-y-2">
                <h3 className="text-lg font-semibold text-white/90">
                  {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
                </h3>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
                  {categoryItems.map((item) => (
                    <button
                      key={`${item.type}-${item.id}`}
                      onClick={() => setSelectedItem(item)}
                      className={`
                        relative rounded-lg p-2 transition-all duration-200
                        hover:bg-white/5 hover:scale-105
                        ${selectedItem?.id === item.id && selectedItem?.type === item.type ? 'bg-white/10 ring-2 ring-white/20' : ''}
                      `}
                    >
                      <LoadingImage
                        src={ASSET_URL_BASE + item.icon_path}
                        alt={item.name}
                        className="w-full aspect-square rounded-lg"
                        placeholderSrc="/img/small_icon_placeholder.webp"
                      />
                      <div className="h-10 mt-2 relative">
                        <div className="text-xs text-center text-white/90 line-clamp-2 absolute inset-x-2 top-0">
                          {item.name}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-96 border-l border-white/10 overflow-auto">
          {selectedItem ? (
            <MiscItemDetails item={selectedItem} />
          ) : (
            <div className="h-full flex items-center justify-center text-white/60">
              <div className="text-center">
                <Package className="w-12 h-12 mx-auto mb-2 opacity-40" />
                <div>Select an item to view details</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 
