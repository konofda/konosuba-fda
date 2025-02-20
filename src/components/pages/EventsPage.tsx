import { AlertTriangle, Calendar, Clock, Music, Swords } from 'lucide-react';
import { useState } from 'react';

import { Header } from '@/components/Header';
import { ASSET_URL_BASE } from '@/constants';
import { useEventData, type Event, type Stage, type Mission } from '@/hooks/useEventData';

function EventCard({ event, isSelected, onClick }: { event: Event; isSelected: boolean; onClick: () => void }) {
  return (
    <div className="mb-4">
      <button
        onClick={onClick}
        className={`
          w-full text-left p-4
          bg-black/30 backdrop-blur-sm rounded-lg
          transition-all duration-200
          hover:bg-black/40
          ${isSelected ? 'ring-2 ring-white/40' : ''}
        `}
      >
        <div className="flex items-center gap-4">
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-white mb-2">{event.name}</h3>

            <div className="flex flex-wrap gap-4 text-sm mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white/60" />
                <div className="space-y-0.5">
                  <div className="text-white/90">{new Date(event.start_at).toLocaleDateString()}</div>
                  <div className="text-white/70">{new Date(event.end_at).toLocaleDateString()}</div>
                </div>
              </div>

              {event.type && <div className="px-2 py-0.5 bg-white/10 rounded text-white/80">{event.type}</div>}
              {event.bgm && event.bgm !== "0" && (
                <div className="px-2 py-0.5 bg-white/10 rounded text-white/80">[has music]</div>
              )}
            </div>

            {event.mission_introduction_text && (
              <div className="text-sm text-white/70 mb-2 line-clamp-2">{event.mission_introduction_text}</div>
            )}

            <div className="flex flex-wrap gap-2 text-xs text-white/60">
              {event.members.length > 0 && (
                <div className="px-1.5 py-0.5 bg-white/5 rounded">{event.members.length} Members</div>
              )}
              {event.stages.length > 0 && (
                <div className="px-1.5 py-0.5 bg-white/5 rounded">{event.stages.length} Stages</div>
              )}
              {event.missions.length > 0 && (
                <div className="px-1.5 py-0.5 bg-white/5 rounded">{event.missions.length} Missions</div>
              )}
              {event.infinity_gacha.length > 0 && (
                <div className="px-1.5 py-0.5 bg-white/5 rounded">{event.infinity_gacha.length} Infinity Gacha</div>
              )}
              {event.limit_gacha.length > 0 && (
                <div className="px-1.5 py-0.5 bg-white/5 rounded">{event.limit_gacha.length} Limit Gacha</div>
              )}
              {event.story_events.length > 0 && (
                <div className="px-1.5 py-0.5 bg-white/5 rounded">{event.story_events.length} Story Events</div>
              )}
              {event.story_uniques.length > 0 && (
                <div className="px-1.5 py-0.5 bg-white/5 rounded">{event.story_uniques.length} Story Uniques</div>
              )}
            </div>
          </div>

          {event.logo && (
            <div className="flex-shrink-0">
              <img src={ASSET_URL_BASE + event.logo} alt={event.name} className="h-16 object-contain" />
            </div>
          )}
        </div>
      </button>
    </div>
  );
}

