import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { ASSET_URL_BASE } from '@/constants';
import { useCharacterData } from '@/hooks/useCharacterData';
import { Stroked, type StrokeTuple } from '@/components/common/Stroked';
import { Header } from '@/components/Header';
import { NineSliceImage } from '@/components/common/NineSliceImage';

import type { CharacterData } from '@/hooks/useCharacterData';

const TRANSITION_DURATION = 20;
const VISIBLE_CARDS = 7; // Total visible cards (3 on each side + 1 center)

interface CarouselNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

function CarouselNavigation({ onPrevious, onNext }: CarouselNavigationProps) {
  const chevronStrokes: StrokeTuple[] = [
    ['#00000030', 0, 1], // Black on bottom
    ['#ff69b4ff', 2, 0], // Hot pink on top
  ];

  return (
    <>
      <button
        onClick={onPrevious}
        className="absolute left-0 z-20 w-1/4 h-full flex items-center justify-start
          hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent
          transition-all duration-200"
        aria-label="Previous character"
      >
        <div className="ml-8 p-3 transition-transform duration-200 transform group-hover:scale-110">
          <Stroked strokes={chevronStrokes}>
            <ChevronLeft className="w-12 h-12 text-white" strokeWidth={3} />
          </Stroked>
        </div>
      </button>
      <button
        onClick={onNext}
        className="absolute right-0 z-20 w-1/4 h-full flex items-center justify-end
          hover:bg-gradient-to-l hover:from-white/5 hover:to-transparent
          transition-all duration-200"
        aria-label="Next character"
      >
        <div className="mr-8 p-3 transition-transform duration-200 transform group-hover:scale-110">
          <Stroked strokes={chevronStrokes}>
            <ChevronRight className="w-12 h-12 text-white" strokeWidth={3} />
          </Stroked>
        </div>
      </button>
    </>
  );
}

interface CharacterImageProps {
  character: CharacterData;
  position: number;
  isTransitioning: boolean;
}

function CharacterImage({
  character,
  position,
  isTransitioning,
}: CharacterImageProps) {
  const offset = position - 3; // Center card at position 3
  const opacity = 1 - (Math.abs(offset) * 0.2) ** 2;
  const nameStrokes: StrokeTuple[] = [
    ['#00000030', 0, 1], // Black on bottom
    ['#000000D0', 2, 0], // Black on top
  ];

  return (
    <div
      className={`
        absolute left-1/2 top-1/2 transition-all duration-300
        ${isTransitioning ? 'transition-transform' : ''}
      `}
      style={{
        transform: `
          translate(-50%, -50%)
          translateX(${offset * 180}px)
          scale(${1 - Math.abs(offset) * 0.15})
        `,
        zIndex: 10 - Math.abs(offset),
        opacity,
      }}
    >
      <div
        className={`relative transition-all duration-300 ${offset === 0 ? 'transform scale-110' : ''}`}
      >
        <img
          src={ASSET_URL_BASE + character.image_sprite}
          alt={character.name}
          className="max-h-[500px]"
        />
        {offset === 0 && (
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
            <Stroked strokes={nameStrokes}>
              <div className="text-white">
                <span className="text-4xl font-black">{character.name}</span>
                {character.is_collab && (
                  <div className="text-cyan-400 text-lg font-bold mt-1">
                    (Collab)
                  </div>
                )}
              </div>
            </Stroked>
          </div>
        )}
      </div>
    </div>
  );
}

interface DetailItemProps {
  label: string;
  value?: string;
  placeholder: string;
  format?: (value: string) => string;
}

function DetailItem({ label, value, placeholder, format }: DetailItemProps) {
  const displayValue = value ? (format ? format(value) : value) : placeholder;

  return (
    <div>
      <label className="text-cyan-600 font-semibold block mb-1">{label}</label>
      <p className="text-zinc-600 font-bold">{displayValue}</p>
    </div>
  );
}

function CharacterDetails({ character }: { character: CharacterData }) {
  const hasDetails =
    character.flavor_text ||
    character.weapon_type ||
    character.character_voice ||
    (character.birthday && character.birthday !== '0') ||
    character.notice_text;

  if (!hasDetails) return null;

  return (
    <div className="mt-24 mb-8 mx-auto max-w-xl p-12 relative">
      <NineSliceImage
        className="w-full h-full absolute inset-0"
        src="https://raw.githubusercontent.com/HaiKonofanDesu/konofan-assets-jp-sortet/main/Assets/AddressableAssetsStore/UnityAssets/Common/Images/Quest/QuestUI/quest_list_frame.png"
        inset={50}
        zoom={0.75}
      />

      <div className="space-y-6 relative z-10">
        {character.flavor_text && (
          <div>
            <p className="text-zinc-950 italic">{character.flavor_text}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {character.weapon_type && (
            <DetailItem
              label="Weapon Type"
              value={character.weapon_type}
              placeholder="Unknown weapon type"
            />
          )}

          {character.birthday && character.birthday !== '0' && (
            <DetailItem
              label="Birthday"
              value={character.birthday}
              placeholder="Birthday not specified"
              format={(value) => (value === '0' ? 'Not specified' : value)}
            />
          )}

          {character.character_voice && (
            <DetailItem
              label="Voice Actor"
              value={character.character_voice}
              placeholder="No voice actor information"
            />
          )}
        </div>

        {character.notice_text && (
          <div>
            <p className="text-amber-600 font-semibold italic">
              {character.notice_text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function MemberCharactersCarouselPage() {
  const { data: characters, isLoading, error } = useCharacterData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrevious = () => {
    if (isTransitioning || !characters) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prev) => (prev - 1 + characters.length) % characters.length
    );
  };

  const handleNext = () => {
    if (isTransitioning || !characters) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % characters.length);
  };

  useEffect(() => {
    const timer = setTimeout(
      () => setIsTransitioning(false),
      TRANSITION_DURATION
    );
    return () => clearTimeout(timer);
  }, [currentIndex]);

  if (isLoading) {
    return (
      <>
        <Header title="Member Characters Carousel" />
        <div className="container mx-auto py-8 text-center text-white">
          Loading characters...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="Member Characters Carousel" />
        <div className="container mx-auto py-8 text-center text-red-500">
          Error loading characters: {error.message}
        </div>
      </>
    );
  }

  if (!characters) return null;

  const visibleCharacters = Array.from({ length: VISIBLE_CARDS }, (_, i) => {
    const index =
      (currentIndex + (i - 3) + characters.length) % characters.length;
    return { character: characters[index], position: i };
  });

  return (
    <>
      <Header title="Member Characters Carousel" />
      <div className="container mx-auto pt-12 pb-32">
        <div className="relative h-[600px] flex items-center justify-center">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <img
              src="/img/konosuba_logo_stamp.png"
              alt="Konosuba Logo"
              className="w-[400px] opacity-20"
            />
          </div>

          <CarouselNavigation onPrevious={handlePrevious} onNext={handleNext} />

          <div className="relative w-full h-full">
            {visibleCharacters.map(({ character, position }) => (
              <CharacterImage
                key={character.base_id}
                character={character}
                position={position}
                isTransitioning={isTransitioning}
              />
            ))}
          </div>
        </div>

        {/* <div className="flex justify-center gap-1 mt-16">
          {characters.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${currentIndex === index ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50'}
              `}
              aria-label={`Go to character ${index + 1}`}
            />
          ))}
        </div> */}

        <CharacterDetails character={characters[currentIndex]} />
      </div>
    </>
  );
}
