import { AlertTriangle, ChevronRight, Star, CircleDot } from 'lucide-react';
import { useState } from 'react';

import { LoadingImage } from '@/components/common/LoadingImage';
import { Header } from '@/components/Header';
import { ASSET_URL_BASE } from '@/constants';
import { useItemAccessoryData, type AccessoryData } from '@/hooks/useItemAccessoryData';

function RarityStars({ rarity }: { rarity: string }) {
  const starCount = Math.max(0, Math.min(5, parseInt(rarity) || 0));
  return (
    <div className="flex items-center gap-1">
      {[...Array(starCount)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

function AccessoryDetails({ accessory }: { accessory: AccessoryData }) {
  const hasBasicInfo = accessory.name && accessory.flavor_text;
  const hasDetails = Array.isArray(accessory.details) && accessory.details.length > 0;

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-white text-center">
          {accessory.name || `Accessory ${accessory.id}`}
        </h2>
        {accessory.rare && (
          <div className="flex justify-center">
            <RarityStars rarity={accessory.rare} />
          </div>
        )}
        <div className="flex justify-center">
          <LoadingImage
            src={ASSET_URL_BASE + accessory.icon_path}
            alt={accessory.name || `Accessory ${accessory.id}`}
            placeholderSrc="/img/small_icon_placeholder.webp"
          />
        </div>
      </div>

      {!hasBasicInfo && (
        <div className="flex items-center gap-2 text-yellow-400/80 text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>Limited data available for this accessory</span>
        </div>
      )}

      {accessory.flavor_text && (
        <div className="text-sm text-white/80 italic text-center">{accessory.flavor_text}</div>
      )}

      {hasBasicInfo && (
        <div className="grid grid-cols-2 gap-2 text-sm">
          {accessory.unlock_playerrank && (
            <>
              <div className="text-white/60">Unlock Rank</div>
              <div className="text-white">{accessory.unlock_playerrank}</div>
            </>
          )}
          {accessory.start_at && (
            <>
              <div className="text-white/60">Released</div>
              <div className="text-white">
                {new Date(accessory.start_at).toLocaleDateString()}
              </div>
            </>
          )}
          {accessory.money && (
            <>
              <div className="text-white/60">Base Cost</div>
              <div className="text-white">
                {parseInt(accessory.money || '0').toLocaleString()} Eris
              </div>
            </>
          )}
        </div>
      )}

      {hasBasicInfo && (accessory.material1 || accessory.material2 || accessory.material3) && (
        <div className="text-sm space-y-1">
          <div className="text-white/60 font-medium">Base Materials:</div>
          <div className="grid grid-cols-1 gap-1">
            {accessory.material1 && (
              <div className="flex items-center gap-1 text-xs">
                <ChevronRight className="w-3 h-3 text-white/40" />
                <span className="text-white/80">
                  Material {accessory.material1} × {accessory.num1}
                </span>
              </div>
            )}
            {accessory.material2 && (
              <div className="flex items-center gap-1 text-xs">
                <ChevronRight className="w-3 h-3 text-white/40" />
                <span className="text-white/80">
                  Material {accessory.material2} × {accessory.num2}
                </span>
              </div>
            )}
            {accessory.material3 && (
              <div className="flex items-center gap-1 text-xs">
                <ChevronRight className="w-3 h-3 text-white/40" />
                <span className="text-white/80">
                  Material {accessory.material3} × {accessory.num3}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {hasDetails && (
        <div className="border-t border-white/10 pt-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            Enhancement Levels
          </h3>
          <div className="space-y-3">
            {accessory.details.map((detail, index) => (
              <div
                key={detail.id}
                className="bg-black/20 rounded-lg p-3 text-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">
                    {detail.lv ? `Level ${detail.lv}` : 'Base'}
                  </span>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-blue-400">
                      DEF {detail.defense}
                    </span>
                    <span className="text-purple-400">
                      M.DEF {detail.magicdefence}
                    </span>
                  </div>
                </div>
                {detail.skill && (
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-emerald-400/90">
                      {accessory.flavor_text?.match(/boost (\w+) resistance/i)?.[1] || 'Element'} Resistance Boost
                      {detail.skill.endsWith('1') && ' +'}
                    </span>
                  </div>
                )}
                <div className="text-xs space-y-2">
                  {(detail.material1 || detail.material2 || detail.material3) && (
                    <>
                      <div className="text-white/60">Enhancement Materials:</div>
                      <div className="grid grid-cols-1 gap-1">
                        {detail.material1 && (
                          <div className="flex items-center gap-1">
                            <ChevronRight className="w-3 h-3 text-white/40" />
                            <span className="text-white/80">
                              Material {detail.material1} × {detail.num1}
                            </span>
                          </div>
                        )}
                        {detail.material2 && (
                          <div className="flex items-center gap-1">
                            <ChevronRight className="w-3 h-3 text-white/40" />
                            <span className="text-white/80">
                              Material {detail.material2} × {detail.num2}
                            </span>
                          </div>
                        )}
                        {detail.material3 && (
                          <div className="flex items-center gap-1">
                            <ChevronRight className="w-3 h-3 text-white/40" />
                            <span className="text-white/80">
                              Material {detail.material3} × {detail.num3}
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  <div className="space-y-0.5">
                    {detail.money && (
                      <div className="text-yellow-400/80">
                        Cost: {parseInt(detail.money || '0').toLocaleString()}{' '}
                        Eris
                      </div>
                    )}
                    {detail.sell && (
                      <div className="text-yellow-400/50 text-xs">
                        Sell: {parseInt(detail.sell).toLocaleString()} Eris
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ItemsAccessoryPage() {
  const { data: accessories, isLoading } = useItemAccessoryData();
  const [selectedAccessory, setSelectedAccessory] = useState<AccessoryData | null>(null);

  if (isLoading) {
    return (
      <>
        <Header title="Accessories" />
        <div className="container mx-auto py-8 text-center text-white">
          Loading accessories...
        </div>
      </>
    );
  }

  if (!accessories?.length) {
    return (
      <>
        <Header title="Accessories" />
        <div className="container mx-auto py-8 text-center text-white">
          No accessories found
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Accessories" />
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
            {accessories.map((accessory) => (
              <button
                key={accessory.id}
                onClick={() => setSelectedAccessory(accessory)}
                className={`
                  relative rounded-lg p-2 transition-all duration-200
                  hover:bg-white/5 hover:scale-105
                  ${selectedAccessory?.id === accessory.id ? 'bg-white/10 ring-2 ring-white/20' : ''}
                  ${!accessory.name ? 'opacity-50' : ''}
                `}
              >
                <LoadingImage
                  src={ASSET_URL_BASE + accessory.icon_path}
                  alt={accessory.name || `Accessory ${accessory.id}`}
                  className="w-full aspect-square rounded-lg"
                  placeholderSrc="/img/small_icon_placeholder.webp"
                />
                <div className="h-10 mt-2 relative">
                  <div className="text-xs text-center text-white/90 line-clamp-2 absolute inset-x-2 top-0">
                    {accessory.name || `Accessory ${accessory.id}`}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="w-96 border-l border-white/10 overflow-auto">
          {selectedAccessory ? (
            <AccessoryDetails accessory={selectedAccessory} />
          ) : (
            <div className="h-full flex items-center justify-center text-white/60">
              <div className="text-center">
                <CircleDot className="w-12 h-12 mx-auto mb-2 opacity-40" />
                <div>Select an accessory to view details</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 
