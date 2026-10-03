import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { ExtractedPage } from '../types/academicLibrary';

export interface PDFExtractionResult {
  pages: ExtractedPage[];
  pageCount: number;
  totalCharacters: number;
  unextractablePagesCount: number;
  isTextOrMarkdownFallback?: boolean;
}

/**
 * Extracts text from an uploaded file (PDF, TXT, or MD).
 * Accurately breaks into pages and flags non-extractable / image-only pages.
 */
export async function extractTextFromPDF(
  fileOrBuffer: File | ArrayBuffer | Uint8Array,
  limits: { maxPages?: number; maxCharacters?: number } = {}
): Promise<PDFExtractionResult> {
  // If the user uploaded a plain text or markdown summary file
  if (fileOrBuffer instanceof File && (fileOrBuffer.name.endsWith('.txt') || fileOrBuffer.name.endsWith('.md'))) {
    const rawText = await fileOrBuffer.text();
    // Split into simulated pages if "Página X" or double newlines indicate sections
    const pageChunks = rawText.split(/(?:={3,}|-{3,}|Página\s+\d+|Page\s+\d+)/i).filter(c => c.trim().length > 0);
    const pages: ExtractedPage[] = (pageChunks.length > 0 ? pageChunks : [rawText]).map((chunk, idx) => ({
      pageNumber: idx + 1,
      textContent: chunk.trim(),
      hasExtractableText: chunk.trim().length > 20,
      charCount: chunk.trim().length,
      detectedMicroorganisms: []
    }));

    return {
      pages,
      pageCount: pages.length,
      totalCharacters: rawText.length,
      unextractablePagesCount: 0,
      isTextOrMarkdownFallback: true
    };
  }

  // Real PDF extraction
  let closePdf: (() => Promise<void>) | undefined;
  try {
    // Load the PDF engine only when opening a PDF; keep the matching worker local.
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
    let arrayBuffer: ArrayBuffer;
    if (fileOrBuffer instanceof File) {
      arrayBuffer = await fileOrBuffer.arrayBuffer();
    } else if (fileOrBuffer instanceof Uint8Array) {
      arrayBuffer = fileOrBuffer.buffer.slice(
        fileOrBuffer.byteOffset,
        fileOrBuffer.byteOffset + fileOrBuffer.byteLength
      ) as ArrayBuffer;
    } else {
      arrayBuffer = fileOrBuffer;
    }

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      useSystemFonts: true,
    });

    const pdfDoc = await loadingTask.promise;
    closePdf = () => loadingTask.destroy();
    const numPages = pdfDoc.numPages;
    if (limits.maxPages && numPages > limits.maxPages) throw new Error(`El documento supera el límite de ${limits.maxPages} páginas`);
    const pages: ExtractedPage[] = [];
    let unextractablePagesCount = 0;
    let totalCharacters = 0;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      try {
        const page = await pdfDoc.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Combine text items preserving spaces
        const pageStrings = textContent.items
          .map((item: any) => ('str' in item ? item.str : ''))
          .filter((str: string) => str.trim().length > 0);

        const pageText = pageStrings.join(' ').replace(/\s+/g, ' ').trim();
        const charCount = pageText.length;
        // Less than 20 characters likely an image-only page, diagram, or scan without OCR
        const hasExtractableText = charCount >= 20;

        if (!hasExtractableText) {
          unextractablePagesCount++;
        }
        totalCharacters += charCount;

        pages.push({
          pageNumber: pageNum,
          textContent: pageText,
          hasExtractableText,
          charCount,
          detectedMicroorganisms: []
        });
      } catch (pageErr) {
        console.warn(`Error leyendo página ${pageNum}:`, pageErr);
        unextractablePagesCount++;
        pages.push({
          pageNumber: pageNum,
          textContent: '',
          hasExtractableText: false,
          charCount: 0,
          detectedMicroorganisms: []
        });
      }
      if (limits.maxCharacters && totalCharacters > limits.maxCharacters) throw new Error(`El documento supera el límite de ${limits.maxCharacters} caracteres`);
    }

    return {
      pages,
      pageCount: numPages,
      totalCharacters,
      unextractablePagesCount
    };
  } catch (error) {
    console.error('Fallo al extraer texto con PDF.js:', error);
    throw new Error(
      error instanceof Error 
        ? `No se pudo extraer texto del archivo PDF: ${error.message}. Si el documento está escaneado como imagen sin capa OCR o protegido con contraseña, puede ingresar o pegar el texto de sus apuntes directamente.`
        : 'Error desconocido al procesar el archivo PDF.'
    );
  } finally {
    await closePdf?.().catch(() => undefined);
  }
}
