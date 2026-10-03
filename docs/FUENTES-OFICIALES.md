# Fase 4B documental · v0.4.2

## Qué incluye

Guatemala Sentinel incorpora documentos MSPAS y Global Watch incorpora documentos OPS/OMS. El registro empieza vacío; no se incluyen noticias, boletines ni cifras inventadas. La incorporación es **manual**, desde una publicación concreta de la institución y un PDF local o fragmento transcrito.

Se conserva título, enlace original, fecha si consta, período, territorio, departamentos declarados, fichas vinculadas, fragmento literal, página y huella SHA-256 del PDF. El dominio permitido valida la dirección: no certifica que el archivo adjunto provenga de esa institución. La revisión registra el nombre declarado del usuario, fecha, motivo y limitaciones; no autentica su identidad ni aprueba contenido clínico.

## Recorrido

1. Abre **LIVE → Guatemala Sentinel** o **Global Watch** y el índice oficial correspondiente.
2. Identifica una publicación concreta. En **Incorporar documento oficial**, copia su título y enlace; deja vacías la fecha y semana si no constan. No reemplaces la fecha de publicación por la fecha de descarga.
3. Adjunta un PDF de hasta 10 MiB, 200 páginas y 200000 caracteres, o selecciona transcripción manual. Los PDF escaneados sin texto requieren transcripción; no se ejecuta OCR ni se inventa el contenido.
4. Selecciona la página y copia un fragmento literal de entre 30 y 3000 caracteres. El registro comprueba que aparece exactamente en el texto extraído. En una transcripción manual la comparación corresponde al usuario y no se presenta como extracción PDF.
5. Prepara la vista previa y guarda como pendiente. Se rechazan enlaces o archivos duplicados entre registros activos.
6. Abre **Revisar documento**, compara con la publicación original, escribe revisor y motivo y confirma las comprobaciones. Puedes registrar procedencia revisada o descartar. Para cambiar una decisión, reabre como pendiente: el historial se conserva.
7. Un PDF revisado puede enviarse a la Biblioteca Académica, conservando enlace y huella. Repetir el envío no duplica el documento. Analizarlo produce propuestas pendientes: no modifica automáticamente las fichas ni convierte un boletín en norma terapéutica.
8. Las fichas muestran documentos vinculados en **Actualizaciones científicas**. Vigilancia Epidemiológica reutiliza el mismo registro MSPAS.

### Correcciones y respaldo

Los metadatos guardados son inmutables. Si hay un error, descarta el registro con el motivo y vuelve a incorporarlo corregido; la versión anterior conserva su historial. Si ya existe una versión activa, no se permite reabrir la descartada como otra versión activa.

Se conservan hasta 50 registros, incluidos los descartados, y 50 revisiones por registro; no se elimina evidencia automáticamente al llegar al límite. Exportar un respaldo protege la evidencia pero **no libera espacio ni aumenta esos límites**. El archivo JSON incluye texto, metadatos y revisiones en `userSettings.infectoAtlasOfficialV1`, además del documento de biblioteca cuando se haya enviado. Conserva los PDF originales por separado: sus bytes no están en el respaldo.

La biblioteca contiene una copia independiente del texto. Las ediciones posteriores de esa copia no alteran el registro original; la huella identifica el PDF inicialmente adjunto, no esas ediciones. Descartar o reabrir el registro tampoco elimina automáticamente su copia de biblioteca ni cambia propuestas ya revisadas allí. La revisión clínica sigue siendo un proceso independiente.

Los datos permanecen en el navegador y origen donde se guardaron. GitHub/Replit actualizan código, no sincronizan esos datos personales. No se migran ni limpian al instalar esta versión. Preferencias dañadas, registro inválido y falta de cuota bloquean las escrituras nuevas. El envío a biblioteca verifica que la colección pueda leerse y solo informa éxito tras persistirla.

## Obtención de fuentes: alcance real

