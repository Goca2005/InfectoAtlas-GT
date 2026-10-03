# Publicación futura de InfectoAtlas GT

Preparación de la versión 0.6.0, 3 de octubre de 2026. Esta guía no crea servicios ni publica el sitio.

## Opción que mejor encaja con el proyecto actual

**Render, mediante un Web Service Node/Express conectado a GitHub**, permite servir la aplicación y la API de PubMed desde el mismo dominio. Es una recomendación basada en el servidor existente: `server/index.mjs` sirve `dist` y `/api` y escucha en `0.0.0.0` usando `PORT`.

El plan gratuito puede servir para una demostración: se suspende tras 15 minutos sin tráfico y tarda en despertar. Render desaconseja usar las instancias gratuitas para producción. Para un lanzamiento estable se deberá elegir alojamiento y presupuesto en ese momento. No se ha contratado ningún plan.

Fuentes oficiales consultadas el 3 de octubre de 2026: [Node/Express en Render](https://render.com/docs/deploy-node-express-app), [condiciones del plan gratuito](https://render.com/docs/free).

### Configuración para cuando se autorice publicar

1. Crear un **Web Service** y conectar `Goca2005/InfectoAtlas-GT`, rama `main`. La raíz del servicio es la raíz del repositorio.
2. Usar Node compatible con `engines` en `package.json` (22.12 o posterior; la revisión local usó Node 24).
3. Compilar: `npm install --include=dev && npm run build`. Iniciar: `npm start`.
4. Ruta de comprobación: `/api/health`. La plataforma proporciona `PORT`; conservar el mismo dominio para frontend y API.
5. PubMed funciona sin una clave de pago. `NCBI_EMAIL` y `NCBI_API_KEY` son opcionales y exclusivamente del servidor. No usar el prefijo `VITE_` ni subir secretos al repositorio.
6. Conservar despliegues manuales durante la preparación, para elegir qué revisión se publica. Revisar las condiciones y límites vigentes antes de crear el servicio.
7. Verificar en el dominio final: navegación, consulta PubMed real, imágenes externas, PDF, respaldo, teléfono y 3D en dispositivos con WebGL.

Este procedimiento aún no se ha ejecutado en Render. La dependencia de npm necesita un archivo de bloqueo adecuado para fijar versiones en producción; el repositorio conserva sus archivos de bloqueo anteriores. No se usa `npm ci` sin `package-lock.json`.

## Qué contenido verá un visitante

- Se incluyen 43 referencias del catálogo y enlaces a 207 fotografías distintas del CDC, 21 ciclos originales para 20 perfiles de parásitos y 13 apartados de manifestaciones características para 14 perfiles. Algunas referencias clínicas son fichas iniciales, con apartados vacíos explícitos y revisión pendiente.
- Las imágenes se cargan desde CDC; no se presentan como casos de Guatemala. El 3D experimental usa coordenadas de RCSB PDB para una proteína, no una reconstrucción completa de cada microorganismo.
- Los documentos y notas de tu navegador **no se publican con GitHub**. El catálogo documental más grande que ves aquí depende de tu biblioteca local.
- Un dominio nuevo tiene almacenamiento separado. Para usar tu biblioteca en ese dominio habrá que exportar y restaurar un respaldo. El respaldo conserva metadatos y texto extraído; los archivos PDF originales deben conservarse e importarse aparte. Restaurarlo mantiene la biblioteca local, sin convertirla en una colección compartida para todos los visitantes.
- Antes de distribuir contenido de los PDF se necesita preparar una colección editorial con atribución, vigencia y permisos de redistribución. Las páginas escaneadas necesitan OCR o transcripción para aparecer en las fichas. No se han enviado PDF privados al repositorio.
- La biblioteca incluye ejemplos señalados como demostración docente. Revisar su presentación o retirarlos de los valores iniciales antes de un lanzamiento final; no son fuentes académicas auténticas.

## Alternativas

| Servicio | Encaje con InfectoAtlas GT | Consideración |
| --- | --- | --- |
| Render | Servidor Node/Express existente y aplicación en un dominio | Instancias gratuitas para demostración; revisar un plan estable para lanzamiento |
| Railway | También admite un servidor persistente | Revisar cobro por plan y uso; no se ha contratado |
| Vercel | Frontend Vite y Express como función | Requiere revisar adaptación del servidor y la caché a ejecución como función |
| GitHub Pages | Publicación de archivos estáticos | La API PubMed necesita un servidor aparte; no basta para esta aplicación completa |

Referencias: [planes de Railway](https://docs.railway.com/pricing/plans), [Express en Vercel](https://vercel.com/docs/frameworks/backend/express). La elección definitiva queda para cuando el contenido esté listo.

## Trabajo pendiente antes del lanzamiento

1. Completar clínica, laboratorio y terapéutica de las fichas iniciales y revisar vigencia de las existentes.
2. Ampliar las imágenes pertinentes: la colección pública tiene 10 perfiles con ocho o más imágenes; cinco aún no tienen imágenes. No todas las entradas documentales del navegador tienen galería.
3. Incorporar las páginas escaneadas y revisar la atribución de páginas que mencionan varias especies.
4. Completar evidencia oficial para Guatemala y referencias regionales identificadas. El mapa y los módulos AMR/Treatment requieren datos con territorio, periodo y fuente; no se han inventado cifras.
5. Ampliar estructuras experimentales 3D con fuentes adecuadas para otros microorganismos.
6. Preparar contenido público compartido y revisar privacidad, permisos, accesibilidad, dependencias y funcionamiento en el alojamiento final.
