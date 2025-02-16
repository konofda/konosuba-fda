import { Heart } from 'lucide-react';
import React from 'react';

const ExternalLink = ({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`hover:text-white transition-colors relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-current after:opacity-0 hover:after:opacity-100 after:transition-opacity ${className}`}
  >
    {children}
  </a>
);

const ThanksHaiKono = () => (
  <div className="border border-white/10 rounded-lg p-4">
    <div className="text-center mb-3">
      <p className="text-white/80">
        Thanks to{' '}
        <ExternalLink href="https://github.com/HaiKonofanDesu">
          <strong>HaiKonofanDesu</strong>
        </ExternalLink>{' '}
        for compiling and organizing the game's assets.
      </p>
    </div>
    <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs">
      {[
        {
          href: 'https://github.com/HaiKonofanDesu/konofan-assets-jp-sortet',
          label: 'Textures & Spine',
        },
        {
          href: 'https://github.com/HaiKonofanDesu/konofan-live2d',
          label: 'Live2D',
        },
        {
          href: 'https://github.com/HaiKonofanDesu/konofan-videos',
          label: 'Videos',
        },
        {
          href: 'https://github.com/HaiKonofanDesu/konofan-audio',
          label: 'Audio',
        },
      ].map((link, index, array) => (
        <React.Fragment key={link.href}>
          <ExternalLink href={link.href}>{link.label}</ExternalLink>
          {index < array.length - 1 && <span>•</span>}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const ThanksAssassans = () => (
  <div className="border border-white/10 rounded-lg p-4">
    <div className="text-center mb-3">
      <p className="text-white/80">
        Thanks to{' '}
        <ExternalLink href="https://github.com/Assasans">
          <strong>Assassans</strong>
        </ExternalLink>{' '}
        for providing structured game data in their project.
      </p>
    </div>
    <div className="flex flex-wrap justify-center gap-x-1 gap-y-2 text-xs">
      <ExternalLink href="https://github.com/Assasans/axel">
        Private Server
      </ExternalLink>
      <span>with</span>
      <ExternalLink href="https://github.com/Assasans/axel/tree/main/master">
        Game Data
      </ExternalLink>
    </div>
  </div>
);

const AssetLinks = () => (
  <div className="flex flex-col gap-4">
    <ThanksHaiKono />
    <ThanksAssassans />
  </div>
);

const CreatorInfo = () => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex items-center gap-2">
      <span>Made with</span>
      <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
      <span>by</span>
      <ExternalLink
        href="https://github.com/choephix"
        className="inline-flex items-center gap-1.5"
      >
        <span>choephix</span>
      </ExternalLink>
    </div>
    <ExternalLink
      href="https://github.com/konofda/konosuba-fda"
      className="text-white/40 hover:text-white/60 transition-colors text-xs inline-flex flex-row gap-1"
    >
      {/* <Github className="w-4 h-4" /> */}
      <span>View Konosuba FD/Archive on </span>
      <span>GitHub</span>
    </ExternalLink>
  </div>
);

export function Footer() {
  return (
    <footer className="relative z-10 mt-auto bg-[#1a1614]/80 backdrop-blur-sm shadow-lg border-t border-white/5">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-6 text-sm text-white/60">
          <AssetLinks />
          <p>
            All assets from KonoSuba: Fantastic Days belong to their respective
            owners. This is an unofficial fan project.
          </p>
          <CreatorInfo />
        </div>
      </div>
    </footer>
  );
}
