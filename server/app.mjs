import express from 'express';
import { createPubmedService, PubmedError } from './pubmed.mjs';
import { sourceAdapters } from './sources.mjs';

export function createApp({ pubmed = createPubmedService() } = {}) {
  const app = express();
  app.disable('x-powered-by');
  app.set('query parser', 'simple');
  app.use((req, res, next) => {
    res.set({ 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin' });
    next();
  });
  app.get('/api/health', (_req, res) => res.json({ status: 'ok', source: 'PubMed', mode: 'manual' }));
  app.get('/api/live/sources', (_req, res) => res.json(sourceAdapters));
  app.get('/api/live/pubmed', async (req, res) => {
    res.set('Cache-Control', 'no-store');
    try { res.json(await pubmed.search(req.query)); }
    catch (error) {
      const known = error instanceof PubmedError;
      if (known && error.retryAfter) res.set('Retry-After', String(error.retryAfter));
      res.status(known ? error.status : 502).json({ error: known ? error.message : 'No se pudo recuperar la información de PubMed. Reintenta la consulta.' });
    }
  });
  app.use('/api', (_req, res) => res.status(404).json({ error: 'Ruta no disponible.' }));
  return app;
}
