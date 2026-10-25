const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const output = path.join(root, "dist");
const entry = path.join(root, "index.html");

if (!fs.existsSync(entry)) {
  console.error("Build failed: index.html is missing from the project root.");
  process.exit(1);
}

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const file of ["index.html", "_headers", "_redirects"]) {
  const source = path.join(root, file);
  if (fs.existsSync(source)) fs.copyFileSync(source, path.join(output, file));
}

const assets = path.join(root, "assets");
if (fs.existsSync(assets)) {
  fs.cpSync(assets, path.join(output, "assets"), { recursive: true });
}

console.log("Static game and pixel-art assets copied to dist/ for Cloudflare Pages.");
