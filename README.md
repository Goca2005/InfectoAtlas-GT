# InfectoAtlas GT · Fase 4C inicial — v0.4.3

## Nueva ampliación de catálogo e imágenes

**Microorganismos → Explorar fichas documentadas** ofrece ocho fichas educativas con fuentes CDC enlazadas y cuatro fotografías reales con créditos, licencia y límites de interpretación. Se añaden únicamente las especies ausentes mediante un botón con vista previa; las versiones personales se conservan. El importador de PDF evita crear fichas repetidas y conserva la categoría bacteriana, viral, fúngica o parasitaria sin inventar campos clínicos.

Consulta [el recorrido, fuentes, límites y roadmap](docs/CATALOGO-IMAGENES.md). Los modelos Three.js siguen pendientes. La Fase 4B documental ya está integrada en main mediante PR #2.

Continuación del proyecto existente con React 19, TypeScript, Vite 8 y Tailwind. La base utilizada es `InfectoAtlas-GT.zip`, incluida dentro del ZIP entregado: contiene los respaldos corregidos, configuración de Replit y pruebas. La carpeta exterior del ZIP corresponde a una versión anterior.

## Qué funciona

- Catálogo original de 24 fichas, atlas diagnóstico, biblioteca académica, extracción por páginas, revisión, comparador, estudio y explorador de Guatemala.
- Nueva sección InfectoAtlas LIVE y pestaña **Actualizaciones científicas** en cada ficha.
- Consulta manual real a PubMed mediante ESearch, ESummary y EFetch. Títulos, autores, revista, fechas originales, PMID, DOI, tipos de publicación y resumen cuando la fuente los informa.
- Filtros de término/enfermedad, microorganismo, tema y fechas de publicación. Tipo de publicación y categoría vinculada filtran los registros de la página recuperada, y se indican como tales.
- Seguimiento personal, historial de éxito/error y deduplicación por PMID/DOI. Los vínculos a especies son preliminares, basados en la consulta o menciones textuales. Las consultas no modifican las fichas clínicas ni crean propuestas de aprobación.
- Seguimiento y últimas consultas se guardan dentro de preferencias y entran en el respaldo SHA-256 existente.
- Los PDF usan un worker incluido en la compilación, del mismo origen y versión; no requieren descargarlo de un CDN.

## Fase 4B documental: fuentes oficiales

Guatemala Sentinel (MSPAS) y Global Watch (OPS/OMS) permiten incorporar una publicación concreta con PDF local o fragmento transcrito. Se conservan enlace, fecha informada, territorio, página, cita literal, huella del archivo e historial de revisión. El registro empieza vacío y pendiente; solo los PDF revisados se envían a biblioteca, donde las propuestas clínicas siguen pendientes. No hay obtención automática.

Consulta el [recorrido, límites, verificaciones e integración en Replit](docs/FUENTES-OFICIALES.md). El catálogo y el servicio de respaldos existentes se conservan.

## Fase 4B: bandeja de alertas y consulta por lote

- En LIVE abre **Alertas científicas**. Sigue primero una especie desde su ficha y selecciona hasta diez especies para consultar.
- La consulta se inicia con un botón, una especie por vez, con fechas de publicación y hasta veinte registros por especie (primera página). No garantiza cobertura de todas las publicaciones: usa las páginas del buscador para ampliar la revisión.
- Las búsquedas individuales también generan alertas para especies seguidas. Se deduplican por PMID/DOI, conservan el vínculo preliminar a la ficha, la fecha de detección, la recuperación original y el enlace de la búsqueda.
- Filtra por especie y por lectura; marca una alerta o todas como leídas y puedes volver a marcar sin leer. Repetir una consulta no reinicia el estado de lectura.
- Las consultas anteriores a 4B se reconocen como publicaciones ya vistas y no generan una bandeja retroactiva. Seguir una especie tampoco convierte automáticamente su literatura ya guardada en alertas nuevas.
- La bandeja mantiene hasta 100 alertas (incluido su título y trazabilidad aunque salga del historial de artículos) y hasta 1000 identificadores recientes para deduplicación. Un registro que ya salió de ambos límites puede volver a contar como nuevo.
- Cancelar conserva las consultas ya completadas; no guarda la respuesta en curso. Un error de límite de llamadas, del servidor, de red o de almacenamiento detiene el lote y muestra el resultado parcial. Cada consulta tiene hasta 55 segundos de espera.
- Todo se respalda en `userSettings.infectoAtlasAlertsV1`, junto al estado LIVE previo; una consulta guarda artículos y alertas en una sola escritura para evitar registros parciales por falta de espacio.
- Estas alertas son novedades bibliográficas que requieren revisión. No son alertas epidemiológicas oficiales ni recomendaciones clínicas. No hay correo, push, tareas programadas, scraping ni servicios nuevos de pago.

