import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const types = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.ico', 'image/x-icon'],
]);

function resolvePath(url) {
  const parsed = new URL(url, `http://localhost:${port}`);
  const safePath = normalize(decodeURIComponent(parsed.pathname)).replace(/^\.\.(\/|\\|$)/, '');
  if (safePath === '/characters' || safePath === '/characters/') {
    return join(root, 'characters.html');
  }
  return join(root, safePath === '/' ? 'index.html' : safePath);
}

const server = createServer(async (req, res) => {
  try {
    const filePath = resolvePath(req.url || '/');
    const data = await readFile(filePath);
    res.writeHead(200, {
      'Content-Type': types.get(extname(filePath)) || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(data);
  } catch {
    const fallback = await readFile(join(root, 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(fallback);
  }
});

server.listen(port, () => {
  console.log(`Maitri website running at http://localhost:${port}`);
});
