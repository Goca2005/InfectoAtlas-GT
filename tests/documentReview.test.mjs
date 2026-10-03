import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeAcademicDocument } from '../src/services/aiDocumentAnalyzer.ts';
import { INITIAL_MICROORGANISMS } from '../src/data/microorganisms.ts';

test('document analysis preserves page/snippet trace and keeps proposals pending without changing the catalogue', async () => {
  const before = structuredClone(INITIAL_MICROORGANISMS);
  const snippet = 'Morfología microscópica de Taenia solium: fragmento sintético de prueba para verificar trazabilidad por página, sin valor clínico.';
  const proposals = await analyzeAcademicDocument({
    id: 'synthetic-test-document', title: 'Documento sintético de prueba', sourceTier: 'Apunte universitario',
    pages: [{ pageNumber: 7, textContent: snippet, hasExtractableText: true, charCount: snippet.length, detectedMicroorganisms: [] }],
  }, INITIAL_MICROORGANISMS);
  const proposal = proposals.find(item => item.targetMicroorganismId === 'taenia-solium' && item.field === 'Morfología microscópica');
  assert.ok(proposal);
  assert.equal(proposal.sourcePage, 7);
  assert.equal(proposal.originalSnippet, snippet);
  assert.equal(proposal.status, 'pendiente');
  assert.deepEqual(INITIAL_MICROORGANISMS, before);
});
