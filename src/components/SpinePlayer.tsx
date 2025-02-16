import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    spine: any;
  }
}

interface SpinePlayerProps {
  jsonUrl: string;
  atlasUrl: string;
  className?: string;
  onError?: (error: Error) => void;
}

export function SpinePlayer({
  jsonUrl,
  atlasUrl,
  className = '',
  onError,
}: SpinePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Cleanup previous instance
    destroy();

    const createPlayer = (withAnimation = true) => {
      if (!containerRef.current) return;

      const config = {
        jsonUrl,
        atlasUrl,
        premultipliedAlpha: true,
        backgroundColor: '#20232f',
        alpha: false,
        showControls: true,
        ...(withAnimation && { animation: 'Wait1Loop' }),
        error: (error: Error) => {
          console.warn('Spine player error:', error);
          onError?.(error);

          if (withAnimation) {
            // If initial attempt with animation fails, try without it
            destroy();
            createPlayer(false);
          }
        },
      };

      try {
        playerRef.current = new window.spine.SpinePlayer(
          containerRef.current,
          config
        );
      } catch (error) {
        console.error('Failed to create Spine player:', error);
        onError?.(error as Error);
      }
    };

    // Start with animation enabled
    createPlayer(true);

    // Cleanup on unmount or URL change
    return destroy;
  }, [jsonUrl, atlasUrl, onError]);

  // Centralized cleanup function
  const destroy = () => {
    if (playerRef.current) {
      playerRef.current.dispose?.();
      playerRef.current = null;
    }
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
  };

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
}
