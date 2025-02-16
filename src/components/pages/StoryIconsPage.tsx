import { useQuery } from '@tanstack/react-query';

import { Header } from '@/components/Header';
import { API_URL_BASE, ASSET_URL_BASE } from '@/constants';
import { useAxelEndpointData } from '@/hooks/useAxelEndpointData';

// Story-related endpoints that have list_icon fields
const STORY_ENDPOINTS = [
  'story_main',
  'story_event',
  'story_member',
  'story_gacha',
  'story_reminiscence',
  'story_unique',
  'story_etc',
] as const;

const ENDPOINT_LABELS: Record<(typeof STORY_ENDPOINTS)[number], string> = {
  story_etc: 'Other Stories',
  story_event: 'Event Stories',
  story_gacha: 'Gacha Stories',
  story_main: 'Main Story',
  story_member: 'Member Stories',
  story_reminiscence: 'Reminiscence',
  story_unique: 'Unique Stories',
};

interface IconMapping {
  [key: string]: string;
}

function useIconMapping() {
  return useQuery({
    queryKey: ['iconMapping'],
    queryFn: async () => {
      const response = await fetch(`${API_URL_BASE}v1/dict-list-icons.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch icon mapping');
      }
      return response.json() as Promise<IconMapping>;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

interface StoryIcon {
  id: string;
  title: string;
  iconKey: string;
}

function IconGrid({
  icons,
  iconMapping,
}: {
  icons: StoryIcon[];
  iconMapping: IconMapping;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {icons.map((icon) => {
        const iconPath = iconMapping[icon.iconKey];
        return (
          <div key={icon.id} className="inline-block h-36 group relative">
            {iconPath ? (
              <img
                src={ASSET_URL_BASE + iconPath}
                alt={icon.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <img
                src={'./img/frame_missing.png'}
                alt={icon.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
            <div className="absolute inset-2 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end rounded-md">
              <div className="text-white font-semibold text-xs py-2 px-3 w-full select-none">
                {icon.title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function StoryIconsPage() {
  const { data: iconMapping = {}, isLoading: isLoadingMapping } =
    useIconMapping();

  // Fetch all story endpoints in parallel
  const storyQueries = STORY_ENDPOINTS.map((endpoint) => {
    const { data = [], isLoading } = useAxelEndpointData(endpoint);
    return {
      endpoint,
      data: data.map(
        (item: any): StoryIcon => ({
          id: item.id,
          title: item.title_text || item.name || `Story ${item.id}`,
          iconKey: `${item.list_icon_type}_${item.list_icon_id}`,
        })
      ),
      isLoading,
    };
  });

  const isLoading = isLoadingMapping || storyQueries.some((q) => q.isLoading);

  if (isLoading) {
    return (
      <>
        <Header title="Story Icons" />
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white/90 rounded-full animate-spin mb-4" />
              <div className="text-white/90">Loading icons...</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Story Icons" />
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-8">
          {storyQueries.map(({ endpoint, data }) => (
            <div key={endpoint}>
              <h2 className="text-xl font-bold text-white/90 mb-4">
                {ENDPOINT_LABELS[endpoint]}
              </h2>
              <IconGrid icons={data} iconMapping={iconMapping} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
