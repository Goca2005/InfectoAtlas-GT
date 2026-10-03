# Vista previa en el Worker existente

El build d90b62f5 falló al instalar: `bun install --frozen-lockfile` detectó un archivo Bun desactualizado. Además contenía URLs internas de Replit. Se elimina ese archivo y se conserva `pnpm-lock.yaml`, validado con instalación congelada. No se borran fichas ni documentos personales.

## Configuración

- Worker existente: `infectoatlas-gt`; rama: `main`; directorio: `/`.
- Compilación: `pnpm run build`.
- Despliegue: `npx wrangler deploy`.
- Node: 22.12 o posterior (el entorno observado utiliza 24.18).
- `wrangler.jsonc` sirve `dist` como SPA y envía `/api` y `/api/*` al backend `server/worker.mjs`.
- El backend Express sigue funcionando para ejecución local, Replit y servidores Node.

PubMed reutiliza la validación, ESearch, ESummary, EFetch y normalización existentes. Las búsquedas repetidas se almacenan quince minutos en la caché de Cloudflare. Las consultas nuevas tienen un límite conservador compartido de una por diez segundos por ubicación de Cloudflare; no constituye un límite global entre todas las ubicaciones. Los errores no exponen credenciales. No hay consulta automática ni artículos inventados.

`NCBI_EMAIL` y `NCBI_API_KEY` son opcionales y se configuran como variables/secretos de ejecución del Worker. Nunca usar nombres `VITE_` para secretos. El despliegue conserva las variables existentes. No se activa un plan de pago, base de datos, cron ni servicio adicional.

Verificar después del despliegue: página principal, `/api/health`, `/api/live/sources` y una búsqueda manual en LIVE. Un error API debe devolver JSON, nunca la página HTML del atlas.

Referencias oficiales: [fallos de compilación](https://developers.cloudflare.com/workers/ci-cd/builds/troubleshoot/), [SPA y rutas](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/), [límite de consultas](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).
