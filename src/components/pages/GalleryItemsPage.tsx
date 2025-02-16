import { Video, Image } from 'lucide-react';

import { Header } from '@/components/Header';
import { ASSET_URL_BASE } from '@/constants';
import { useAxelEndpointData } from '@/hooks/useAxelEndpointData';
import { useStoryStillData } from '@/hooks/useStoryStillData';
import { useSongData } from '@/hooks/useSongData';
import { LoadingImage } from '@/components/common/LoadingImage';
import type {
  GalleryGroup,
  GalleryMovie,
  GalleryStill,
} from '@/types/api-axel';

interface GallerySection {
  id: string;
  groupName: string;
  movies: GalleryMovie[];
  stills: GalleryStill[];
}

export function GalleryItemsPage() {
  const { data: groups = [] } = useAxelEndpointData('gallery_group');
  const { data: movies = [] } = useAxelEndpointData('gallery_movie');
  const { data: stills = [] } = useAxelEndpointData('gallery_still');
  const { data: stillData = [] } = useStoryStillData();
  const { data: songData = [] } = useSongData();

  console.log({ groups, movies, stills, stillData, songData });

  const isLoading = !groups.length && !movies.length && !stills.length;

  // Organize data by group, ensuring all required fields are present
  const gallerySections: GallerySection[] = groups
    .filter(
      (group): group is GalleryGroup =>
        typeof group.id === 'string' && typeof group.group_name === 'string'
    )
    .map((group) => ({
      id: group.id,
      groupName: group.group_name,
      movies: movies.filter(
        (movie): movie is GalleryMovie =>
          typeof movie.group_id === 'string' &&
          movie.group_id === group.id &&
          typeof movie.title === 'string'
      ),
      stills: stills.filter(
        (still): still is GalleryStill =>
          typeof still.group_id === 'string' &&
          still.group_id === group.id &&
          typeof still.still === 'string'
      ),
    }));

  if (isLoading) {
    return (
      <>
        <Header title="Gallery Items" />
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white/90 rounded-full animate-spin mb-4" />
              <div className="text-white/90">Loading gallery items...</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const renderThumbnail = (id: string, title: string, isMovie = false) => {
    let imageUrl: string | undefined;

    if (isMovie) {
      const songInfo = songData.find((s) => s.list_icon === id);
      imageUrl = songInfo?.icon || undefined;
    } else {
      const stillInfo = stillData.find((s) => s.id === id);
      imageUrl = stillInfo?.icon_still || undefined;
    }

    return (
      <div className="inline-block m-0.5 group relative">
        <div
          className="rounded overflow-hidden"
          style={{ zoom: 0.4 }}
          onClick={() =>
            imageUrl &&
            window.open(ASSET_URL_BASE + imageUrl, '_blank')?.focus()
          }
        >
          <LoadingImage
            src={
              imageUrl ? ASSET_URL_BASE + imageUrl : './img/frame_missing.png'
            }
            placeholderSrc="./img/middle_icon_placeholder.png"
            alt={title}
            className="w-full h-full object-cover cursor-pointer"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <Header title="Gallery Items" />
      <div className="container mx-auto py-4 px-4">
        <div className="grid grid-cols-2 gap-4">
          {gallerySections.map((section) => (
            <div
              key={section.id}
              className="bg-black/20 backdrop-blur-sm rounded-lg p-3"
            >
              <h2 className="text-base font-bold text-white/90 mb-2">
                {section.groupName}
              </h2>

              {section.movies.length > 0 && (
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-white/80 mb-1 flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    Movies
                  </h3>
                  <div className="-m-0.5">
                    {section.movies.map((movie) =>
                      renderThumbnail(movie.list_icon, movie.title, true)
                    )}
                  </div>
                </div>
              )}

              {section.stills.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-white/80 mb-1 flex items-center gap-1">
                    <Image className="w-3 h-3" />
                    Stills
                  </h3>
                  <div className="-m-0.5">
                    {section.stills.map((still) =>
                      renderThumbnail(still.still, `Still ${still.still}`)
                    )}
                  </div>
                </div>
              )}

              {section.movies.length === 0 && section.stills.length === 0 && (
                <div className="text-white/60 text-center py-2 text-xs">
                  No items in this group
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
