export async function createMeme(
  image: HTMLImageElement | string,
  top: string,
  bottom: string,
  watermark = "TheCueRoom",
): Promise<Blob> {
  const img = typeof image === "string" ? await loadImage(image) : image;
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas not supported");
  ctx.drawImage(img, 0, 0);
  const fontSize = Math.floor(canvas.width * 0.08);
  ctx.font = `bold ${fontSize}px Impact`;
  ctx.textAlign = "center";
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.lineWidth = fontSize / 20;
  ctx.textBaseline = "top";
  ctx.fillText(top, canvas.width / 2, 10, canvas.width - 20);
  ctx.strokeText(top, canvas.width / 2, 10, canvas.width - 20);
  ctx.textBaseline = "bottom";
  ctx.fillText(bottom, canvas.width / 2, canvas.height - 10, canvas.width - 20);
  ctx.strokeText(bottom, canvas.width / 2, canvas.height - 10, canvas.width - 20);
  ctx.textBaseline = "bottom";
  ctx.font = `bold ${fontSize / 2}px sans-serif`;
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.fillText(watermark, canvas.width - 10, canvas.height - 10);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob"))),
      "image/png"),
  );
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return await new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
