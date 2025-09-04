import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export async function createMeme(
  imageUri: string,
  top: string,
  bottom: string,
  watermark = "TheCueRoom",
): Promise<string> {
  const size = 1000;
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>` +
    `<image href='${imageUri}' width='${size}' height='${size}'/>` +
    `<text x='50%' y='80' text-anchor='middle' font-family='Impact' font-size='80' fill='white' stroke='black' stroke-width='4'>${top}</text>` +
    `<text x='50%' y='${size - 40}' text-anchor='middle' font-family='Impact' font-size='80' fill='white' stroke='black' stroke-width='4'>${bottom}</text>` +
    `<text x='${size - 20}' y='${size - 20}' text-anchor='end' font-family='sans-serif' font-size='40' fill='white'>${watermark}</text>` +
    `</svg>`;
  const { base64 } = await manipulateAsync(
    `data:image/svg+xml;base64,${btoa(svg)}`,
    [],
    { format: SaveFormat.PNG, base64: true },
  );
  return `data:image/png;base64,${base64}`;
}
