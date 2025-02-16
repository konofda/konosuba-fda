import React from 'react';
import { Github } from 'lucide-react';

import { Header } from '@/components/Header';
import { useLive2DData } from '@/hooks/useLive2DData';
import { Live2DModel } from '@/types';

export function ModelsLive2DPage() {
  const { data, isLoading, error } = useLive2DData();

  const sortedModels = React.useMemo(() => {
    if (!data)
      return { known: [] as Live2DModel[], unknown: [] as Live2DModel[] };

    return data.reduce(
      (acc, model) => {
        if (!model.character_name || model.character_name === 'null') {
          acc.unknown.push(model);
        } else {
          acc.known.push(model);
        }
        return acc;
      },
      { known: [] as Live2DModel[], unknown: [] as Live2DModel[] }
    );
  }, [data]);

  const modelsByCharacter = React.useMemo(() => {
    const groups = {} as Record<string, Live2DModel[]>;

    // Group known characters
    sortedModels.known.forEach((model) => {
      if (!groups[model.character_name]) {
        groups[model.character_name] = [];
      }
      groups[model.character_name].push(model);
    });

    // Add unknown characters at the end
    if (sortedModels.unknown.length > 0) {
      groups['? ? ?'] = sortedModels.unknown;
    }

    return groups;
  }, [sortedModels]);

  return (
    <>
      <Header title="Live2D (WIP)" />
      <div className="container mx-auto py-8 px-4 flex gap-6">
        {/* Character List */}
        <div className="w-72 bg-black/10 backdrop-blur-sm rounded-lg p-2 h-[calc(100vh-8rem)] overflow-y-auto">
          {isLoading && (
            <div className="text-white/80 text-sm p-2">Loading...</div>
          )}

          {error && (
            <div className="text-red-400 text-sm p-2">
              Error: {error.message}
            </div>
          )}

          {modelsByCharacter &&
            Object.entries(modelsByCharacter).map(
              ([character, models], index, array) => (
                <React.Fragment key={character}>
                  <div className="mb-2">
                    <div className="text-white/90 text-sm font-medium px-2 py-1">
                      {character}
                    </div>
                    <div>
                      {models.map((model) => (
                        <button
                          key={model.path}
                          title={model.path}
                          className="w-full text-left py-1 px-2 rounded text-xs
                        text-white/60 hover:text-white hover:bg-white/5
                        transition-colors duration-200 truncate"
                        >
                          {model.model_name}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Add separator if not the last group */}
                  {index < array.length - 1 && (
                    <div className="my-4 border-t border-white/25" />
                  )}
                </React.Fragment>
              )
            )}
        </div>

        {/* Implementation Message */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <img
              src="/img/konosuba_logo_stamp.png"
              alt="Konosuba Logo"
              className="w-[400px] opacity-30 brightness-[0]"
            />
          </div>
          <div className="text-center max-w-md z-10">
            <h2 className="text-xl font-bold text-white my-3">
              Live2D Implementation Needed!
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Shoutout to Konofan for this amazing collection of Live2D models!
              I'm looking for help to get them working here - if you know your
              way around Live2D Cubism, drop by and lend a hand!
            </p>
            <a
              href="https://github.com/HaiKonofanDesu/konofan-assets-jp-sortet"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
                bg-white/10 hover:bg-white/20 text-white text-sm
                transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              <span>Contribute</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