### Verificaciones para GitHub

Se incluye `.github/workflows/checks.yml` para ejecutar instalación, tipos, pruebas y build desde **Actions → Revisar InfectoAtlas → Run workflow**. Es manual: no se inicia automáticamente al subir código. Revisa las condiciones y disponibilidad de GitHub Actions antes de ejecutarlo. No llama a NCBI ni despliega; las pruebas usan fixtures aislados.

Configuración de las acciones según sus fuentes oficiales: [checkout](https://github.com/actions/checkout) y [setup-node](https://github.com/actions/setup-node).

En esta entrega pasaron 60 pruebas dentro del entorno restringido usando una copia temporal compilada con `tsc` y Node. Solo se ajustaron extensiones de imports y el atributo JSON de esa copia para Node ESM. El comando habitual con `tsx` no pudo iniciarse por una restricción de `os.userInfo` en este entorno. `pnpm test` sigue siendo el comando del proyecto para Replit/GitHub. Las pruebas no equivalen a validación clínica independiente.

## Iniciar y verificar

Requiere Node.js **22.12 o posterior**. La configuración de Replit usa el módulo Node.js 22. Para usar la misma resolución de dependencias comprobada en esta entrega:

```sh
npx --yes pnpm@11.19.0 install --frozen-lockfile --ignore-scripts
npx --yes pnpm@11.19.0 run dev
```

La aplicación y `/api/live/pubmed` se sirven juntos en el puerto 5000. En Replit el botón **Run** ejecuta `node server/index.mjs --dev`; instala las dependencias antes del primer arranque. Se conserva el módulo Bun de Replit, pero esta entrega usa `pnpm-lock.yaml` para resolver las dependencias. El archivo heredado `bun.lock` no es el lock utilizado en la comprobación.

```sh
npx --yes pnpm@11.19.0 run lint
npx --yes pnpm@11.19.0 test
npx --yes pnpm@11.19.0 run build
npx --yes pnpm@11.19.0 run test:live
```

Las pruebas normales usan fixtures sintéticos aislados, no noticias de demostración dentro de la aplicación. `test:live` consulta NCBI realmente y requiere internet. La prueba real puede fallar si NCBI está caído o limita temporalmente el acceso.

Para servir una compilación de producción:

```sh
npx --yes pnpm@11.19.0 run build
npx --yes pnpm@11.19.0 start
```

`PORT` es opcional (5000 por defecto); el servidor escucha en `0.0.0.0`. `preview` conserva la vista estática de Vite, pero para comprobar LIVE usa `dev` o `start`, que incluyen el backend.

## Integrar sobre tu Replit/GitHub actual

1. Antes de actualizar, exporta un **Respaldo JSON** desde la aplicación donde están tus datos. Conserva también los PDF originales.
2. Guarda una copia o un commit del código actual. Si coincide con la versión interior del ZIP, puedes aplicar el parche entregado con `git apply --check CAMBIOS_FASE4A.patch` y luego `git apply CAMBIOS_FASE4A.patch` desde la raíz del repositorio. Si la comprobación falla, revisa las diferencias; no fuerces el parche sobre una versión distinta.
3. También puedes copiar los archivos de `InfectoAtlas-GT` del ZIP actualizado sobre el proyecto existente. Conserva tus archivos personales y tus secretos; no reemplaces el repositorio con la carpeta exterior del ZIP original.
4. Instala las dependencias y ejecuta las comprobaciones anteriores. Abre LIVE, selecciona **Plasmodium vivax**, elige **Diagnóstico** y pulsa buscar. Comprueba PMID, fechas, enlaces y el resumen. Repite la búsqueda: debe usar la caché y no contar otra vez los registros ya conservados.
5. Revisa los cambios de código en GitHub antes de subirlos. Incluye `server/`, `shared/`, los componentes/servicios nuevos y `pnpm-lock.yaml`. No subas `.env`, `node_modules`, respaldos JSON personales ni los PDF.

El repositorio es [Goca2005/InfectoAtlas-GT](https://github.com/Goca2005/InfectoAtlas-GT). La propuesta de integración de 4A/4B se prepara en una rama para revisar mediante pull request. Para publicar posteriormente hace falta un entorno que ejecute **Node**, con build y start indicados arriba; un alojamiento solo estático no ejecuta la API. Revisa el precio y las condiciones en Publishing antes de activar una publicación. No se configuró una publicación ni una tarea programada.

## PubMed y seguridad

- Funciona sin API key ni Gemini. `NCBI_EMAIL` y `NCBI_API_KEY` son opcionales, exclusivamente del servidor: agrégalos en Replit Secrets si los necesitas. Nunca uses nombres `VITE_*` para estas credenciales.
- El backend solo consulta el host oficial de NCBI y tres utilidades permitidas. No acepta una URL externa como entrada ni sigue redirecciones.
- Cola compartida por proceso, separación mínima de 400 ms entre llamadas (incluye reintentos), timeout de 12 segundos por petición, respuestas limitadas a 4 MiB y reintento limitado para 429/503.
- Caché de 15 minutos y hasta 50 consultas; coalescencia de consultas simultáneas iguales. Límite de cuatro búsquedas activas y doce búsquedas nuevas por minuto. Máximo 20 registros por página y diez páginas por consulta.
- La caché conserva la fecha original de recuperación. La interfaz distingue esa fecha, la publicación y el momento de respuesta. Las fechas de revista pueden incluir una edición futura aunque el artículo ya esté publicado electrónicamente; se muestran tal como las comunica PubMed.
- Los límites y la caché son de **un proceso**. Antes de escalar a varias instancias hay que compartir el límite y la caché para respetar el presupuesto por IP de NCBI. El historial personal permanece en el navegador, con hasta 100 publicaciones y 50 intentos. Un registro eliminado por este límite puede volver a contar como nuevo.
- Los resúmenes se conservan en su idioma y no se traducen ni se sintetizan. Se extrae el texto del XML, conservando significado de superíndices y subíndices. El formato completo está disponible en la página original.

Documentación oficial: [NCBI E-utilities](https://www.ncbi.nlm.nih.gov/books/NBK25499/), [límites de NCBI](https://www.ncbi.nlm.nih.gov/books/NBK25497/) y [condiciones de uso](https://www.ncbi.nlm.nih.gov/About/disclaimer.html).

## Fuentes y roadmap

| Fuente/módulo | Estado de esta entrega |
|---|---|
| PubMed / NCBI | Integrado y comprobado con búsquedas reales manuales |
| Guatemala Sentinel / MSPAS | Registro manual con PDF/transcripción, revisión, trazabilidad y vínculo a fichas |
| Global Watch / OMS y OPS | Registro manual con PDF/transcripción y revisión; sin obtención automática |
| AMR Radar y Treatment Tracker | Secciones informativas en desarrollo; los temas pueden consultarse en PubMed |
| Alertas científicas personales | Fase 4B inicial: bandeja, lectura y consulta manual por lote |
| Tareas programadas y persistencia compartida | Pendiente; sin notificaciones push ni vigilancia continua |
| Mapa Guatemala con datos oficiales | Se conserva el explorador educativo; GeoJSON e integración cuantitativa pendientes |
| Visor 3D con Three.js, azul marino oscuro | Fase posterior; no implementado en 4A |

`server/sources.mjs` registra el modo y estado de cada fuente; `/api/live/sources` permite inspeccionarlo. OMS/OPS/MSPAS requieren validar el método de obtención y cada comunicado antes de implementar un adaptador de consultas. La importación documental con revisión está implementada en v0.4.2; el conector automático sigue pendiente. No hay scraping ni cifras nacionales/departamentales generadas.

Se retiraron los tres reportes precargados de vigilancia porque no incluían documentos fuente verificables y aparecían como oficiales. La API de vigilancia y el explorador se conservan con un estado vacío explicado en pantalla. Los ejemplos de biblioteca siguen identificados como demostración docente.

## Datos y respaldos

Los datos que añadiste en AI Studio o Replit pertenecen al almacenamiento del navegador y no están dentro del ZIP del código. Esta entrega no los importó ni recuperó automáticamente. El respaldo conserva metadatos y texto extraído, no los bytes de PDF/TXT/MD. LIVE se respalda dentro de `userSettings.infectoAtlasLiveV1`; al restaurar se actualiza la interfaz. Fusionar conserva las preferencias locales cuando coinciden sus claves; no combina internamente dos historiales LIVE.

Pruebas y resultados de esta entrega se detallan en la guía adjunta. La compilación conserva un aviso de tamaño del JavaScript principal, que también existía en la versión base; se puede mejorar la carga por módulos en una fase posterior.
