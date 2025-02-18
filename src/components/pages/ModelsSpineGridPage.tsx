import { Bug, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Header } from '@/components/Header';
import { useSpineData } from '@/hooks/useSpineData';
import { SpinePlayer } from '@/components/SpinePlayer';
import { useCharacterData } from '@/hooks/useCharacterData';

const ASSET_BASE_URL =
  'https://raw.githubusercontent.com/HaiKonofanDesu/konofan-assets-jp-sortet/main/';

type Category = 'ally' | 'enemy' | 'assist';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'ally', label: 'Allies' },
  { value: 'enemy', label: 'Enemies' },
  { value: 'assist', label: 'Assists' },
];

const ITEMS_PER_PAGE = 12;

interface SpineUrls {
  jsonUrl: string;
  atlasUrl: string;
}

function DebugView({ urls }: { urls: SpineUrls }) {
  return (
    <pre className="text-[10px] text-white/90 p-2 h-full overflow-auto whitespace-pre-wrap break-all">
      {JSON.stringify(urls, null, 2)}
    </pre>
  );
}

function getSpineUrls(path: string): SpineUrls {
  const jsonUrl = ASSET_BASE_URL + path;
  const atlasUrl = jsonUrl.replace(/\.(txt|json)$/, '.atlas');
  return { jsonUrl, atlasUrl };
}

export function ModelsSpineGridPage() {
  const { data, isLoading, error } = useSpineData();
  const { data: characterData } = useCharacterData();
  const [selectedCategory, setSelectedCategory] = useState<Category>('ally');
  const [currentPage, setCurrentPage] = useState(1);
  const [debugMode, setDebugMode] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = //
    useState<string | null>(null);

  // Get characters and set initial selected character
  const {
    filteredModels,
    characters,
    totalPages,
    totalModels,
    characterNames,
  } = useMemo(() => {
    if (!data)
      return {
        filteredModels: [],
        characters: [],
        totalPages: 0,
        totalModels: 0,
        characterNames: new Map(),
      };

    // Create a map of base_id to character names
    const charNames = new Map<string, string>();
    if (characterData) {
      characterData.forEach((char) => {
        charNames.set(char.base_id, char.name);
      });
    }

    // First, filter by category and ensure uniqueness by path
    let models = Array.from(
      new Map(
        data
          .filter((model) => model.category === selectedCategory)
          .map(model => [model.id, model])
      ).values()
    );

    // Get unique base_ids for ally category without sorting
    const chars =
      selectedCategory === 'ally'
        ? Array.from(new Set(models.map((m) => m.base_id).filter(Boolean)))
        : [];

    // For ally category, filter by selected character
    if (selectedCategory === 'ally' && selectedCharacter) {
      models = models.filter((model) => model.base_id === selectedCharacter);
    }

    const total = models.length;
    const pages = Math.ceil(total / ITEMS_PER_PAGE);

    // Get current page's models
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageModels = models.slice(start, start + ITEMS_PER_PAGE);

    // If no character is selected and we have characters, select the first one
    if (selectedCategory === 'ally' && !selectedCharacter && chars.length > 0) {
      setSelectedCharacter(chars[0]);
    }

    return {
      filteredModels: pageModels,
      characters: chars,
      totalPages: pages,
      totalModels: total,
      characterNames: charNames,
    };
  }, [data, characterData, selectedCategory, currentPage, selectedCharacter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSelectedCharacter(null);
  };

  const handleCharacterChange = (char: string) => {
    setSelectedCharacter(char);
    setCurrentPage(1);
  };

  const controls = (
    <button
      onClick={() => setDebugMode(!debugMode)}
      className={`
        flex items-center gap-2 px-3 py-1 rounded
        transition-all duration-200 text-sm
        ${
          debugMode
            ? 'bg-white text-gray-800 shadow'
            : 'text-gray-300 hover:text-white'
        }
      `}
    >
      <Bug className="w-4 h-4" />
      <span className="font-medium">Debug</span>
    </button>
  );

  if (isLoading) {
    return (
      <>
        <Header title="Grid Spine Animations">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-white">
          Loading animations...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="Grid Spine Animations">{controls}</Header>
        <div className="container mx-auto py-8 text-center text-red-500">
          Error loading animations: {error.message}
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Grid Spine Animations">{controls}</Header>
      <div className="container mx-auto py-8 px-4">
        {/* Category Filter */}
        <div className="flex gap-2 mb-6">
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  selectedCategory === category.value
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Character Filter (only for allies) */}
        {selectedCategory === 'ally' && characters.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {characters.map((char) => (
                <button
                  key={char}
                  onClick={() => handleCharacterChange(char)}
                  className={`
                    px-3 py-1 rounded text-sm
                    transition-all duration-200
                    ${
                      selectedCharacter === char
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  {characterNames.get(char) || char}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Top Pagination */}
        {totalPages > 1 && (
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-6">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`
                flex items-center justify-center h-10
                transition-all duration-200 rounded-lg
                ${
                  currentPage === 1
                    ? 'text-white/20 cursor-not-allowed'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }
              `}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-white/80 text-sm whitespace-nowrap">
              Page {currentPage} of {totalPages} ({totalModels} models total)
            </div>

            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`
                flex items-center justify-center h-10
                transition-all duration-200 rounded-lg
                ${
                  currentPage === totalPages
                    ? 'text-white/20 cursor-not-allowed'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }
              `}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">

          {filteredModels.map((model) => {
            const urls = getSpineUrls(model.path);

            return (
              <div
                key={model.path}
                className="aspect-square bg-[#20232f] rounded-lg overflow-hidden
                  ring-1 ring-white/5 shadow-md
                  hover:ring-white/10 hover:shadow-lg
                  transition-all duration-200"
              >
                {debugMode ? (
                  <DebugView urls={urls} />
                ) : (
                  <SpinePlayer
                    {...urls}
                    onError={(error) =>
                      console.error(
                        '❌ Failed to load spine:',
                        model.name,
                        error
                      )
                    }
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Page Numbers */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center flex-wrap gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`
                  min-w-[20px] h-5 px-1 rounded text-[10px] font-medium
                  transition-colors duration-200
                  ${
                    currentPage === page
                      ? 'bg-white/20 text-white'
                      : 'text-white/40 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
