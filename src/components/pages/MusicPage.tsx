import { Music } from 'lucide-react';
import { useState, useRef } from 'react';

import { Header } from '@/components/Header';
import { useMusicData } from '@/hooks/useMusicData';

const AUDIO_URL_BASE = 'https://raw.githubusercontent.com/HaiKonofanDesu/konofan-audio/refs/heads/main/';

export function MusicPage() {
  const { data: musicList = [], isLoading } = useMusicData();
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const musicByCategory = musicList.reduce((acc, track) => {
    if (!acc[track.category]) {
      acc[track.category] = [];
    }
    acc[track.category].push(track);
    return acc;
  }, {} as Record<string, typeof musicList>);

  const handleTrackSelect = (track: string) => {
    setCurrentTrack(track);
    // Give a small delay to ensure the audio element is updated
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 0);
  };

  return (
    <>
      <Header title="Music" />
      <div className="container mx-auto py-8 px-4 flex gap-6">
        <div className="w-96 bg-black/10 backdrop-blur-sm rounded-lg p-2 h-[calc(100vh-8rem)]">
          <div className="flex-none p-2 text-sm font-medium text-white/90 border-b border-white/10">
            Music Tracks
          </div>
          <div className="overflow-y-auto story-scrollbar h-[calc(100%-3rem)]">
            {isLoading ? (
              <div className="text-white/80 text-sm p-2">Loading...</div>
            ) : (
              Object.entries(musicByCategory).map(([category, tracks], index, array) => (
                <div key={category} className="mb-4">
                  <div className="text-white/90 text-sm font-medium px-2 py-1">
                    {category}
                  </div>
                  <div>
                    {tracks.map((track) => (
                      <button
                        key={track.path}
                        onClick={() => handleTrackSelect(track.path)}
                        title={track.path}
                        className={`
                          w-full text-left py-1 px-2 rounded text-xs
                          transition-colors duration-200 truncate flex items-center gap-1.5
                          ${track.path === currentTrack 
                            ? 'bg-white/20 text-white' 
                            : 'text-white/60 hover:text-white hover:bg-white/10'}
                        `}
                      >
                        <Music className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                        <span className="truncate">{track.name}</span>
                      </button>
                    ))}
                  </div>
                  {index < array.length - 1 && (
                    <div className="my-4 border-t border-white/10" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <img
              src="/img/konosuba_logo_stamp.png"
              alt="Konosuba Logo"
              className="w-[400px] opacity-10 brightness-[100]"
            />
          </div>
          {currentTrack ? (
            <div className="w-full max-w-xl p-8 bg-black/20 backdrop-blur-sm rounded-xl">
              <audio
                ref={audioRef}
                key={currentTrack}
                controls
                className="w-full"
                src={AUDIO_URL_BASE + currentTrack}
              />
              <div className="mt-4 text-center text-white/80 text-sm">
                {musicList.find(track => track.path === currentTrack)?.name}
              </div>
            </div>
          ) : (
            <div className="text-center max-w-md">
              <div className="inline-block p-2 rounded-full mb-2">
                <Music className="w-16 h-16 text-white/90" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">
                Select a Track
              </h2>
              <p className="text-sm text-white/80 font-semibold">
                Choose a music track from the list to start playing
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 
