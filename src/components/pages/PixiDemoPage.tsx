import { LoadingImage } from '@/components/common/LoadingImage';
import { Header } from '@/components/Header';
import { ASSET_URL_BASE } from '@/constants';
import { useMemberCardData } from '@/hooks/useMemberCardData';
import { useSpineData } from '@/hooks/useSpineData';
import { BattleUnitPreviewApp, createBattleUnitPreviewPixiApp } from '@/lib/createBattleUnitPreviewPixiApp';
import type { CardData, SpineModel } from '@/types';
import { useEffect, useMemo, useRef, useState } from 'react';

interface CardWithSpine {
  card: CardData;
  spine: SpineModel | null;
  matchType: 'direct' | 'character' | 'none';
}

export function PixiDemoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const previewAppRef = useRef<BattleUnitPreviewApp | null>(null);
  const [selectedItem, setSelectedItem] = useState<CardWithSpine | null>(null);
  const [isLoadingModel, setIsLoadingModel] = useState(false);

  // Load data
  const { data: cards = [], isLoading: isLoadingCards } = useMemberCardData();
  const { data: spineModels = [], isLoading: isLoadingSpine } = useSpineData();

  // Match cards with spine models
  const cardsWithSpine = useMemo(() => {
    console.log('🔄 Matching cards with spine models...');
    return cards.map((card) => {
      // First try to find a direct match via unlock_member_id
      const directMatch = spineModels.find((spine) => spine.unlock_member_id === card.id);

      if (directMatch) {
        console.log('✨ Found direct spine match:', {
          cardId: card.id,
          spinePath: directMatch.path,
          matchType: 'unlock_member_id',
        });
        return {
          card,
          spine: directMatch,
          matchType: 'direct' as const,
        };
      }

      // If no direct match, try to match by character_id
      const candidates = spineModels.filter((spine) => spine.character_id === card.character_id);

      const characterMatch = candidates[0]; // Take the first match if any

      if (characterMatch) {
        console.log('🔄 Found character spine match:', {
          cardId: card.id,
          cardCharacterId: card.character_id,
          spineCharacterId: characterMatch.character_id,
          spinePath: characterMatch.path,
          totalCandidates: candidates.length,
          allCandidates: candidates.map((c) => ({
            id: c.id,
            path: c.path,
            unlock_member_id: c.unlock_member_id,
          })),
        });
        return {
          card,
          spine: characterMatch,
          matchType: 'character' as const,
        };
      }

      console.log('❌ No spine match found for card:', {
        cardId: card.id,
        cardCharacterId: card.character_id,
        possibleCandidates: spineModels
          .filter((s) => s.character_id === card.character_id)
          .map((c) => ({
            id: c.id,
            path: c.path,
            unlock_member_id: c.unlock_member_id,
          })),
      });
      return {
        card,
        spine: null,
        matchType: 'none' as const,
      };
    });
  }, [cards, spineModels]);

  const handleCardClick = async (item: CardWithSpine) => {
    console.log('🎯 Selected card:', item.card);
    if (item.spine) {
      console.log(`🦴 Matching spine model (${item.matchType} match):`, item.spine);

      if (!previewAppRef.current) {
        console.warn('⚠️ Preview app not initialized');
        return;
      }

      setIsLoadingModel(true);
      try {
        await previewAppRef.current.loadModel(ASSET_URL_BASE + item.spine.path);
      } catch (error) {
        console.error('❌ Failed to load spine model:', error);
        setLoadError(error instanceof Error ? error.message : 'Failed to load spine model');
      } finally {
        setIsLoadingModel(false);
      }
    } else {
      console.log('❌ No matching spine model found');
    }
    setSelectedItem(item);
  };

  useEffect(() => {
    let mounted = true;

    const initPixi = async () => {
      try {
        if (!mounted || !containerRef.current) return;

        const previewApp = await createBattleUnitPreviewPixiApp();
        if (!mounted) {
          previewApp.destroy();
          return;
        }

        previewAppRef.current = previewApp;
        containerRef.current.appendChild(previewApp.canvas);
        setIsLoading(false);
      } catch (error) {
        console.error('❌ Error loading scene:', error);
        if (mounted) {
          setLoadError(error instanceof Error ? error.message : 'Failed to load scene');
          setIsLoading(false);
        }
      }
    };

    initPixi();

    return () => {
      mounted = false;
      if (previewAppRef.current) {
        console.log('🧹 Cleaning up PixiJS application...');
        previewAppRef.current.destroy();
        previewAppRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <Header title="PixiJS Demo" />
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-96 border-r border-white/10 overflow-auto bg-black/20">
          <div className="p-4">
            <h2 className="text-white/90 font-medium mb-4">Member Cards</h2>
            {isLoadingCards || isLoadingSpine ? (
              <div className="text-white/60 text-sm">Loading data...</div>
            ) : (
              <div className="grid grid-cols-3 gap-1">
                {cardsWithSpine.map((item) => (
                  <button
                    key={item.card.id}
                    onClick={() => handleCardClick(item)}
                    className={`
                      relative rounded-lg transition-all duration-200
                      hover:bg-white/5 hover:scale-105
                      ${selectedItem?.card.id === item.card.id ? 'bg-white/10 ring-2 ring-white/20' : ''}
                      ${item.matchType === 'none' ? 'opacity-40' : ''}
                      ${item.matchType === 'direct' ? 'ring-1 ring-emerald-500/30' : ''}
                      ${item.matchType === 'character' ? 'ring-1 ring-yellow-500/30' : ''}
                    `}
                  >
                    <LoadingImage
                      src={ASSET_URL_BASE + item.card.icon_middle}
                      alt={item.card.name || `Card ${item.card.id}`}
                      className="w-full rounded-lg"
                      placeholderSrc="/img/middle_icon_placeholder.webp"
                    />
                    {item.matchType !== 'none' && item.matchType !== 'direct' && (
                      <div
                        className={`absolute bottom-2 right-2 w-2 h-2 rounded-full border-black/50 border bg-black`}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 w-full h-full">
          {isLoading && (
            <div className="flex items-center justify-center h-[500px]">
              <div className="text-white text-xl animate-pulse">Loading PixiJS...</div>
            </div>
          )}
          {loadError && <div className="text-red-500 text-center">Error: {loadError}</div>}
          <div ref={containerRef} className={`w-full h-full ${isLoading ? 'hidden' : 'block'} rounded-lg relative`}>
            {isLoadingModel && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-white text-xl animate-pulse">Loading Model...</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
