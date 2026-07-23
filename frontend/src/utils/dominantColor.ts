const cache = new Map<string, string>();
const inflight = new Map<string, Promise<string>>();

const FALLBACK = '#9B9B9B';

/**
 * Loads an image and returns its dominant color as a hex string,
 * ignoring near-white/near-black/transparent pixels (usually background).
 * Results are cached per image src for the lifetime of the page.
 */
export function getDominantColor(src: string): Promise<string> {
  if (cache.has(src)) return Promise.resolve(cache.get(src)!);
  if (inflight.has(src)) return inflight.get(src)!;

  const promise = new Promise<string>((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const size = 32; // downsample for speed
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(FALLBACK);

        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        const counts = new Map<string, number>();
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 125) continue; // skip transparent

          const brightness = (r + g + b) / 3;
          if (brightness > 245 || brightness < 12) continue; // skip near-white/black bg

          // quantize so near-identical shades bucket together
          const key = [r, g, b].map((c) => Math.round(c / 16) * 16).join(',');
          counts.set(key, (counts.get(key) ?? 0) + 1);
        }

        let bestKey = '';
        let bestCount = 0;
        for (const [key, count] of counts) {
          if (count > bestCount) {
            bestCount = count;
            bestKey = key;
          }
        }

        if (!bestKey) return resolve(FALLBACK);

        const [r, g, b] = bestKey.split(',').map(Number);
        const hex =
          '#' +
          [r, g, b]
            .map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0'))
            .join('');

        cache.set(src, hex);
        resolve(hex);
      } catch {
        resolve(FALLBACK);
      }
    };

    img.onerror = () => resolve(FALLBACK);
    img.src = src;
  });

  inflight.set(src, promise);
  promise.finally(() => inflight.delete(src));
  return promise;
}