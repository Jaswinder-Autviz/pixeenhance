/**
 * Ultra-lightweight pure TypeScript Animated GIF Encoder
 * Encodes multiple HTMLCanvasElement frames into an animated .gif Blob
 * 100% in-browser, zero dependencies.
 */

export interface GifFrame {
  canvas: HTMLCanvasElement;
  delayMs: number; // milliseconds per frame (e.g. 1000 for 1 sec)
}

export function createAnimatedGif(frames: GifFrame[]): Blob {
  if (frames.length === 0) {
    throw new Error('At least one frame is required for GIF generation');
  }

  const width = frames[0].canvas.width;
  const height = frames[0].canvas.height;

  const bytes: number[] = [];

  function writeByte(b: number) {
    bytes.push(b & 0xff);
  }

  function writeWord(w: number) {
    writeByte(w & 0xff);
    writeByte((w >> 8) & 0xff);
  }

  function writeString(str: string) {
    for (let i = 0; i < str.length; i++) {
      writeByte(str.charCodeAt(i));
    }
  }

  // 1. Header (GIF89a)
  writeString('GIF89a');

  // 2. Logical Screen Descriptor
  writeWord(width);
  writeWord(height);
  // Packed field: Global Color Table Flag = 0, Color Resolution = 7, Sort = 0, GCT Size = 0
  writeByte(0x70);
  writeByte(0); // Background Color Index
  writeByte(0); // Pixel Aspect Ratio

  // 3. Netscape 2.0 Application Extension (for infinite loop)
  writeByte(0x21); // Extension Introducer
  writeByte(0xff); // Application Extension Label
  writeByte(11); // Block Size
  writeString('NETSCAPE2.0');
  writeByte(3); // Sub-block Size
  writeByte(1); // Sub-block ID
  writeWord(0); // Loop count (0 = infinite)
  writeByte(0); // Block Terminator

  // 4. Encode each frame
  for (const frame of frames) {
    const ctx = frame.canvas.getContext('2d');
    if (!ctx) continue;
    const imgData = ctx.getImageData(0, 0, width, height).data;

    // Build standard 64-color quantized palette
    const palette: [number, number, number][] = [];
    const colorIndexMap = new Map<number, number>();

    const indexedPixels = new Uint8Array(width * height);
    for (let i = 0; i < width * height; i++) {
      const r = (imgData[i * 4] >> 5) << 5;
      const g = (imgData[i * 4 + 1] >> 5) << 5;
      const b = (imgData[i * 4 + 2] >> 5) << 5;
      const key = (r << 16) | (g << 8) | b;

      let idx = colorIndexMap.get(key);
      if (idx === undefined) {
        if (palette.length < 256) {
          idx = palette.length;
          palette.push([r, g, b]);
          colorIndexMap.set(key, idx);
        } else {
          idx = 0; // fallback to first color if palette full
        }
      }
      indexedPixels[i] = idx;
    }

    // Pad palette to power of 2
    let pSize = 2;
    while (pSize < palette.length && pSize < 256) {
      pSize *= 2;
    }
    const colorDepth = Math.max(2, Math.ceil(Math.log2(pSize)));
    const actualTableSize = 1 << colorDepth;
    while (palette.length < actualTableSize) {
      palette.push([0, 0, 0]);
    }

    // Graphic Control Extension
    writeByte(0x21); // Extension Introducer
    writeByte(0xf9); // Graphic Control Label
    writeByte(4); // Block Size
    writeByte(0x00); // Disposal Method (none), Transparent Color Flag (none)
    const delayHundredths = Math.max(1, Math.round(frame.delayMs / 10));
    writeWord(delayHundredths); // Delay Time (in 1/100ths of a second)
    writeByte(0); // Transparent Color Index
    writeByte(0); // Block Terminator

    // Image Descriptor
    writeByte(0x2c); // Image Separator
    writeWord(0); // Left
    writeWord(0); // Top
    writeWord(width);
    writeWord(height);
    // Local Color Table Flag (1), Interlace (0), Sort (0), LCT Size
    const lctPacked = 0x80 | (colorDepth - 1);
    writeByte(lctPacked);

    // Local Color Table
    for (const [r, g, b] of palette) {
      writeByte(r);
      writeByte(g);
      writeByte(b);
    }

    // Table Based Image Data (LZW)
    const minCodeSize = Math.max(2, colorDepth);
    writeByte(minCodeSize);

    // Write LZW sub-blocks
    const lzwBytes = encodeLZW(indexedPixels, minCodeSize);
    let offset = 0;
    while (offset < lzwBytes.length) {
      const chunkSize = Math.min(255, lzwBytes.length - offset);
      writeByte(chunkSize);
      for (let j = 0; j < chunkSize; j++) {
        writeByte(lzwBytes[offset + j]);
      }
      offset += chunkSize;
    }
    writeByte(0); // Block Terminator
  }

  // 5. Trailer
  writeByte(0x3b);

  return new Blob([new Uint8Array(bytes)], { type: 'image/gif' });
}

function encodeLZW(pixels: Uint8Array, minCodeSize: number): Uint8Array {
  const clearCode = 1 << minCodeSize;
  const endCode = clearCode + 1;

  let codeSize = minCodeSize + 1;
  let nextCode = clearCode + 2;

  const output: number[] = [];
  let curBit = 0;
  let curVal = 0;

  function emitCode(code: number) {
    curVal |= code << curBit;
    curBit += codeSize;
    while (curBit >= 8) {
      output.push(curVal & 0xff);
      curVal >>= 8;
      curBit -= 8;
    }
  }

  // Initial Clear code
  emitCode(clearCode);

  const dict = new Map<string, number>();

  let prefix = String.fromCharCode(pixels[0]);

  for (let i = 1; i < pixels.length; i++) {
    const k = String.fromCharCode(pixels[i]);
    const combo = prefix + k;

    if (dict.has(combo)) {
      prefix = combo;
    } else {
      if (prefix.length === 1) {
        emitCode(prefix.charCodeAt(0));
      } else {
        emitCode(dict.get(prefix)!);
      }

      if (nextCode < 4096) {
        dict.set(combo, nextCode++);
        if (nextCode > 1 << codeSize && codeSize < 12) {
          codeSize++;
        }
      } else {
        emitCode(clearCode);
        dict.clear();
        codeSize = minCodeSize + 1;
        nextCode = clearCode + 2;
      }
      prefix = k;
    }
  }

  if (prefix.length === 1) {
    emitCode(prefix.charCodeAt(0));
  } else if (dict.has(prefix)) {
    emitCode(dict.get(prefix)!);
  }

  emitCode(endCode);

  if (curBit > 0) {
    output.push(curVal & 0xff);
  }

  return new Uint8Array(output);
}
