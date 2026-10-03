import assert from 'node:assert/strict';
import { createPubmedService } from '../server/pubmed.mjs';

// Opt-in integration check. No credentials required, no scheduled job.
const service = createPubmedService();
const input = { organism: 'Plasmodium vivax', topic: 'diagnosis', q: '', from: '', to: '', offset: '0' };
const result = await service.search(input);
assert.ok(result.articles.length > 0, 'La consulta real debe devolver publicaciones.');
assert.ok(result.articles.every(article => /^\d+$/.test(article.pmid) && article.pubmedUrl === `https://pubmed.ncbi.nlm.nih.gov/${article.pmid}/`));
assert.equal(new Set(result.articles.map(article => article.pmid)).size, result.articles.length);
const second = await service.search(input);
assert.equal(second.cacheHit, true);
assert.equal(second.retrievedAt, result.retrievedAt);
const dated = await service.search({ ...input, from: '2026-01-01', to: '2026-04-30' });
assert.ok(dated.total > 0 && dated.total < result.total, 'El intervalo de publicación debe limitar las coincidencias.');
assert.equal(dated.query.from, '2026-01-01');
assert.ok(decodeURIComponent(dated.sourceSearchUrl).includes('2026/04/30'));
console.log(JSON.stringify({ source: result.source, query: result.query.term, translatedQuery: result.translatedQuery, total: result.total, retrievedAt: result.retrievedAt, records: result.articles.length, abstracts: result.articles.filter(article => article.abstracts.length).length, cacheVerified: true, dateRangeCheck: { from: dated.query.from, to: dated.query.to, total: dated.total, records: dated.articles.length, sourceSearchUrl: dated.sourceSearchUrl }, sample: result.articles.slice(0, 3).map(({ title, pmid, doi, pubmedUrl, publicationDate }) => ({ title, pmid, doi, pubmedUrl, publicationDate })) }, null, 2));
