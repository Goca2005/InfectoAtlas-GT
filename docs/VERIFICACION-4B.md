# Verificación de InfectoAtlas GT 0.4.1

## Base de integración

La rama parte del commit remoto `721f43dcbb0bf22a48231a8288fd0db27dcee80f`. Sus 52 archivos coinciden por SHA de blob con la carpeta exterior del ZIP entregado por el usuario. La versión interior `InfectoAtlas-GT.zip` contiene correcciones posteriores del respaldo y configuración de Replit; se utilizó esa versión para continuar el desarrollo.

Por eso la propuesta incluye las correcciones del respaldo y su revisión, además de PubMed (4A) y las alertas científicas personales (4B inicial). Se conservan los 24 registros del catálogo, el atlas, la biblioteca, el comparador y el módulo de estudio. El ZIP que ya estaba en el repositorio se conserva como archivo histórico y no representa el código actual de la raíz.

## Resultados locales, 3 de octubre de 2026

- Comprobación de tipos: correcta.
- Compilación de producción con Vite: correcta; conserva el aviso de tamaño del archivo JavaScript principal.
- 41 pruebas aprobadas: 29 anteriores y 12 nuevas. Cubren respaldos, trazabilidad de documentos, PubMed, caché, validación, deduplicación, alertas, lectura, errores, límites de llamadas, cancelación y resultados parciales.
- El ejecutor `tsx` no pudo iniciarse en el entorno local restringido debido a `uv_os_get_passwd/ENOMEM`. La ejecución fuera de ese entorno fue rechazada. Las mismas pruebas se ejecutaron en una copia temporal compilada por `tsc`, ajustando únicamente extensiones de import y atributos JSON para Node ESM. El comando estándar del proyecto permanece `pnpm test`; no se afirma que este comando haya pasado en GitHub o en Replit.
- Consulta real desde el navegador: **Plasmodium vivax**, intervalo de publicación **2026-09-03 a 2026-10-03**, primera página. Recuperó 20 publicaciones y creó 13 alertas nuevas respecto al historial local conservado. Repetirla creó 0 alertas nuevas.
- Marcar una alerta como leída dejó 12 pendientes y su lectura persistió al recargar.
- Revisión de escritorio y móvil de 390 px: sin desbordamiento horizontal en la bandeja.

Los conteos son los observados en ese momento y pueden cambiar. La prueba real no utiliza noticias sintéticas. Las pruebas unitarias usan fixtures aislados. No se restauraron ni modificaron datos personales de la instancia del usuario en Replit.

## Cómo comprobar antes de integrar

1. Exportar un respaldo JSON en la instancia con datos del usuario y conservar los PDF originales.
2. Instalar con `npx --yes pnpm@11.19.0 install --frozen-lockfile --ignore-scripts`.
3. Ejecutar `npx --yes pnpm@11.19.0 run lint`, `npx --yes pnpm@11.19.0 test` y `npx --yes pnpm@11.19.0 run build`.
4. Ejecutar la app con `pnpm dev` o el botón Run de Replit. LIVE requiere el backend Node incluido.
5. Seguir una especie desde su ficha, abrir LIVE → Alertas científicas, seleccionar una especie y consultar. Revisar PMID, enlace original, búsqueda y fechas. Repetir para confirmar que no duplica las alertas ni reinicia su lectura.
6. Opcionalmente ejecutar `pnpm test:live` para comprobar la conexión real con NCBI; esta prueba requiere internet.

El workflow de GitHub es exclusivamente manual (`workflow_dispatch`). No se activan ejecuciones automáticas, publicación en Replit, vigilancia programada ni servicios nuevos de pago.

## Límites

Las alertas son novedades bibliográficas personales, no alertas de brotes ni recomendaciones clínicas. Las consultas por lote son manuales, hasta diez especies y una página de veinte registros por especie. Se conservan hasta cien alertas y mil identificadores recientes. El historial permanece por navegador y se respalda dentro de preferencias; la fusión de respaldos conserva las preferencias locales en claves coincidentes, sin combinar internamente dos bandejas. No funciona con la aplicación cerrada.

OMS/OPS/MSPAS, avisos programados, persistencia compartida, AMR Radar, Treatment Tracker, mapa con cifras oficiales y visor 3D Three.js permanecen en el roadmap. Todo cambio clínico requiere revisión.