function EventDetails({ event }: { event: Event }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">{event.name}</h2>

        {/* Event Assets */}
        <div className="space-y-4">
          {/* Logo */}
          {event.logo && (
            <div>
              <div className="text-sm text-white/60 mb-2">Logo</div>
              <img src={ASSET_URL_BASE + event.logo} alt={`${event.name} Logo`} className="max-w-full rounded-lg" />
            </div>
          )}

          {/* Enemy Images */}
          {event.enemy_image && (
            <div>
              <div className="text-sm text-white/60 mb-2">Enemy Image</div>
              <img
                src={ASSET_URL_BASE + event.enemy_image}
                alt={`${event.name} Enemy`}
                className="max-w-full rounded-lg"
              />
            </div>
          )}
          {event.scorechallenge_enemy_image && (
            <div>
              <div className="text-sm text-white/60 mb-2">Score Challenge Enemy</div>
              <img
                src={ASSET_URL_BASE + event.scorechallenge_enemy_image}
                alt={`${event.name} Score Challenge Enemy`}
                className="max-w-full rounded-lg"
              />
            </div>
          )}

          {/* Buttons Grid */}
          <div className="space-y-2">
            <div className="text-sm text-white/60">Event Buttons</div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: 'story_button', label: 'Story' },
                { key: 'quest_button', label: 'Quest' },
                { key: 'event_quest_button', label: 'Event Quest' },
                { key: 'boss_battle_button', label: 'Boss Battle' },
                { key: 'boss_battle_sp_button', label: 'Special Boss Battle' },
                { key: 'emergency_boss_button', label: 'Emergency Boss' },
                { key: 'scorechallenge_button', label: 'Score Challenge' },
              ].map(({ key, label }) => {
                const buttonPath = event[key as keyof Event];
                if (!buttonPath || buttonPath === 'null') return null;

                return (
                  <div key={key}>
                    <div className="text-xs text-white/40 mb-1">{label}</div>
                    <img src={ASSET_URL_BASE + buttonPath} alt={`${label} Button`} className="w-full rounded-lg" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="mt-6 space-y-4">
          <div className="bg-black/20 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-3">Event Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-white/60">Event ID</div>
              <div className="text-white">{event.event_id}</div>
              <div className="text-white/60">Type</div>
              <div className="text-white">{event.type}</div>
              <div className="text-white/60">Start Date</div>
              <div className="text-white">{new Date(event.start_at).toLocaleString()}</div>
              <div className="text-white/60">End Date</div>
              <div className="text-white">{new Date(event.end_at).toLocaleString()}</div>
              <div className="text-white/60">Reward Period</div>
              <div className="text-white">
                {new Date(event.reward_start_at).toLocaleDateString()} -{' '}
                {new Date(event.reward_end_at).toLocaleDateString()}
              </div>
              {event.bgm && (
                <>
                  <div className="text-white/60">BGM</div>
                  <div className="text-white">{event.bgm}</div>
                </>
              )}
              {event.mission_introduction_text && (
                <>
                  <div className="text-white/60">Mission Intro</div>
                  <div className="text-white">{event.mission_introduction_text}</div>
                </>
              )}
              {event.multi_no_ticket_limit && (
                <>
                  <div className="text-white/60">Multi No Ticket Limit</div>
                  <div className="text-white">{event.multi_no_ticket_limit}</div>
                </>
              )}
            </div>
          </div>

          {/* Stages */}
          {event.stages.length > 0 && (
            <div className="bg-black/20 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3">Stages ({event.stages.length})</h3>
              <div className="grid grid-cols-4 gap-2">
                {event.stages.map((stage) => (
                  <div key={stage.id} className="p-2 bg-black/20 rounded text-sm">
                    <div className="font-medium text-white truncate">{stage.title}</div>
                    <div className="text-white/70 space-y-0.5 mt-1">
                      <div className="flex items-center gap-1">
                        <span className="text-white/50">⚡</span> {stage.stamina}
                      </div>
                      {stage.recommend_power && (
                        <div className="flex items-center gap-1">
                          <span className="text-white/50">⚔️</span> {stage.recommend_power}
                        </div>
                      )}
                      {stage.time_limit && (
                        <div className="flex items-center gap-1">
                          <span className="text-white/50">⏱️</span> {stage.time_limit}s
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Infinity Gacha */}
          {event.infinity_gacha.length > 0 && (
            <div className="bg-black/20 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3">Infinity Gacha ({event.infinity_gacha.length})</h3>
              <div className="grid grid-cols-4 gap-2">
                {event.infinity_gacha.map((gacha, index) => (
                  <div key={index} className="p-2 bg-black/20 rounded text-sm">
                    <div className="text-white/70 space-y-0.5">
                      <div className="font-medium text-white truncate">Item {gacha.item_id}</div>
                      <div>×{gacha.item_num}</div>
                      {gacha.limit !== "0" && (
                        <div className="text-yellow-400/70">Limit: {gacha.limit}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Limit Gacha */}
          {event.limit_gacha.length > 0 && (
            <div className="bg-black/20 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3">Limit Gacha ({event.limit_gacha.length})</h3>
              <div className="grid grid-cols-4 gap-2">
                {event.limit_gacha.map((gacha, index) => (
                  <div key={index} className="p-2 bg-black/20 rounded text-sm">
                    <div className="text-white/70 space-y-0.5">
                      <div className="font-medium text-white truncate">Item {gacha.item_id}</div>
                      <div className="space-y-0.5">
                        {[1, 2, 3, 4, 5].map(i => {
                          const amount = gacha[`item_num_${i}` as keyof typeof gacha];
                          const limit = gacha[`limit_${i}` as keyof typeof gacha];
                          if (amount === "0") return null;
                          return (
                            <div key={i} className="flex justify-between gap-2">
                              <span>×{amount}</span>
                              <span className="text-yellow-400/70">({limit})</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Story Uniques */}
          {event.story_uniques.length > 0 && (
            <div className="bg-black/20 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3">Unique Stories ({event.story_uniques.length})</h3>
              <div className="space-y-2">
                {event.story_uniques.map((story) => (
                  <div key={story.id} className="p-2 bg-black/20 rounded">
                    <div className="font-medium text-white">{story.title_text}</div>
                    <div className="text-sm text-white/70 mt-1">
                      <div>{story.chapter_title_text}</div>
                      <div>{story.summary_text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Missions */}
          {event.missions.length > 0 && (
            <div className="bg-black/20 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3">Missions</h3>
              <div className="space-y-2">
                {event.missions.map((mission) => (
                  <div key={mission.id} className="p-2 bg-black/20 rounded">
                    <div className="font-medium text-white">{mission.mission_name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Story Events */}
          {event.story_events.length > 0 && (
            <div className="bg-black/20 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3">Story Events</h3>
              <div className="space-y-2">
                {event.story_events.map((story) => (
                  <div key={story.id} className="p-2 bg-black/20 rounded">
                    <div className="font-medium text-white">{story.title_text}</div>
                    <div className="text-sm text-white/70">{story.summary_text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function EventsPage() {
  const { data: events, isLoading, error } = useEventData();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  if (isLoading) {
    return (
      <>
        <Header title="Events" />
        <div className="container mx-auto py-8 text-center text-white">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white/90 rounded-full animate-spin mx-auto mb-4" />
          Loading events...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="Events" />
        <div className="container mx-auto py-8 text-center text-red-500">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
          Error loading events: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </>
    );
  }

  if (!events?.length) {
    return (
      <>
        <Header title="Events" />
        <div className="container mx-auto py-8 text-center text-white">No events found</div>
      </>
    );
  }

  return (
    <>
      <Header title="Events" />
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex-1 overflow-auto custom-scrollbar">
          <div className="container py-8 px-4">
            {events.map((event) => (
              <EventCard
                key={event.event_id}
                event={event}
                isSelected={selectedEvent?.event_id === event.event_id}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </div>

        <div
          className={`
            w-[40vw] border-l border-white/10 overflow-auto custom-scrollbar
            transition-all duration-300
            ${selectedEvent ? 'translate-x-0' : 'translate-x-full'}
          `}
          key={selectedEvent?.event_id}
        >
          {selectedEvent && (
            <div className="p-4">
              <EventDetails event={selectedEvent} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
