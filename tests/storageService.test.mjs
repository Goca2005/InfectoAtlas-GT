import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { OFFICIAL_BIBLIOGRAPHY } from '../src/data/bibliography.ts';
import { INITIAL_MICROORGANISMS } from '../src/data/microorganisms.ts';
import { LocalStorageRepository } from '../src/services/storageService.ts';

class MemoryStorage {
  values = new Map();

  getItem(key) {
    return this.values.has(key) ? this.values.get(key) : null;
  }

  setItem(key, value) {
    this.values.set(key, String(value));
  }

  removeItem(key) {
    this.values.delete(key);
  }
}

function makeData() {
  const microorganisms = structuredClone(INITIAL_MICROORGANISMS);
  microorganisms[0] = {
    ...microorganisms[0],
    commonName: `${microorganisms[0].commonName} (editado en prueba)`
  };
  const customMicroorganism = {
    ...structuredClone(microorganisms[0]),
    id: 'test-custom-microorganism',
    scientificName: 'Testium inventum',
    commonName: 'Registro personalizado de prueba'
  };

  return {
    microorganisms: [...microorganisms, customMicroorganism],
    academicDocuments: [{
      id: 'test-document',
      title: 'Guía de prueba',
      subject: 'Parasitología',
      authorOrInstitution: 'Universidad de prueba',
      yearOrEdition: '2026',
      sourceTier: 'Apunte universitario',
      uploadDate: '2026-10-03',
      pageCount: 1,
      fileName: 'guia-original.pdf',
      fileSizeBytes: 1200,
      processingStatus: 'Extracción completada',
      pages: [{
        pageNumber: 1,
        textContent: 'Texto extraído que debe sobrevivir al respaldo.',
        hasExtractableText: true,
        charCount: 47,
        detectedMicroorganisms: ['Testium inventum']
      }],
      unextractablePagesCount: 0,
      extractedProposalsCount: 1,
      summaryNotes: 'Nota de prueba'
    }],
    extractionProposals: [{
      id: 'test-proposal',
      documentId: 'test-document',
      documentTitle: 'Guía de prueba',
      sourceTier: 'Apunte universitario',
      sourcePage: 1,
      sourceSnippet: 'Fragmento fuente',
      targetMicroorganismId: 'test-custom-microorganism',
      targetMicroorganismName: 'Testium inventum',
      isNewOrganism: true,
      field: 'Nueva ficha de microorganismo',
      previousValue: null,
      proposedValue: 'Dato científico aprobado para la prueba',
      potentialContradiction: null,
      verificationStatus: 'En proceso de validación',
      status: 'aprobado',
      reviewedAt: '2026-10-03T12:00:00.000Z'
    }],
    auditLogs: [{
      id: 'test-audit',
      timestamp: '2026-10-03T12:00:00.000Z',
      documentTitle: 'Guía de prueba',
      sourcePage: 1,
      microorganismId: 'test-custom-microorganism',
      microorganismName: 'Testium inventum',
      field: 'Nueva ficha de microorganismo',
      previousValue: null,
      newValue: 'Dato científico aprobado para la prueba',
      action: 'aprobado'
    }],
    bookmarks: ['test-custom-microorganism'],
    bibliographyReferences: [
      ...structuredClone(OFFICIAL_BIBLIOGRAPHY),
      {
        id: 'test-reference',
        title: 'Referencia de prueba',
        institutionOrAuthors: 'Autora de prueba',
        type: 'Artículo Científico',
        year: '2026',
        organization: 'Literatura Médica Académica',
        status: 'Revisado',
        urlOrCitation: 'DOI de prueba',
        notes: 'Fuente personalizada'
      }
    ],
    userSettings: { language: 'es', displayDensity: 'compacta' }
  };
}

