import { useState, useMemo } from 'react';

import { Header } from '@/components/Header';
import { useVideoData } from '@/hooks/useVideoData';
import type { VideoData } from '@/types';

const VIDEO_URL_BASE =
  'https://raw.githubusercontent.com/HaiKonofanDesu/konofan-videos/refs/heads/main/';

// Order categories by matching these patterns first, then alphabetically
const CATEGORY_ORDER = ['opmoviefull', 'intros', 'unit', 'story', 'gacha'];

interface VideoGroup {
  category: string;
  items: VideoData[];
}

export function VideosPage() {
  const { data: videoList = [], isLoading } = useVideoData();
  const [currentVideo, setCurrentVideo] = useState(videoList[0]?.path ?? '');

  const handleVideoSelect = (path: string) => {
    setCurrentVideo(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const videoGroups = useMemo(() => createVideoGroups(videoList), [videoList]);

  return (
    <>
      <Header title="Videos" />
      <div className="container mx-auto py-8 px-4">
        <div className="bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg mb-8">
          {currentVideo && (
            <video
              key={currentVideo}
              className="w-full aspect-video"
              controls
              autoPlay
              src={VIDEO_URL_BASE + currentVideo}
            />
          )}
        </div>

        <div className="bg-black/10 backdrop-blur-md rounded-xl p-4">
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-white/80 text-sm p-2">Loading...</div>
            ) : (
              videoGroups.map((group, index) => (
                <div key={group.category}>
                  <div className="text-white/90 text-sm font-medium px-2 py-1">
                    {group.category}
                  </div>
                  <div className="space-y-2">
                    {group.items.map((video) => (
                      <button
                        key={video.path}
                        onClick={() => handleVideoSelect(video.path)}
                        title={video.path}
                        className={`w-full text-left py-2 px-3 rounded transition-all duration-200
                        ${
                          video.path === currentVideo
                            ? 'bg-white/20 text-white'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {video.name}
                      </button>
                    ))}
                  </div>
                  {index < videoGroups.length - 1 && (
                    <div className="my-4 border-t border-white/10" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function createVideoGroups(videos: VideoData[]): VideoGroup[] {
  const groups = videos.reduce((acc, video) => {
    const existingGroup = acc.find((g) => g.category === video.category);
    if (existingGroup) {
      existingGroup.items.push(video);
    } else {
      acc.push({ category: video.category, items: [video] });
    }
    return acc;
  }, [] as VideoGroup[]);

  return sortVideoGroups(groups);
}

function sortVideoGroups(groups: VideoGroup[]): VideoGroup[] {
  return groups.sort((a, b) => {
    const aIndex = CATEGORY_ORDER.findIndex((needle) =>
      a.category.toLowerCase().includes(needle)
    );
    const bIndex = CATEGORY_ORDER.findIndex((needle) =>
      b.category.toLowerCase().includes(needle)
    );

    if (aIndex === -1 && bIndex === -1)
      return a.category.localeCompare(b.category);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}
