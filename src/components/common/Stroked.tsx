import React from 'react';

export type StrokeTuple = [string, number, number?]; // [color, width, blur?]

interface StrokedProps {
  children: React.ReactNode;
  strokes: StrokeTuple[];
  className?: string;
}

export function Stroked({ children, strokes, className = '' }: StrokedProps) {
  // Reverse the strokes array to apply them in opposite order
  // This way, first stroke in the array will appear on top
  const strokeFilter = [...strokes]
    .reverse()
    .map(
      ([color, width, blur = 0]) => `
      drop-shadow(${width}px 0 ${blur}px ${color})
      drop-shadow(-${width}px 0 ${blur}px ${color})
      drop-shadow(0 ${width}px ${blur}px ${color})
      drop-shadow(0 -${width}px ${blur}px ${color})
    `
    )
    .join(' ');

  return (
    <div className={className} style={{ filter: strokeFilter }}>
      {children}
    </div>
  );
}
