import { ROUTES } from '@/constants';
import { useEffect, useRef, useState } from 'react';
import { NineSliceImage } from '../common/NineSliceImage';

const MENU_ROUTES = [
  {
    path: 'cards',
    icon: 'https://raw.githubusercontent.com/HaiKonofanDesu/konofan-assets-jp-sortet/main/Assets/AddressableAssetsStore/UnityAssets/Common/Images/GlobalMenuUI/GlobalMenuUI_210501/menu_icon_chara.png',
  },
  {
    path: 'character-carousel',
    icon: 'https://raw.githubusercontent.com/HaiKonofanDesu/konofan-assets-jp-sortet/main/Assets/AddressableAssetsStore/UnityAssets/Common/Images/GlobalMenuUI/GlobalMenuUI_210901/menu_icon_chara.png',
  },
  {
    path: 'story-backgrounds',
    icon: 'https://raw.githubusercontent.com/HaiKonofanDesu/konofan-assets-jp-sortet/main/Assets/AddressableAssetsStore/UnityAssets/Common/Images/GlobalMenuUI/GlobalMenuUI_210101/menu_icon_home.png',
  },
  {
    path: 'story-stills',
    icon: 'https://raw.githubusercontent.com/HaiKonofanDesu/konofan-assets-jp-sortet/main/Assets/AddressableAssetsStore/UnityAssets/Common/Images/GlobalMenuUI/GlobalMenuUI_240101/menu_icon_story.png',
  },
  {
    path: 'story-scripts',
    icon: 'https://raw.githubusercontent.com/HaiKonofanDesu/konofan-assets-jp-sortet/main/Assets/AddressableAssetsStore/UnityAssets/Common/Images/GlobalMenuUI/GlobalMenuUI_210101/menu_icon_story.png',
  },
  {
    path: 'spine-grid',
    icon: 'https://raw.githubusercontent.com/HaiKonofanDesu/konofan-assets-jp-sortet/main/Assets/AddressableAssetsStore/UnityAssets/Common/Images/GlobalMenuUI/GlobalMenuUI_Default/menu_icon_chara.png',
  },
  {
    path: 'videos',
    icon: 'https://raw.githubusercontent.com/HaiKonofanDesu/konofan-assets-jp-sortet/main/Assets/AddressableAssetsStore/UnityAssets/Common/Images/GlobalMenuUI/GlobalMenuUI_211101/menu_icon_quest.png',
  },
];

const TEXTURE_FRAME =
  'https://raw.githubusercontent.com/artificialhobo/konofan-asorted-assets/refs/heads/main/static/frame_footer_sns_clear.png';

const TEXTURE_BG_PATTERN =
  'https://raw.githubusercontent.com/artificialhobo/konofan-asorted-assets/refs/heads/main/static/pattern_bg-ptn1.png';

export function TitlePage() {
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => setHasStarted(true);

  return (
    <>
      <div
        style={{ backgroundImage: `url(${TEXTURE_BG_PATTERN})` }}
        className="absolute inset-0 w-full h-full invert opacity-5"
      />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl" onClick={handleStart}>
          <div className="relative bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl">
            {!hasStarted ? <OpeningView /> : <SmallHomeView />}
            <NineSliceImage
              src={TEXTURE_FRAME}
              inset={75}
              className="absolute inset-0 w-full h-full select-none pointer-events-none"
              zoom={0.525}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function OpeningView() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5;
    }
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full aspect-video"
        src="/video/title-happy-magic.mp4"
        // src="https://raw.githubusercontent.com/HaiKonofanDesu/konofan-videos/refs/heads/main/OPMovieFull/output.mp4"
      >
        Your browser does not support the video tag.
      </video>
      <div
        className="absolute inset-0 flex items-end justify-center pb-16 cursor-pointer"
        style={{
          boxShadow: 'inset 0 0 10px #FFF, inset 0 0 60px 10px #FFFc',
        }}
      >
        <svg
          className="text-2xl font-medium"
          style={{ width: '200px', height: 'auto' }}
          viewBox="0 0 200 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="3"
          >
            Touch to start
          </text>
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="#ffffff"
            strokeWidth="2"
          >
            Touch to start
          </text>
        </svg>
      </div>
    </>
  );
}

function SmallHomeView() {
  return (
    <>
      <video
        autoPlay
        muted
        playsInline
        loop
        className="w-full aspect-video"
        src="/video/title-short.mp4"
      >
        Your browser does not support the video tag.
      </video>
      <div
        className="absolute inset-0 flex flex-col items-center justify-between p-8 bg-black/40"
        style={{ boxShadow: 'inset 0 0 20px #FFF, inset 0 0 120px #FFF' }}
      >
        <div className="text-center mt-32">
          <img
            src="/img/fda-title-1.png"
            alt="Konosuba: Fantastic Days / Archive"
            className="max-w-[600px] w-full h-auto mb-4"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <NineSliceImage //
            src="https://raw.githubusercontent.com/artificialhobo/konofan-asorted-assets/refs/heads/main/static/sorbet/frame_brown.png"
            inset={{ l: 300, r: 300 }}
            className="absolute bottom-14 w-[70%] h-14 select-none pointer-events-none"
            zoom={0.55}
          />

          {MENU_ROUTES.map((route) => {
            const routeConfig = ROUTES.find((r) => r.path === route.path);
            if (!routeConfig) return null;

            return (
              <a
                key={route.path}
                href={`/${route.path}`}
                className="group relative"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center
                      transition-transform duration-200 hover:scale-150"
                >
                  <img
                    src={route.icon}
                    alt={routeConfig.label}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2
                      opacity-0 group-hover:opacity-100 transition-all duration-200
                      px-4 py-2 rounded-lg bg-black/60 backdrop-blur-sm
                      text-white font-bold whitespace-nowrap text-sm
                      pointer-events-none"
                >
                  {routeConfig.label}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