describe('respaldo versionado de InfectoAtlas GT', () => {
  test('round-trip conserva fichas editadas, registros personalizados y todos los datos respaldables', async () => {
    const data = makeData();
    const source = new LocalStorageRepository(new MemoryStorage());
    const json = await source.exportBackupJSON(data);
    const parsed = JSON.parse(json);

    assert.equal(parsed.format, 'infectoatlas-gt-backup');
    assert.equal(parsed.schemaVersion, 1);
    assert.equal(typeof (parsed.appVersion), 'string');
    assert.equal(parsed.integrity.algorithm, 'SHA-256');
    assert.equal(parsed.files.originalFileBytesIncluded, false);
    assert.equal(parsed.files.omittedOriginalFiles[0].fileName, 'guia-original.pdf');

    const target = new LocalStorageRepository(new MemoryStorage());
    const current = await target.getBackupData();
    const plan = await target.inspectBackupJSON(json, current);
    assert.equal(plan.valid, true);
    assert.equal(plan.integrityStatus, 'verified');
    assert.equal(plan.warnings.some(warning => warning.includes('archivos PDF/TXT/MD originales')), true);

    const restored = await target.applyBackupImport(plan, 'restore', current);
    assert.deepEqual(restored, data);
    assert.deepEqual(await target.getMicroorganisms(), data.microorganisms);
    assert.deepEqual(target.getAcademicDocuments(), data.academicDocuments);
    assert.deepEqual(target.getExtractionProposals(), data.extractionProposals);
    assert.deepEqual(target.getAuditLogs(), data.auditLogs);
    assert.deepEqual(target.getBookmarks(), data.bookmarks);
    assert.deepEqual(target.getUserBibliographyReferences(), [
      data.bibliographyReferences.at(-1)
    ]);
    assert.deepEqual(target.getUserSettings(), data.userSettings);
  });

  test('rechaza un respaldo modificado antes de escribir en localStorage', async () => {
    const source = new LocalStorageRepository(new MemoryStorage());
    const json = await source.exportBackupJSON(makeData());
    const parsed = JSON.parse(json);
    parsed.data.userSettings.language = 'alterado';

    const targetStorage = new MemoryStorage();
    const target = new LocalStorageRepository(targetStorage);
    const current = await target.getBackupData();
    const plan = await target.inspectBackupJSON(JSON.stringify(parsed), current);

    assert.equal(plan.valid, false);
    assert.ok((plan.errors.join(' ')).includes('SHA-256 no coincide'));
    await assert.rejects(target.applyBackupImport(plan, 'restore', current), { message: /no\ pasó\ la\ validación/ });
    assert.equal(targetStorage.values.size, 0);
  });

  test('migra el formato anterior de AI Studio, avisa campos ausentes y conserva secciones locales', async () => {
    const storage = new MemoryStorage();
    const target = new LocalStorageRepository(storage);
    const current = await target.getBackupData();
    const priorMicroorganisms = current.microorganisms;
    const legacy = {
      appletName: 'InfectoAtlas GT',
      version: '3.1.0',
      exportedAt: '2026-01-01T00:00:00.000Z',
      academicDocuments: [{
        id: 'legacy-doc',
        title: 'Documento heredado',
        fileName: 'legacy.pdf',
        pages: [{ pageNumber: 1, textContent: 'Texto antiguo' }]
      }]
    };

    const plan = await target.inspectBackupJSON(JSON.stringify(legacy), current);
    assert.equal(plan.valid, true);
    assert.equal(plan.sourceFormat, 'legacy-ai-studio');
    assert.equal(plan.integrityStatus, 'legacy-unverified');
    assert.equal(plan.warnings.some(warning => warning.includes('microorganisms')), true);
    assert.equal(plan.warnings.some(warning => warning.includes('El respaldo antiguo no incluye')), true);
    assert.deepEqual(plan.omittedOriginalFiles, ['legacy.pdf']);

    const restored = await target.applyBackupImport(plan, 'restore', current);
    assert.deepEqual(restored.academicDocuments, legacy.academicDocuments);
    assert.deepEqual(restored.microorganisms, priorMicroorganisms);
    assert.equal(storage.getItem('infectoatlas_microorganisms_v3'), null);
  });

  test('fusiona sin sobrescribir registros locales con el mismo id', async () => {
    const incoming = makeData();
    const current = makeData();
    const localName = 'Versión local que debe prevalecer';
    current.microorganisms[0].commonName = localName;
    const target = new LocalStorageRepository(new MemoryStorage());
    const json = await target.exportBackupJSON(incoming);
    const plan = await target.inspectBackupJSON(json, current);

    assert.equal(plan.valid, true);
    assert.ok((plan.duplicatesWithCurrent.microorganisms?.length) > 0);
    const merged = await target.applyBackupImport(plan, 'merge', current);
    assert.equal(merged.microorganisms[0].commonName, localName);
    assert.equal(merged.microorganisms.some(item => item.id === 'test-custom-microorganism'), true);
  });

  test('bloquea ids duplicados dentro del propio respaldo', async () => {
    const target = new LocalStorageRepository(new MemoryStorage());
    const current = await target.getBackupData();
    const backup = {
      appletName: 'InfectoAtlas GT',
      microorganisms: [
        { id: 'duplicado', scientificName: 'Primera especie' },
        { id: 'duplicado', scientificName: 'Segunda especie' }
      ]
    };
    const plan = await target.inspectBackupJSON(JSON.stringify(backup), current);

    assert.equal(plan.valid, false);
    assert.deepEqual(plan.duplicatesInBackup.microorganisms, ['duplicado']);
  });

  test('detiene la exportación si una colección local está dañada, en vez de sustituirla por valores iniciales', async () => {
    const storage = new MemoryStorage();
    storage.setItem('infectoatlas_academic_docs_v3', '{no es json');
    const repository = new LocalStorageRepository(storage);

    await assert.rejects(repository.exportBackupJSON(makeData()), { message: /No\ se\ exportó\ el\ respaldo/ });
  });

  test('revierte escrituras parciales cuando el navegador rechaza una sección', async () => {
    class OneTimeFailStorage extends MemoryStorage {
      failed = false;

      setItem(key, value) {
        if (key === 'infectoatlas_proposals_v3' && !this.failed) {
          this.failed = true;
          throw new Error('quota exceeded');
        }
        super.setItem(key, value);
      }
    }

    const storage = new OneTimeFailStorage();
    storage.setItem('infectoatlas_microorganisms_v3', JSON.stringify([{ id: 'local', scientificName: 'Localium' }]));
    storage.failed = false;
    const target = new LocalStorageRepository(storage);
    const current = await target.getBackupData({
      microorganisms: [{ id: 'local', scientificName: 'Localium' }],
      academicDocuments: [],
      extractionProposals: [],
      auditLogs: [],
      bookmarks: [],
      bibliographyReferences: structuredClone(OFFICIAL_BIBLIOGRAPHY),
      userSettings: {}
    });
    const json = await target.exportBackupJSON(makeData());
    const plan = await target.inspectBackupJSON(json, current);
    await assert.rejects(target.applyBackupImport(plan, 'restore', current), { message: /Los\ datos\ anteriores\ fueron\ restaurados/ });
    assert.deepEqual(JSON.parse(storage.getItem('infectoatlas_microorganisms_v3')), [
      { id: 'local', scientificName: 'Localium' }
    ]);
    assert.equal(storage.getItem('infectoatlas_academic_docs_v3'), null);
  });
});