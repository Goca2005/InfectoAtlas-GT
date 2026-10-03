import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import express from 'express';
import { createApp } from './app.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dev = process.argv.includes('--dev');
const app = createApp();
let vite;
if (dev) {
  const { createServer } = await import('vite');
  vite = await createServer({ root, server: { middlewareMode: true }, appType: 'spa' });
  app.use(vite.middlewares);
} else {
  const dist = path.join(root, 'dist');
  if (!existsSync(path.join(dist, 'index.html'))) throw new Error('Falta dist. Ejecuta primero el comando de build.');
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}
const port = Number(process.env.PORT || 5000);
const server = app.listen(port, '0.0.0.0', () => console.log(`InfectoAtlas GT: http://localhost:${port} (${dev ? 'desarrollo' : 'producción'})`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => {
  server.close(async () => { await vite?.close(); process.exit(0); });
});
