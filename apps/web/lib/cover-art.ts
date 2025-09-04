export async function generateCoverArt(
  text: string,
  seed = 0,
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = 3000;
  canvas.height = 3000;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas not supported");
  const rand = mulberry32(seed);
  ctx.fillStyle = `hsl(${Math.floor(rand() * 360)},70%,50%)`;
  ctx.fillRect(0, 0, 3000, 3000);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 200px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 1500, 1500, 2800);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob"))),
      "image/png"),
  );
}

function mulberry32(a: number) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
