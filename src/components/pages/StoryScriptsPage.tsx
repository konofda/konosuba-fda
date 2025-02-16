import { FileText } from 'lucide-react';
import { useState } from 'react';

import { Header } from '@/components/Header';
import {
  useAllStories,
  useStoryScriptData,
  type StoryData,
  type StoryType,
} from '@/hooks/useStoryScriptData';

const STORY_TYPE_LABELS: Record<StoryType, string> = {
  main: 'Main Story',
  member: 'Member Stories',
  event: 'Event Stories',
  gacha: 'Gacha Stories',
  unique: 'Unique Stories',
  reminiscence: 'Reminiscence',
  etc: 'Other Stories',
};

const stripHtmlTags = (text: string) => {
  return text.replace(/<[^>]*>/g, '');
};

function StoryListItem({
  story,
  isSelected,
  onClick,
}: {
  story: StoryData;
  isSelected: boolean;
  onClick: () => void;
}) {
  const isDisabled = !story.scriptPath;
  const cleanTitle = stripHtmlTags(story.title_text);

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      title={isDisabled ? 'Preview not available' : cleanTitle}
      className={`
        w-full text-left py-1 px-2 rounded text-xs
        transition-colors duration-200 truncate 
        ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'hover:text-black hover:bg-black/5'}
        ${isSelected ? 'bg-black/10 text-black' : 'text-black/60'}
      `}
    >
      <div className="flex items-center gap-1.5">
        <FileText className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
        <span className="truncate">{cleanTitle}</span>
      </div>
    </button>
  );
}

export function StoryScriptsPage() {
  const { data: storyGroups = [], isLoading: isLoadingList } = useAllStories();
  const [selectedStory, setSelectedStory] = useState<StoryData | null>(null);
  const {
    data: storyContent,
    isLoading: isLoadingContent,
    error,
  } = useStoryScriptData(selectedStory?.scriptPath ?? null);

  const renderContent = () => {
    if (!selectedStory) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="inline-block p-2 mb-1">
              <FileText className="w-16 h-16 text-white/90" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">
              Select a Story
            </h2>
            <p className="text-sm text-white/80 font-semibold">
              Choose a story from the list to view its contents
            </p>
          </div>
        </div>
      );
    }

    if (!selectedStory.scriptPath) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <h2 className="text-xl font-bold text-white mb-3">
              Preview Not Available
            </h2>
            <p className="text-sm text-white/80">
              This story doesn't have a preview available.
            </p>
          </div>
        </div>
      );
    }

    if (isLoadingContent) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white/90 rounded-full animate-spin mb-4" />
            <div className="text-white/90">Loading story...</div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6 bg-black/30 backdrop-blur-md rounded-lg">
            <div className="text-red-400 text-lg font-semibold mb-2">
              Error loading story
            </div>
            <div className="text-white/80 mb-4">
              {error instanceof Error
                ? error.message
                : 'An unknown error occurred'}
            </div>
            <button
              onClick={() => setSelectedStory(null)}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Go back
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="h-[calc(100vh-8rem)]">
        <div className="h-full bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="h-full overflow-y-auto p-8 story-scrollbar">
            {storyContent && (
              <div className="max-w-3xl mx-auto space-y-4">
                {storyContent.split('\n').map((line, index) => {
                  const dialogueMatch = line.match(/^([^:]+):(.*)/);

                  // Special handling for first line if it's not dialogue
                  if (index === 0 && !line.includes(':')) {
                    return (
                      <h1
                        key={index}
                        className="text-3xl font-bold text-black/90 mb-6"
                      >
                        {line.trim()}
                      </h1>
                    );
                  }

                  if (dialogueMatch) {
                    const [, character, dialogue] = dialogueMatch;
                    return (
                      <div key={index} className="gap-2">
                        <span className="font-bold text-black/90 mr-2">
                          {character}:
                        </span>
                        <span className="text-black/80">{dialogue.trim()}</span>
                      </div>
                    );
                  }

                  if (line.trim()) {
                    return (
                      <p key={index} className="text-black/70 italic">
                        {line}
                      </p>
                    );
                  }

                  return <div key={index} className="h-2" />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header title="Story Scripts" />
      <div className="container mx-auto py-8 px-4 flex gap-6">
        <div className="w-96 bg-white/80 backdrop-blur-sm rounded-lg p-2 h-[calc(100vh-8rem)]">
          <div className="flex-none p-2 text-sm font-medium text-black/90 border-b border-black/10">
            Stories
          </div>
          <div className="overflow-y-auto story-scrollbar h-[calc(100%-3rem)]">
            {isLoadingList ? (
              <div className="text-black/80 text-sm p-2">Loading...</div>
            ) : (
              storyGroups.map(({ type, stories }) => (
                <div key={type} className="mb-4">
                  <div className="text-black/90 text-sm font-medium px-2 py-1">
                    {STORY_TYPE_LABELS[type]}
                  </div>
                  <div>
                    {stories.map((story) => (
                      <StoryListItem
                        key={story.id}
                        story={story}
                        isSelected={selectedStory?.id === story.id}
                        onClick={() => setSelectedStory(story)}
                      />
                    ))}
                  </div>
                  <div className="my-4 border-t border-black/10" />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex-1 relative flex items-center justify-center">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <img
              src="/img/konosuba_logo_stamp.png"
              alt="Konosuba Logo"
              className="w-[400px] opacity-20 brightness-[100]"
            />
          </div>
          <div className="w-full h-full flex items-center justify-center">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
}
