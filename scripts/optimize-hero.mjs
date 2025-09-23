import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const input = process.argv[2] || "src/assets/Gemini 3.png";
const outDir = "public/hero";
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const variants = [
  { width: 768, name: "cover-768.webp" },
  { width: 1280, name: "cover-1280.webp" },
  { width: 1920, name: "cover-1920.webp" },
];

const quality = 72; // ajusta 65–80 según quieras más/menos compresión

const buf = fs.readFileSync(input);
const pipeline = sharp(buf).rotate(); // corrige orientación EXIF si la hubiera

await Promise.all(
  variants.map(async v => {
    const outPath = path.join(outDir, v.name);
    await pipeline
      .resize({ width: v.width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(outPath);
    const kb = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`${outPath} -> ${kb}KB`);
  })
);

// Copia la de 1920 como cover.webp para compatibilidad
fs.copyFileSync(path.join(outDir, "cover-1920.webp"), path.join(outDir, "cover.webp"));
console.log("Done.");
