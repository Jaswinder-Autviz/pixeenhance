// Web Worker for offloading pixel convolutions and bilateral filters

self.onmessage = (e: MessageEvent) => {
  const { type, imageData, options, id } = e.data;

  if (type === 'SHARPEN') {
    const { level } = options;
    const result = sharpenFilter(imageData, level);
    (self as unknown as Worker).postMessage({ id, type, result });
  } else if (type === 'DENOISE') {
    const { level } = options;
    const result = denoiseFilter(imageData, level);
    (self as unknown as Worker).postMessage({ id, type, result });
  }
};

function sharpenFilter(imgData: ImageData, level: string): ImageData {
  const w = imgData.width;
  const h = imgData.height;
  const src = imgData.data;
  const dst = new Uint8ClampedArray(src.length);

  const kMap: Record<string, number> = { low: 0.35, medium: 0.7, high: 1.2 };
  const k = kMap[level] || 0.5;
  const centerWeight = 1 + 8 * k;

  for (let y = 1; y < h - 1; y++) {
    const yOffset = y * w;
    for (let x = 1; x < w - 1; x++) {
      const idx = (yOffset + x) * 4;
      for (let c = 0; c < 3; c++) {
        const sum =
          src[idx + c] * centerWeight -
          k * (
            src[((y - 1) * w + (x - 1)) * 4 + c] +
            src[((y - 1) * w + x) * 4 + c] +
            src[((y - 1) * w + (x + 1)) * 4 + c] +
            src[(yOffset + (x - 1)) * 4 + c] +
            src[(yOffset + (x + 1)) * 4 + c] +
            src[((y + 1) * w + (x - 1)) * 4 + c] +
            src[((y + 1) * w + x) * 4 + c] +
            src[((y + 1) * w + (x + 1)) * 4 + c]
          );
        dst[idx + c] = sum < 0 ? 0 : sum > 255 ? 255 : sum;
      }
      dst[idx + 3] = src[idx + 3];
    }
  }

  return new ImageData(dst, w, h);
}

function denoiseFilter(imgData: ImageData, level: string): ImageData {
  const w = imgData.width;
  const h = imgData.height;
  const src = imgData.data;
  const dst = new Uint8ClampedArray(src.length);

  let radius = 1;
  let sigmaSpace = 2.0;
  let sigmaColor = 25.0;

  if (level === 'low') {
    radius = 1;
    sigmaSpace = 1.8;
    sigmaColor = 20.0;
  } else if (level === 'medium') {
    radius = 2;
    sigmaSpace = 3.0;
    sigmaColor = 35.0;
  } else if (level === 'high') {
    radius = 3;
    sigmaSpace = 4.5;
    sigmaColor = 55.0;
  }

  const twoSigmaSpaceSq = 2 * sigmaSpace * sigmaSpace;
  const twoSigmaColorSq = 2 * sigmaColor * sigmaColor;

  for (let y = 0; y < h; y++) {
    const yOffset = y * w;
    for (let x = 0; x < w; x++) {
      const centerIdx = (yOffset + x) * 4;
      const cR = src[centerIdx];
      const cG = src[centerIdx + 1];
      const cB = src[centerIdx + 2];

      let sR = 0, sG = 0, sB = 0, norm = 0;

      for (let dy = -radius; dy <= radius; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= h) continue;
        const nyOffset = ny * w;

        for (let dx = -radius; dx <= radius; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= w) continue;

          const nIdx = (nyOffset + nx) * 4;
          const nr = src[nIdx];
          const ng = src[nIdx + 1];
          const nb = src[nIdx + 2];

          const dR = cR - nr;
          const dG = cG - ng;
          const dB = cB - nb;
          const cDistSq = dR * dR + dG * dG + dB * dB;
          const sDistSq = dx * dx + dy * dy;

          const wgt = Math.exp(-sDistSq / twoSigmaSpaceSq) * Math.exp(-cDistSq / twoSigmaColorSq);

          sR += nr * wgt;
          sG += ng * wgt;
          sB += nb * wgt;
          norm += wgt;
        }
      }

      dst[centerIdx] = norm > 0 ? Math.round(sR / norm) : cR;
      dst[centerIdx + 1] = norm > 0 ? Math.round(sG / norm) : cG;
      dst[centerIdx + 2] = norm > 0 ? Math.round(sB / norm) : cB;
      dst[centerIdx + 3] = src[centerIdx + 3];
    }
  }

  return new ImageData(dst, w, h);
}

export {};
