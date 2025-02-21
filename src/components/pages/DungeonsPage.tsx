import { AlertTriangle, Calendar, Clock, Gauge, Music, Shield, Swords, Users } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

import { Header } from '@/components/Header';
import { ASSET_URL_BASE } from '@/constants';
import { useDungeonData, type Area, type Stage } from '@/hooks/useDungeonData';

const AUDIO_URL_BASE = 'https://raw.githubusercontent.com/HaiKonofanDesu/konofan-audio/refs/heads/main/';

function ElementBadge({ element }: { element: string }) {
  if (!element || element === '0') return null;

  const getElementColor = (element: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      water: { bg: 'bg-blue-500/20', text: 'text-blue-300' },
      fire: { bg: 'bg-red-500/20', text: 'text-red-300' },
      wind: { bg: 'bg-green-500/20', text: 'text-green-300' },
      earth: { bg: 'bg-amber-500/20', text: 'text-amber-300' },
      light: { bg: 'bg-yellow-500/20', text: 'text-yellow-300' },
      dark: { bg: 'bg-purple-500/20', text: 'text-purple-300' },
      thunder: { bg: 'bg-yellow-500/20', text: 'text-yellow-300' },
      cursed: { bg: 'bg-fuchsia-500/20', text: 'text-fuchsia-300' },
    };

    return colors[element] || { bg: 'bg-gray-500/20', text: 'text-gray-300' };
  };

  const { bg, text } = getElementColor(element);

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${bg} ${text} capitalize`}>
      {element}
    </span>
  );
}

function StatusEffectBadge({ effect }: { effect: string }) {
  if (!effect || effect === '0') return null;

  const getEffectColor = (effect: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blind: { bg: 'bg-purple-500/20', text: 'text-purple-300' },
      silence: { bg: 'bg-blue-500/20', text: 'text-blue-300' },
      poison: { bg: 'bg-green-500/20', text: 'text-green-300' },
      bind: { bg: 'bg-red-500/20', text: 'text-red-300' },
    };

    return colors[effect] || { bg: 'bg-gray-500/20', text: 'text-gray-300' };
  };

  const { bg, text } = getEffectColor(effect);

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${bg} ${text} capitalize`}>
      {effect}
    </span>
  );
}

