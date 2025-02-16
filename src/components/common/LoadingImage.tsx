import { useState, useEffect, useRef } from 'react';

const DEBUG_DELAY_MS = 0; // Set to positive number to add artificial delay

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface LoadingImageProps {
  src: string;
  placeholderSrc: string;
  alt: string;
  className?: string;
}

export function LoadingImage({
  src,
  placeholderSrc,
  alt,
  className = '',
}: LoadingImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoadImage, setShouldLoadImage] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (DEBUG_DELAY_MS > 0) {
              delay(DEBUG_DELAY_MS).then(() => {
                setShouldLoadImage(true);
              });
            } else {
              setShouldLoadImage(true);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1, // Only consider the image visible if 10% is in view
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  // return 100;

  return (
    <div className="relative" ref={imageRef}>
      {/* Loading placeholder */}
      <img
        src={placeholderSrc}
        alt="Loading..."
        loading="eager"
        className={`
          w-auto h-auto transition-opacity duration-300           
          ${isLoaded ? 'opacity-0' : 'opacity-100'} ${className}`}
      />
      {/* Actual image */}
      {shouldLoadImage && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`
            w-auto h-auto rounded-lg transition-opacity duration-300 
            absolute inset-0
            ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          onLoad={() => {
            setIsLoaded(true);
          }}
        />
      )}
    </div>
  );
}
