import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export async function generateCoverArt(text: string, seed = 0): Promise<string> {
  const hue = Math.floor(mulberry32(seed) * 360);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='3000' height='3000'><rect width='100%' height='100%' fill='hsl(${hue},70%,50%)'/><text x='1500' y='1500' font-size='200' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif' fill='white'>${text}</text></svg>`;
  const { base64 } = await manipulateAsync(
    `data:image/svg+xml;base64,${btoa(svg)}`,
    [],
    { format: SaveFormat.PNG, base64: true },
  );
  return `data:image/png;base64,${base64}`;
}

function mulberry32(a: number) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
