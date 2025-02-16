'use client';

import type React from 'react';
import { useRef, useEffect } from 'react';

type InsetConfig =
  | number
  | {
      tl?: number;
      tr?: number;
      bl?: number;
      br?: number;
    }
  | {
      t?: number;
      b?: number;
      l?: number;
      r?: number;
    };

interface NineSliceImageProps {
  src: string;
  inset: InsetConfig;
  className?: string;
  zoom?: number;
}

function isCornerConfig(
  inset: any
): inset is { tl?: number; tr?: number; bl?: number; br?: number } {
  return 'tl' in inset || 'tr' in inset || 'bl' in inset || 'br' in inset;
}

const normalizeInsets = (inset: InsetConfig) => {
  if (typeof inset === 'number') {
    return { top: inset, right: inset, bottom: inset, left: inset };
  }

  if (isCornerConfig(inset)) {
    const { tl = 0, tr = 0, bl = 0, br = 0 } = inset;
    return {
      top: Math.max(tl, tr),
      right: Math.max(tr, br),
      bottom: Math.max(bl, br),
      left: Math.max(tl, bl),
    };
  }

  const { t = 0, r = 0, b = 0, l = 0 } = inset;
  return { top: t, right: r, bottom: b, left: l };
};

const calculateNineSliceRects = (
  width: number,
  height: number,
  left: number,
  right: number,
  top: number,
  bottom: number
) =>
  [
    { id: 'tl', x: 0, y: 0, w: left, h: top },
    { id: 'tt', x: left, y: 0, w: width - left - right, h: top },
    { id: 'tr', x: width - right, y: 0, w: right, h: top },
    { id: 'ml', x: 0, y: top, w: left, h: height - top - bottom },
    {
      id: 'mc',
      x: left,
      y: top,
      w: width - left - right,
      h: height - top - bottom,
    },
    { id: 'mr', x: width - right, y: top, w: right, h: height - top - bottom },
    { id: 'bl', x: 0, y: height - bottom, w: left, h: bottom },
    {
      id: 'bb',
      x: left,
      y: height - bottom,
      w: width - left - right,
      h: bottom,
    },
    { id: 'br', x: width - right, y: height - bottom, w: right, h: bottom },
  ].filter((rect) => rect.w >= 1 && rect.h >= 1);

const calculateSourceAndDestRects = (
  sourceWidth: number,
  sourceHeight: number,
  destWidth: number,
  destHeight: number,
  inset: InsetConfig,
  zoom: number
) => {
  const sourceInsets = normalizeInsets(inset);
  const destInsets = normalizeInsets({
    t: sourceInsets.top * zoom,
    r: sourceInsets.right * zoom,
    b: sourceInsets.bottom * zoom,
    l: sourceInsets.left * zoom,
  });

  return {
    sourceRects: calculateNineSliceRects(
      sourceWidth,
      sourceHeight,
      sourceInsets.left,
      sourceInsets.right,
      sourceInsets.top,
      sourceInsets.bottom
    ),
    destRects: calculateNineSliceRects(
      destWidth,
      destHeight,
      destInsets.left,
      destInsets.right,
      destInsets.top,
      destInsets.bottom
    ),
  };
};

export const NineSliceImage: React.FC<NineSliceImageProps> = ({
  src,
  inset,
  className = '',
  zoom = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>();

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image || !image.complete) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    // Set the canvas size accounting for device pixel ratio
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale all drawing operations by DPR
    ctx.scale(dpr, dpr);

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { sourceRects, destRects } = calculateSourceAndDestRects(
      image.width,
      image.height,
      width,
      height,
      inset,
      zoom
    );

    // Draw all nine slices using the calculated rectangles
    sourceRects.forEach((src, i) => {
      const dst = destRects[i];
      ctx.drawImage(
        image,
        src.x,
        src.y,
        src.w,
        src.h,
        dst.x,
        dst.y,
        dst.w,
        dst.h
      );
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      console.log('📏 Canvas size changed, redrawing');
      drawCanvas();
    });

    resizeObserver.observe(canvas);

    // Set up image
    const image = new Image();
    imageRef.current = image;
    image.src = src;
    image.crossOrigin = 'anonymous';

    image.onload = drawCanvas;
    image.onerror = (err) => {
      console.error('🖼️ Error loading nine-slice image:', err);
    };

    return () => {
      resizeObserver.disconnect();
      if (imageRef.current) {
        imageRef.current.onload = null;
        imageRef.current.onerror = null;
      }
    };
  }, [src, inset, zoom]);

  return <canvas ref={canvasRef} className={className} />;
};
