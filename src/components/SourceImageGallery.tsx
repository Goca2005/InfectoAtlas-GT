import { useState } from 'react';
import type { Microorganism } from '../types/microorganism';

export function safeHttpsUrl(value?: string) { try { const url = new URL(value || ''); return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined; } catch { return undefined; } }
function ImageCard({ image }: { image: Microorganism['imagery'][number] }) {
  const [failed, setFailed] = useState(false);
  const url = safeHttpsUrl(image.url);
  const sourceUrl = safeHttpsUrl(image.sourceUrl);
  return <figure className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 text-slate-200">
    {url && !failed ? <img src={url} alt={image.caption} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} className="w-full h-64 sm:h-80 object-contain bg-black" /> : <p className="p-6">La imagen no está disponible. Consulta el registro original del CDC.</p>}
    <figcaption className="p-4 space-y-2 text-sm"><p className="font-bold">{image.caption}</p><p>{image.stainOrModality} · {image.imageId}</p><p>{image.interpretation}</p><p className="text-xs text-slate-400">{image.creditOrSource} · Fecha de imagen: {image.imageDate || 'No informada'}<br />{image.license} · Fuente consultada: {image.consultedAt}</p>
      {sourceUrl && <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sky-300 underline">Abrir registro y créditos originales</a>}
      {safeHttpsUrl(image.licenseUrl) && <a href={safeHttpsUrl(image.licenseUrl)} target="_blank" rel="noopener noreferrer" className="ml-4 text-sky-300 underline">Condiciones de uso</a>}
    </figcaption>
  </figure>;
}
export function SourceImageGallery({ organism }: { organism: Microorganism }) {
  const realImages = organism.imagery.filter(image => image.type === 'microfotografia_real' && safeHttpsUrl(image.sourceUrl) && image.license && safeHttpsUrl(image.url));
  return <section className="space-y-4"><h3 className="text-xl font-bold">Imágenes reales y procedencia</h3><p>Microscopía documentada. La técnica y la muestra determinan qué puede interpretarse. Las imágenes externas necesitan conexión a Internet.</p>
    {realImages.length ? realImages.map((image, index) => <ImageCard key={`${organism.id}-${image.imageId}-${index}`} image={image} />) : <p className="rounded-lg border border-amber-200 bg-amber-50 p-4">Esta ficha todavía no tiene una imagen real con procedencia y condiciones de uso documentadas. Consulta también las fichas documentadas del catálogo.</p>}
  </section>;
}
