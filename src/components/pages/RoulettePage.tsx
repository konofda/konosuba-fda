import { useState } from 'react';
import { Header } from '@/components/Header';
// import { ASSET_URL_BASE } from '@/constants';

const ASSET_URL_BASE = 'https://raw.githubusercontent.com/HaiKonofanDesu/konofan-assets-jp-sortet/main/Assets/AddressableAssetsStore/UnityAssets';
const backgrounds = [
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2022111/RouletteLoginBonusBackground_2022111/RouletteLoginBonusBackground_2022111.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2021011/RouletteLoginBonusBackground_2021011/roulette_login_bonus_2021011_bg.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2022051/RouletteLoginBonusBackground_2022051/roulette_login_bonus_2022051_bg.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2023011/RouletteLoginBonusBackground_2023011/RouletteLoginBonusBackground_2023011.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2023031/RouletteLoginBonusBackground_2023031/RouletteLoginBonusBackground_2023031.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2023081/RouletteLoginBonusBackground_2023081/RouletteLoginBonusBackground_2023081.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2023122/RouletteLoginBonusBackground_2023122/RouletteLoginBonusBackground_2023122.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2024011/RouletteLoginBonusBackground_2024021/RouletteLoginBonusBackground_2024021.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2024031/RouletteLoginBonusBackground_2024031/RouletteLoginBonusBackground_2024031.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2024091/RouletteLoginBonusBackground_2024091/RouletteLoginBonusBackground_2024091.png',
];

const boards = [
  '/Common/Images/RouletteLoginBonus/roulette_board.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2021011/roulette_board_2021011.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2022051/roulette_board_2022051.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2022111/roulette_board_2022111.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2023011/roulette_board_2023011.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2024091/roulette_board_2024091.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2024011/roulette_board_2024021.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2023081/roulette_board_2023081.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2023122/roulette_board_2023122.png',
];

const specialFrames = [
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2024011/roulette_frame_2024021.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2023081/roulette_frame_2023081.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2023122/roulette_frame_2023122.png',
];

const centers = [
  '/Common/Images/RouletteLoginBonus/CenterIcon/roulette_center_icon.png',
  '/Common/Images/RouletteLoginBonus/CenterIcon/roulette_center_icon_t.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2022111/roulette_center_icon_b.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2023122/roulette_center_icon_ts.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2024011/roulette_center_icon_k.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2023081/roulette_center_icon_h.png',
];

const circles = [
  '/Common/Images/RouletteLoginBonus/roulette_circle_default.png',
  '/Common/Images/RouletteLoginBonus/roulette_circle_100.png',
  '/Common/Images/RouletteLoginBonus/roulette_circle_50.png',
];

const blurredCircles = [
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2021011/roulette_rotate_1.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2021011/roulette_rotate_2.png',
  '/Common/Images/RouletteLoginBonus/RouletteLoginBonus2021011/roulette_rotate_2.png',
];

export function RoulettePage() {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [boardIndex, setBoardIndex] = useState(0);
  const [centerIndex, setCenterIndex] = useState(0);
  const [circleIndex, setCircleIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const nextBackground = () => {
    setBackgroundIndex((backgroundIndex + 1) % backgrounds.length);
  };

  const nextBoard = () => {
    setBoardIndex((boardIndex + 1) % boards.length);
  };

  const nextCenter = () => {
    setCenterIndex((centerIndex + 1) % centers.length);
  };

  const nextMode = () => {
    setCircleIndex((circleIndex + 1) % circles.length);
  };

  const toggleSpinning = () => {
    setIsSpinning(!isSpinning);
  };

  const boardId = boards[boardIndex].match(/(\d{7})/)?.[1];
  const frameUrl = boardId && specialFrames.find(frame => frame.includes(boardId)) 
    ? `${ASSET_URL_BASE}${specialFrames.find(frame => frame.includes(boardId))}`
    : `${ASSET_URL_BASE}/Common/Images/LoginBonus/RouletteLoginBonus/roulette_frame.png`;

  const currentCircle = isSpinning ? blurredCircles[circleIndex] : circles[circleIndex];

  const controls = (
    <div className="flex items-center gap-2">
      <button
        onClick={nextBackground}
        className="px-3 py-1.5 rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors duration-200"
      >
        Next BG
      </button>
      <button
        onClick={nextBoard}
        className="px-3 py-1.5 rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors duration-200"
      >
        Next Board
      </button>
      <button
        onClick={nextCenter}
        className="px-3 py-1.5 rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors duration-200"
      >
        Next Center
      </button>
      <button
        onClick={nextMode}
        className="px-3 py-1.5 rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors duration-200"
      >
        Next Mode
      </button>
      <button
        onClick={toggleSpinning}
        className={`
          px-3 py-1.5 rounded-lg transition-colors duration-200
          ${isSpinning 
            ? 'bg-white/20 text-white' 
            : 'text-white/60 hover:bg-white/10 hover:text-white'}
        `}
      >
        {isSpinning ? 'Stop' : 'Spin'}
      </button>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <img
        src={`${ASSET_URL_BASE}${backgrounds[backgroundIndex]}`}
        alt="Roulette Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10">
        <Header title="Roulette">{controls}</Header>
        <div className="container mx-auto py-8 px-4 flex justify-center items-center">
          <div className="relative">
            <div className="flex justify-center items-center" style={{ transform: 'scale(.5)' }}>
              <img
                src={`${ASSET_URL_BASE}${boards[boardIndex]}`}
                alt="Roulette Board"
                className="object-contain"
              />
              <img
                src={frameUrl}
                alt="Roulette Frame"
                className={`
                  object-contain absolute
                  ${isSpinning ? 'animate-spin' : ''}
                  transition-[animation] duration-500
                `}
                style={{ animationDuration: '0.5s' }}
              />
              <img
                src={`${ASSET_URL_BASE}${currentCircle}`}
                alt="Roulette Circle"
                className={`
                  object-contain absolute
                  ${isSpinning ? 'animate-spin' : ''}
                  transition-all duration-500
                `}
                style={{ animationDuration: '0.5s' }}
              />
              <img
                src={`${ASSET_URL_BASE}${centers[centerIndex]}`}
                alt="Roulette Center"
                className="object-contain absolute"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 