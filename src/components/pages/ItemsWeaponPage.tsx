import { AlertTriangle, ChevronRight, Star, Sword } from 'lucide-react';
import { useState } from 'react';

import { LoadingImage } from '@/components/common/LoadingImage';
import { Header } from '@/components/Header';
import { ASSET_URL_BASE } from '@/constants';
import { useItemWeaponData, type WeaponData } from '@/hooks/useItemWeaponData';

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

function WeaponDetails({ weapon }: { weapon: WeaponData }) {
  const hasBasicInfo = weapon.name && weapon.flavor_text;
  const hasDetails = Array.isArray(weapon.details) && weapon.details.length > 0;

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-white text-center">
          {weapon.name || `Weapon ${weapon.id}`}
        </h2>
        {weapon.rare && (
          <div className="flex justify-center">
            <RarityStars rarity={weapon.rare} />
          </div>
        )}
        <div className="flex justify-center">
          <LoadingImage
            src={ASSET_URL_BASE + weapon.icon_path}
            alt={weapon.name || `Weapon ${weapon.id}`}
            placeholderSrc="/img/small_icon_placeholder.webp"
          />
        </div>
      </div>

      {!hasBasicInfo && (
        <div className="flex items-center gap-2 text-yellow-400/80 text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>Limited data available for this weapon</span>
        </div>
      )}

      {weapon.flavor_text && (
        <div className="text-sm text-white/80 italic text-center">{weapon.flavor_text}</div>
      )}

      {hasBasicInfo && (
        <div className="grid grid-cols-2 gap-2 text-sm">
          {weapon.weapon_type && (
            <>
              <div className="text-white/60">Type</div>
              <div className="text-white">{weapon.weapon_type}</div>
            </>
          )}
          {weapon.unlock_playerrank && (
            <>
              <div className="text-white/60">Unlock Rank</div>
              <div className="text-white">{weapon.unlock_playerrank}</div>
            </>
          )}
          {weapon.start_at && (
            <>
              <div className="text-white/60">Released</div>
              <div className="text-white">
                {new Date(weapon.start_at).toLocaleDateString()}
              </div>
            </>
          )}
          {weapon.money && (
            <>
              <div className="text-white/60">Base Cost</div>
              <div className="text-white">
                {parseInt(weapon.money || '0').toLocaleString()} Eris
              </div>
            </>
          )}
        </div>
      )}

      {hasBasicInfo && (weapon.material1 || weapon.material2 || weapon.material3) && (
        <div className="text-sm space-y-1">
          <div className="text-white/60 font-medium">Base Materials:</div>
          <div className="grid grid-cols-1 gap-1">
            {weapon.material1 && (
              <div className="flex items-center gap-1 text-xs">
                <ChevronRight className="w-3 h-3 text-white/40" />
                <span className="text-white/80">
                  Material {weapon.material1} × {weapon.num1}
                </span>
              </div>
            )}
            {weapon.material2 && (
              <div className="flex items-center gap-1 text-xs">
                <ChevronRight className="w-3 h-3 text-white/40" />
                <span className="text-white/80">
                  Material {weapon.material2} × {weapon.num2}
                </span>
              </div>
            )}
            {weapon.material3 && (
              <div className="flex items-center gap-1 text-xs">
                <ChevronRight className="w-3 h-3 text-white/40" />
                <span className="text-white/80">
                  Material {weapon.material3} × {weapon.num3}
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
            {weapon.details.map((detail, index) => {
              const nextDetail = weapon.details[index + 1];
              const skillUpgrade = nextDetail && detail.skill !== nextDetail.skill;

              return (
                <div
                  key={detail.id}
                  className="bg-black/20 rounded-lg p-3 text-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">
                      {detail.lv ? `Level ${detail.lv}` : 'Base'}
                    </span>
                    <span className="text-red-400">ATK {detail.attack}</span>
                  </div>
                  {skillUpgrade && (
                    <div className="text-emerald-400/90 text-xs mb-2">
                      Skill upgrade at next level
                    </div>
                  )}
                  <div className="text-xs space-y-2">
                    {(detail.material1 || detail.material2 || detail.material3 || detail.material4) && (
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
                          {detail.material4 && (
                            <div className="flex items-center gap-1">
                              <ChevronRight className="w-3 h-3 text-white/40" />
                              <span className="text-white/80">
                                Material {detail.material4} × {detail.num4}
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
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function ItemsWeaponPage() {
  const { data: weapons, isLoading } = useItemWeaponData();
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponData | null>(null);

  if (isLoading) {
    return (
      <>
        <Header title="Weapons" />
        <div className="container mx-auto py-8 text-center text-white">
          Loading weapons...
        </div>
      </>
    );
  }

  if (!weapons?.length) {
    return (
      <>
        <Header title="Weapons" />
        <div className="container mx-auto py-8 text-center text-white">
          No weapons found
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Weapons" />
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
            {weapons.map((weapon) => (
              <button
                key={weapon.id}
                onClick={() => setSelectedWeapon(weapon)}
                className={`
                  relative rounded-lg p-2 transition-all duration-200
                  hover:bg-white/5 hover:scale-105
                  ${selectedWeapon?.id === weapon.id ? 'bg-white/10 ring-2 ring-white/20' : ''}
                  ${!weapon.name ? 'opacity-50' : ''}
                `}
              >
                <LoadingImage
                  src={ASSET_URL_BASE + weapon.icon_path}
                  alt={weapon.name || `Weapon ${weapon.id}`}
                  className="w-full aspect-square rounded-lg"
                  placeholderSrc="/img/small_icon_placeholder.webp"
                />
                <div className="h-10 mt-2 relative">
                  <div className="text-xs text-center text-white/90 line-clamp-2 absolute inset-x-2 top-0">
                    {weapon.name || `Weapon ${weapon.id}`}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="w-96 border-l border-white/10 overflow-auto">
          {selectedWeapon ? (
            <WeaponDetails weapon={selectedWeapon} />
          ) : (
            <div className="h-full flex items-center justify-center text-white/60">
              <div className="text-center">
                <Sword className="w-12 h-12 mx-auto mb-2 opacity-40" />
                <div>Select a weapon to view details</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
