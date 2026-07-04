// Serveur statique minimal (Node) pour visualiser la maquette de référence.
// Contourne le shim Xcode cassé qui empêche python3 de tourner.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const PORT = 8123;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.css': 'text/css',
  '.js': 'text/javascript',
};

createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, `http://localhost`).pathname);
    const file = join(ROOT, path === '/' ? '/index.html' : path);
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(PORT, () => console.log(`static server on http://localhost:${PORT}`));
