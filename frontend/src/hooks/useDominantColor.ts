import { useEffect, useState } from 'react';
import { getDominantColor } from '../utils/dominantColor';

/**
 * Returns the dominant color of an image, computed once and cached.
 * Returns `fallback` until extraction finishes (or if it fails).
 */
export function useDominantColor(src: string | undefined, fallback = '#9B9B9B') {
  const [color, setColor] = useState(fallback);

  useEffect(() => {
    if (!src) {
      setColor(fallback);
      return;
    }
    let cancelled = false;
    getDominantColor(src).then((c) => {
      if (!cancelled) setColor(c);
    });
    return () => {
      cancelled = true;
    };
  }, [src, fallback]);

  return color;
}