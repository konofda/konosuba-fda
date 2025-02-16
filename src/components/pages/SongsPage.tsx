import { useState, useMemo } from 'react';
import { Gamepad2 } from 'lucide-react';

import { Header } from '@/components/Header';
import { useSongData } from '@/hooks/useSongData';
import { ASSET_URL_BASE } from '@/constants';
import type { SongData } from '@/types';

export function SongsPage() {
  const { data: songList = [], isLoading } = useSongData();
  const [currentSong, setCurrentSong] = useState<SongData | null>(null);
  const [showControls, setShowControls] = useState(false);

  const { songsWithIcons, songsWithoutIcons } = useMemo(() => {
    return songList.reduce(
      (acc, song) => {
        if (song.icon) {
          acc.songsWithIcons.push(song);
        } else {
          acc.songsWithoutIcons.push(song);
        }
        return acc;
      },
      { songsWithIcons: [] as SongData[], songsWithoutIcons: [] as SongData[] }
    );
  }, [songList]);

  const handleSongSelect = (song: SongData) => {
    setCurrentSong(song);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const controls = (
    <button
      onClick={() => setShowControls(prev => !prev)}
      className={`
        px-3 py-1.5 rounded-lg transition-colors duration-200
        flex items-center gap-2
        ${showControls 
          ? 'bg-white/20 text-white' 
          : 'text-white/60 hover:bg-white/10 hover:text-white'}
      `}
    >
      <Gamepad2 className="w-4 h-4" />
      <span className="text-sm font-medium">Controls</span>
    </button>
  );

  if (isLoading) {
    return (
      <>
        <Header title="Songs">{controls}</Header>
        <div className="container mx-auto py-8 px-4">
          <div className="bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg mb-4">
            <div className="aspect-video bg-white/5" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/5 aspect-video rounded-sm" />
                <div className="mt-1 h-4 bg-white/5 rounded w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Songs">{controls}</Header>
      <div className="container mx-auto py-8 px-4">
        <div className="bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg mb-4">
          {currentSong?.youtube?.[0] ? (
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${currentSong.youtube[0]}?autoplay=1${showControls ? '' : '&controls=0'}&modestbranding=1&rel=0`}
                title={currentSong.title_alt}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-video flex items-center justify-center text-white/80">
              No video available
            </div>
          )}
        </div>

        {currentSong && (
          <div className="bg-black/10 backdrop-blur-sm rounded-xl p-6 mb-4">
            <h2 className="text-xl font-bold text-white mb-4">
              {currentSong.title_alt}
            </h2>
            <p className="text-white/70 text-sm font-semibold">
              {currentSong.title}
            </p>
            <p className="text-white/70 text-sm">{currentSong.artist_name}</p>
          </div>
        )}

        {/* Thumbnail Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {songsWithIcons.map((song) => (
            <button
              key={song.story_id}
              onClick={() => handleSongSelect(song)}
              className={`
                group relative
                transition-all duration-200
                hover:scale-105 hover:z-10
                outline-none
              `}
            >
              <img
                src={ASSET_URL_BASE + song.icon}
                alt={song.title_alt}
                className="w-full"
              />
              <div className={`
                mt-1 text-sm font-bold text-center truncate
                [text-shadow:0px_1px_2px_rgba(0,0,0,0.4),0px_2px_4px_rgba(0,0,0,0.3)]
                ${song === currentSong ? 'text-yellow-300' : 'text-white/90'}
              `}>
                {song.title_alt}
              </div>
            </button>
          ))}
        </div>

        {/* List for songs without icons (if any) */}
        {songsWithoutIcons.length > 0 && (
          <div className="bg-black/10 backdrop-blur-md rounded-xl p-4">
            <div className="space-y-2">
              {songsWithoutIcons.map((song) => (
                <button
                  key={song.story_id}
                  onClick={() => handleSongSelect(song)}
                  className={`
                    w-full text-left py-2 px-3 rounded transition-all duration-200
                    ${song === currentSong ? 'bg-white/20' : 'hover:bg-white/10'}
                  `}
                >
                  <div className="truncate">
                    <span className="text-white">{song.title}</span>
                    <span className="ml-3 text-xs text-white/60 font-medium">
                      {song.artist_name.split('[')[0].trim().replace('Song: ', '')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
} 