Se revisaron los portales el 3 de octubre de 2026. El índice de alertas MSPAS fue accesible; su detalle 2026 y el índice de boletines devolvieron 403 desde este entorno. El índice de alertas OPS también devolvió 403. El portal OMS estaba disponible, pero no se confirmó un feed/API estable para esta integración. Por eso esta versión incorpora evidencia manual revisable y **no implementa un conector automático ni afirma haber descargado boletines actuales**.

- [MSPAS: alertas epidemiológicas](https://epidemiologia.mspas.gob.gt/informacion/vigilancia-epidemiologica/alertas-epidemiologicas)
- [MSPAS: boletines](https://epidemiologia.mspas.gob.gt/informacion/vigilancia-epidemiologica/boletin)
- [OPS: alertas y actualizaciones](https://www.paho.org/en/epidemiological-alerts-and-updates)
- [OMS: Disease Outbreak News](https://www.who.int/emergencies/disease-outbreak-news)

`/api/live/sources` declara estas fuentes como `manual-document-with-review`. PubMed conserva su consulta real mediante el backend. No hay scraping, llamadas de IA, servicios de pago, correo, push, vigilancia programada ni cambios en las estadísticas del mapa.

## Verificación local

- 54 pruebas: 41 de regresión y 13 de documentos oficiales, procedencia, duplicados, revisión, respaldo, propuesta clínica pendiente y errores de almacenamiento. Todas pasaron.
- TypeScript y build de producción pasaron. Continúa el aviso por el tamaño del paquete principal (~1.30 MB sin gzip); la división de módulos queda pendiente.
- El cargador `tsx` no puede iniciarse aquí por `uv_os_get_passwd/ENOMEM`. Las mismas pruebas se compilaron a una copia temporal con TypeScript; se ajustaron los imports ESM de esa copia y se ejecutaron con `node --test` dentro del entorno restringido. El proyecto conserva `pnpm test` para Replit/GitHub.
- Prueba de navegador aislada en puerto 5001 con un PDF sintético identificado como prueba: extracción, rechazo de cita ajena, vista previa sin guardar, registro pendiente, rechazo de revisión incompleta, revisión con limitación declarada, envío único a biblioteca, persistencia al recargar y vínculo a ficha. Esto verifica el flujo, no la autenticidad de un boletín real.
- La vista del usuario en puerto 5000 conserva sus datos; las pruebas no escriben en su almacenamiento.

## Integrar en Replit/GitHub

1. Exporta el respaldo de la app donde están tus datos y conserva los PDF originales. Guarda los cambios de código que tengas en Replit.
2. Revisa y fusiona la propuesta de v0.4.2 en GitHub. Actualiza el código del Replit existente desde `main`; si hay cambios locales o conflictos, revísalos antes de reemplazar archivos.
3. No se añaden dependencias ni secretos. Usa Node 22.12 o posterior y el lockfile existente:

```sh
npx --yes pnpm@11.19.0 install --frozen-lockfile --ignore-scripts
npx --yes pnpm@11.19.0 run lint
npx --yes pnpm@11.19.0 test
npx --yes pnpm@11.19.0 run build
npx --yes pnpm@11.19.0 run dev
```

**Run** en Replit conserva `node server/index.mjs --dev`; producción usa `pnpm build` y `pnpm start` con backend Node. Esta entrega no publica el proyecto ni activa un plan de alojamiento. Al usar un dominio u origen diferente, importa tu respaldo mediante la vista previa de restauración existente.

## Próximos pasos

El usuario confirmó que la continuación también incluye ampliar y completar microorganismos e información, imágenes diagnósticas y microfotografías auténticas con fuente/licencia, y modelos educativos 3D para virus, bacterias, hongos y parásitos. Revisar los faltantes del catálogo actual antes de agregar registros y conservar sus fichas personalizadas. Las imágenes deben distinguirse de ilustraciones y modelos; el 3D debe mostrar su escala/limitaciones y no presentarse como una captura microscópica real.

Validar un método oficial estable de obtención antes de automatizar MSPAS/OPS/OMS. Después: alertas programadas y persistencia compartida, AMR Radar, Treatment Tracker, mapa de Guatemala con datos oficiales y visor Three.js azul marino oscuro. No se completan esas fases en v0.4.2.
