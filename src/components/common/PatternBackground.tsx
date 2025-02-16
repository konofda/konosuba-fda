interface PatternBackgroundProps {
  color?: string;
  size?: number;
  opacity?: number;
  animated?: boolean;
  className?: string;
  scale?: number;
}

export function PatternBackground({
  color = '#000000',
  size = 64,
  opacity = 1,
  className = '',
  scale = 1,
}: PatternBackgroundProps) {
  const radius = size / 2 / Math.sqrt(2);

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="0" cy="${size / 2}" r="${radius}" fill="${color}" />
      <circle cx="${size / 2}" cy="0" r="${radius}" fill="${color}" />
      <circle cx="${size}" cy="${size / 2}" r="${radius}" fill="${color}" />
      <circle cx="${size / 2}" cy="${size}" r="${radius}" fill="${color}" />
    </svg>
  `;

  // Encode it for safe use in the data URL
  const encodedSvg = encodeURIComponent(svgString);
  const dataUrl = `data:image/svg+xml;utf8,${encodedSvg}`;

  return (
    <div
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `url(${dataUrl})`,
        backgroundRepeat: 'repeat',
        backgroundSize: `${size}px ${size}px`,
        opacity,
        zIndex: 0,
        animation: 'slidePattern 6s linear infinite',
        zoom: scale,
      }}
    />
  );
}
