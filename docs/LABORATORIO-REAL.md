# Laboratorio real y manifestaciones clínicas · v0.5.1

## Recorrido

Abre **Laboratorio virtual → Muestras reales**. La selección inicial es sangre: 17 fotografías CDC de Plasmodium y Trypanosoma cruzi. Elige una preparación y otra para comparar; usa ampliación digital, desplazamiento y la guía de observación. La clasificación automática usa título y técnica, conserva la muestra desconocida y nunca interpreta píxeles ni emite un resultado clínico. También se ofrecen tejidos, heces explícitamente identificadas y cultivos. Cada foto mantiene procedencia, técnica, créditos y condiciones de uso. Las fuentes internacionales se distinguen del contexto guatemalteco.

**3D experimental** descarga automáticamente PDB 6VXX desde RCSB. El ensayo en navegador recuperó 2916 carbonos alfa de tres cadenas. La representación corresponde al ectodominio Spike cerrado de SARS-CoV-2 (crio-EM, resolución publicada 2,80 Å), no al virus completo. Se conservan interrupciones de residuos, fecha de recuperación y SHA-256; los colores distinguen cadenas y la curva es una visualización de la traza. La lectura está limitada a 4 MB, un modelo, 15000 residuos y 20 segundos. Un error conserva el enlace a la fuente sin inventar coordenadas. No hay dependencias nuevas ni API de pago.

Los diez modelos generales anteriores siguen en **Esquemas de anatomía**, identificados como material didáctico.

## Imágenes y clínica

La galería inicial muestra hasta ocho fotografías. Conserva también fotografías adicionales del usuario. Esta entrega amplía el conjunto de 168 a 204 imágenes: 198 en suplementos, cuatro referencias anteriores y dos nuevos registros clínicos de sarampión/difteria. Diez suplementos tienen ocho fotos. Las otras galerías y las numerosas entradas documentales siguen pendientes de ampliación; no se afirma que todas las 236 entradas locales tengan ocho fotos. La galería informa cuántas fotos totales y clínicas están documentadas.

En la sección clínica se muestran seis suplementos: tríadas congénitas de toxoplasmosis y rubéola, signo de Romaña, manchas de Koplik, pseudomembrana de difteria y muguet. Se identifica el contexto y el valor específico de cada hallazgo, con fuente CDC. Las fotografías clínicas disponibles se ven también dentro de la ficha; el botón abre directamente el filtro clínico. Una imagen de candidiasis cutánea no se rotula como muguet. Las radiografías de histoplasmosis mantienen su referencia histórica y no se presentan como específicas del patógeno. Los textos documentales que mencionan signos, síndromes, tríadas o manifestaciones se organizan como clínica conservando el texto literal.

La revisión independiente de leyendas, vigencia de documentos, ampliación de especies, fotografías clínicas faltantes y estadísticas actuales de Guatemala continúa pendiente. Los PDF escaneados necesitan sus archivos originales para OCR. No se modifican fichas personales, biblioteca, propuestas ni respaldos.

## Verificación e integración

Se ejecutaron TypeScript, compilación Vite y 84 pruebas existentes/ampliadas. La suite usa una copia temporal compilada porque el cargador tsx falla en este entorno restringido; no modifica las fuentes. Verificación visual en navegador de fotografías cargadas, comparación, ampliación y lectura/representación PDB real. Vite aún informa un módulo principal de más de 500 kB.

GitHub: los cambios se incorporan a main mediante un pull request respetando su protección. Replit: actualizar desde main, instalar dependencias si hace falta, compilar con `npm run build` e iniciar con `npm start`. Conserva los respaldos locales del navegador: GitHub contiene código y referencias públicas, no los documentos personales guardados. `npm run dev` inicia la vista de desarrollo local.

## Fuentes

- Sangre CDC: https://www.cdc.gov/dpdx/diagnosticprocedures/blood/microexam.html
- Coordenadas y metadatos: https://www.rcsb.org/structure/6VXX
- Manchas de Koplik: https://wwwn.cdc.gov/phil/Details.aspx?pid=24420
- Pseudomembrana: https://wwwn.cdc.gov/phil/Details.aspx?pid=23430
- Toxoplasmosis ocular: https://www.cdc.gov/dpdx/toxoplasmosis/index.html

Cada fotografía y suplemento aporta su enlace propio; la referencia CDC no demuestra circulación ni prevalencia en Guatemala.
