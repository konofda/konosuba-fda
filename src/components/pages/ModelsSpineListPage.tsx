import { Fragment, useMemo, useState } from 'react';
import { Play } from 'lucide-react';

import { Header } from '@/components/Header';
import { useSpineData } from '@/hooks/useSpineData';
import { SpineModel } from '@/types';

type Category = 'ally' | 'enemy' | 'assist';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'ally', label: 'Characters' },
  { value: 'enemy', label: 'Enemies' },
  { value: 'assist', label: 'Assists' },
];

export function ModelsSpineListPage() {
  const { data, isLoading, error } = useSpineData();
  const [selectedCategory, setSelectedCategory] = useState<Category>('ally');

  const modelsByCharacter = useMemo(() => {
    if (!data) return {};

    return data
      .filter((model) => model.category === selectedCategory)
      .reduce((acc, model) => {
        const name = model.character_name || '? ? ?';
        if (!acc[name]) {
          acc[name] = [];
        }
        acc[name].push(model);
        return acc;
      }, {} as Record<string, SpineModel[]>);
  }, [data, selectedCategory]);

  // Keep unknown characters at the end but don't sort the rest
  const sortedCharacters = useMemo(() => {
    if (!modelsByCharacter) return [];
    const chars = Object.keys(modelsByCharacter);
    const unknownIndex = chars.indexOf('? ? ?');
    if (unknownIndex !== -1) {
      chars.splice(unknownIndex, 1);
      chars.push('? ? ?');
    }
    return chars;
  }, [modelsByCharacter]);

  return (
    <>
      <Header title="Spine Animations" />
      <div className="container mx-auto py-8 px-4 flex gap-6">
        {/* Sidebar */}
        <div className="w-72 bg-black/10 backdrop-blur-sm rounded-lg h-[calc(100vh-8rem)] flex flex-col">
          {/* Category Filter */}
          <div className="p-3 border-b border-white/10">
            <div className="flex gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`
                    flex-1 px-3 py-1.5 rounded-md text-sm font-medium
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
          </div>

          {/* Character List */}
          <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
            {isLoading && (
              <div className="text-white/80 text-sm p-2">Loading...</div>
            )}

            {error && (
              <div className="text-red-400 text-sm p-2">
                Error: {error.message}
              </div>
            )}

            {sortedCharacters.map((character, index) => (
              <Fragment key={character}>
                <div className="mb-2">
                  <div className="text-white/90 text-sm font-medium px-2 py-1">
                    {character}
                  </div>
                  <div>
                    {modelsByCharacter[character].map((model) => (
                      <button
                        key={model.path_json}
                        title={model.path_json}
                        className="w-full text-left py-1 px-2 rounded text-xs
                          text-white/60 hover:text-white hover:bg-white/5
                          transition-colors duration-200 truncate"
                      >
                        {model.name}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Add separator if not the last group */}
                {index < sortedCharacters.length - 1 && (
                  <div className="my-4 border-t border-white/25" />
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="inline-block p-2 rounded-full bg-white/5 mb-4">
              <Play className="w-8 h-8 text-white/90" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              Help Implement Spine Animations!
            </h2>
            <p className="text-sm text-white/80 mb-4">
              If you know your way around Spine runtime and want to help get
              these battle animations working, drop by! Thanks to Konofan for
              gathering all these amazing animations.
            </p>
            <a
              href="https://github.com/HaiKonofanDesu/konofan-assets-jp-sortet"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
                bg-white/10 hover:bg-white/20 text-white text-sm
                transition-colors duration-200"
            >
              <Play className="w-4 h-4" />
              <span>Check it out</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