function StageCard({ stage, isSelected, onClick }: { stage: Stage; isSelected: boolean; onClick: () => void }) {
  const hasBoss = stage.boss === '1';
  const hasAdvice = stage.advice && stage.advice !== '0';

  return (
    <div className="inline-block align-top m-2">
      <button
        onClick={onClick}
        className={`
          w-[220px] pt-4
          bg-black/30 backdrop-blur-sm overflow-hidden
          transition-all duration-200 text-left
          hover:bg-black/40 hover:scale-[1.02]
          ${isSelected ? 'ring-2 ring-white/40' : ''}
        `}
      >
        <div className="relative text-center">
          <img
            src={ASSET_URL_BASE + stage.thumbnail}
            alt={stage.title}
            className="inline-block"
            // placeholderSrc="/img/middle_icon_placeholder.webp"
          />
        </div>

        {hasBoss && (
          <div className="absolute top-1 left-1/2 -translate-x-1/2">
            <span
              className="
            inline-flex items-center px-2 py-1 rounded bg-red-500/90 
            text-white text-xs font-bold border border-black/50"
            >
              BOSS
            </span>
          </div>
        )}

        <div className="p-3 space-y-2">
          <h3 className="text-base font-bold text-white">{stage.title}</h3>

          <div className="flex flex-wrap gap-1">
            <ElementBadge element={stage.attr1} />
            <ElementBadge element={stage.attr2} />
            <StatusEffectBadge effect={stage.bad_state1} />
            <StatusEffectBadge effect={stage.bad_state2} />
            <StatusEffectBadge effect={stage.bad_state3} />
          </div>

          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Gauge className="w-3.5 h-3.5" />
            <span>{parseInt(stage.recommend_power).toLocaleString()} Power</span>
          </div>

          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>{stage.time_limit}s Time Limit</span>
          </div>

          {hasAdvice && (
            <div className="border-t border-white/10 pt-2">
              <div className="text-xs text-white/70 line-clamp-2">{stage.advice}</div>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}

function StageDetails({ stage, area }: { stage: Stage; area: Area }) {
  const hasBoss = stage.boss === '1';
  const hasAdvice = stage.advice && stage.advice !== '0';
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get the first available BGM (normal or boss)
  const bgmPath = useMemo(() => {
    if (stage.bgm && stage.bgm !== '0') {
      return stage.bgm;
    }
    if (stage.bgm_boss && stage.bgm_boss !== '0') {
      return stage.bgm_boss;
    }
    return null;
  }, [stage.bgm, stage.bgm_boss]);

  return (
    <div className="space-y-6 w-full overflow-hidden" key={stage.id}>
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">{stage.title}</h2>
        <div className="space-y-4">
          {/* Stage Images */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white/60">Stage Media</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="text-xs text-white/40 mb-1">Info Background</div>
                <img
                  src={ASSET_URL_BASE + stage.infobg}
                  alt={`${stage.title} Info Background`}
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <div className="text-xs text-white/40 mb-1">Battle Background</div>
                <img
                  src={ASSET_URL_BASE + stage.battlebg}
                  alt={`${stage.title} Battle Background`}
                  className="w-full rounded-lg aspect-[16/10]"
                />
              </div>
            </div>
          </div>

          {/* BGM Player */}
          {bgmPath && (
            <div className="space-y-2">
              <div className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Music className="w-4 h-4 text-white/60" />
                  <span className="text-sm text-white/80">
                    {stage.bgm_boss !== '0' && stage.bgm_boss ? 'Boss BGM' : 'Stage BGM'}
                  </span>
                </div>
                <audio ref={audioRef} key={bgmPath} controls className="w-full h-8" src={AUDIO_URL_BASE + bgmPath} />
              </div>
            </div>
          )}

          {/* Stage Stats */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white/60">Stage Details</h3>

            <div className="bg-black/20 rounded-lg p-3 space-y-2 text-sm">
              <div className="space-y-3">
                {hasBoss && (
                  <div className="inline-block px-2 py-1 rounded bg-red-500/90 text-white text-xs font-bold">BOSS</div>
                )}

                <div className="flex flex-wrap gap-1">
                  <ElementBadge element={stage.attr1} />
                  <ElementBadge element={stage.attr2} />
                  <StatusEffectBadge effect={stage.bad_state1} />
                  <StatusEffectBadge effect={stage.bad_state2} />
                  <StatusEffectBadge effect={stage.bad_state3} />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <Gauge className="w-4 h-4" />
                    <span>{parseInt(stage.recommend_power).toLocaleString()} Power</span>
                  </div>

                  <div className="flex items-center gap-2 text-white/80">
                    <Clock className="w-4 h-4" />
                    <span>{stage.time_limit}s Time Limit</span>
                  </div>
                </div>

                {hasAdvice && (
                  <div className="border-t border-white/10 pt-3">
                    <div className="text-sm text-white/70 whitespace-pre-line">{stage.advice}</div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 pt-3" />

              <div className="grid grid-cols-2 gap-2">
                <div className="text-white/60">Stage ID</div>
                <div className="text-white">{stage.id}</div>
                <div className="text-white/60">Wave ID</div>
                <div className="text-white">{stage.wave_id1}</div>
                <div className="text-white/60">BGM</div>
                <div className="text-white">{stage.bgm || 'None'}</div>
                <div className="text-white/60">Boss BGM</div>
                <div className="text-white">{stage.bgm_boss || 'None'}</div>
                <div className="text-white/60">Graphic ID</div>
                <div className="text-white">{stage.graphic}</div>
              </div>
            </div>
          </div>

          {/* Area Stats */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white/60">Area Details</h3>
            <div className="bg-black/20 rounded-lg p-3 space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-white/60">Area ID</div>
                <div className="text-white">{area.id}</div>
                <div className="text-white/60">Background</div>
                <div className="text-white">{area.background}</div>
                <div className="text-white/60">Skip Ticket</div>
                <div className="text-white">{area.skip_ticket === '1' ? 'Yes' : 'No'}</div>
                <div className="text-white/60">Clear Rank Group</div>
                <div className="text-white">{area.clear_rank_group}</div>
                <div className="text-white/60">Benefit Lot Group</div>
                <div className="text-white">{area.benefit_lot_group}</div>
                {area.ng_character !== '0' && (
                  <>
                    <div className="text-white/60">NG Character</div>
                    <div className="text-white">{area.ng_character}</div>
                  </>
                )}
                {area.ng_assist !== '0' && (
                  <>
                    <div className="text-white/60">NG Assist</div>
                    <div className="text-white">{area.ng_assist}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AreaSection({
  area,
  selectedStage,
  onStageSelect,
}: {
  area: Area;
  selectedStage: Stage | null;
  onStageSelect: (stage: Stage) => void;
}) {
  const difficultyColor = useMemo(() => {
    switch (area.difficulty) {
      case '1':
        return 'from-emerald-500/20 to-green-500/0';
      case '2':
        return 'from-amber-500/20 to-yellow-500/0';
      case '3':
        return 'from-red-500/20 to-rose-500/0';
      default:
        return 'from-gray-500/20 to-slate-500/0';
    }
  }, [area.difficulty]);

  return (
    <div className="mb-8">
      <div className={`bg-gradient-to-r ${difficultyColor} backdrop-blur-sm rounded-lg p-4 mb-4`}>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <img
              src={ASSET_URL_BASE + area.button_image}
              alt={`${area.title} Button`}
              className="h-8 scale-[3] ml-4 mr-5"
            />
          </div>
          <h2 className="text-2xl font-bold text-white">{area.title}</h2>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-white/60" />
              <span className="text-white/90">{area.member_num} Members Required</span>
            </div>

            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-white/60" />
              <span className="text-white/90">{parseInt(area.recommend_power).toLocaleString()} Power</span>
            </div>

            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-white/60" />
              <div className="flex gap-1">
                <ElementBadge element={area.attr1} />
                <ElementBadge element={area.attr2} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {area.stages.map((stage) => (
          <StageCard
            key={stage.id}
            stage={stage}
            isSelected={selectedStage?.id === stage.id}
            onClick={() => onStageSelect(stage)}
          />
        ))}
      </div>
    </div>
  );
}

export function DungeonsPage() {
  const { data: dungeons, isLoading, error } = useDungeonData();
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  const handleStageSelect = (stage: Stage, area: Area) => {
    setSelectedStage(stage);
    setSelectedArea(area);
  };

  if (isLoading) {
    return (
      <>
        <Header title="Dungeons" />
        <div className="container mx-auto py-8 text-center text-white">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white/90 rounded-full animate-spin mx-auto mb-4" />
          Loading dungeons...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="Dungeons" />
        <div className="container mx-auto py-8 text-center text-red-500">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
          Error loading dungeons: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </>
    );
  }

  if (!dungeons?.length) {
    return (
      <>
        <Header title="Dungeons" />
        <div className="container mx-auto py-8 text-center text-white">No dungeons found</div>
      </>
    );
  }

  return (
    <>
      <Header title="Dungeons" />
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex-1 overflow-auto custom-scrollbar">
          <div className="container py-8 px-4">
            {dungeons.map((dungeon) => (
              <div key={dungeon.id} className="mb-12">
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 mb-8">
                  <div className="flex flex-wrap items-center gap-6">
                    <h1 className="text-3xl font-bold text-white">{dungeon.name}</h1>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-white/60" />
                        <div className="space-y-0.5">
                          <div className="text-white/90">Start: {new Date(dungeon.start_at).toLocaleDateString()}</div>
                          <div className="text-white/70">End: {new Date(dungeon.end_at).toLocaleDateString()}</div>
                        </div>
                      </div>

                      {dungeon.max_limit !== '0' && (
                        <div className="flex items-center gap-2">
                          <Swords className="w-4 h-4 text-white/60" />
                          <span className="text-white/90">{dungeon.max_limit} Attempts Max</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {dungeon.areas.map((area) => (
                  <AreaSection
                    key={area.id}
                    area={area}
                    selectedStage={selectedStage}
                    onStageSelect={(stage) => handleStageSelect(stage, area)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`
          w-[30vw] min-w-[400px] border-l border-white/10 overflow-auto custom-scrollbar
          transition-all duration-300
          ${selectedStage ? 'translate-x-0' : 'translate-x-full'}
        `}
          key={selectedStage?.id}
        >
          {selectedStage && selectedArea && (
            <div className="p-4">
              <StageDetails stage={selectedStage} area={selectedArea} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
