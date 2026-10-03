# InfectoAtlas GT · entrega académica v0.5.0

## Recorrido

1. Abre un microorganismo y «Ver ficha»: la Ficha académica es la vista inicial.
2. El índice permite ver todos los apartados o seleccionar identidad, clínica, diagnóstico, tratamiento, prevención, ciclo, Guatemala y fuentes.
3. Los fragmentos de los documentos cargados aparecen bajo su tema, con título, página, tipo de fuente y contexto. Fragmentos idénticos comparten sus referencias; los textos extensos pueden desplegarse y los conjuntos grandes permiten leer más fragmentos.
4. Buscar filtra exclusivamente el texto documental y sus títulos. Borra la búsqueda para volver a mostrar los datos guardados.
5. «Documentos» permite filtrar tema/documento y leer la página original completa. «Imágenes reales», «Ciclo CDC», «Modelo 3D» y «PubMed» conservan sus vistas propias.
6. El cierre funciona con el botón o Escape. El foco del teclado permanece en el diálogo y se devuelve al elemento previo al cerrar. La navegación se adapta a escritorio y móvil.

## Incorporación de la biblioteca

El reconocimiento local amplía los nombres de bacterias, virus, hongos y parásitos, contempla alias y añade grupos explícitos cuando la página solo identifica un género. Las páginas de continuación se vinculan por un epígrafe previo y se señalan como contextuales; las páginas que mencionan varios agentes mantienen esa advertencia.

Las nuevas entradas son vistas documentales reconstruidas al abrir la aplicación. La categoría de consulta puede corregir registros antiguos reconocidos. El código no sustituye las fichas personales ni sus documentos en el almacenamiento. Los conteos dependen de la biblioteca de cada navegador e incluyen especies y grupos; no son un inventario de fichas clínicas completamente revisadas.

La organización separa encabezados reconocibles dentro de una página, manteniendo los fragmentos literales. El analizador genera propuestas separadas por tema, siempre pendientes. Esto no interpreta automáticamente dosis, roles diagnósticos o recomendaciones nacionales. El texto sin epígrafe puede quedar bajo un tema general; siempre se conserva en el lector completo. Las páginas escaneadas sin texto siguen requiriendo OCR y acceso al PDF original. No se aplica OCR remoto ni se envían documentos a una IA.

## Atlas de imágenes y ciclos

32 fichas de referencia tienen galerías de al menos cuatro imágenes; la colección conjunta contiene 168 imágenes con fuentes y créditos. Se distinguen microscopía, cultivo, clínica, vectores y entorno. No todas las imágenes muestran el organismo aislado ni todos los agentes documentales nuevos tienen galería. Las fuentes originales CDC/PHIL y sus condiciones de uso están enlazadas; los diagramas CDC se conservan sin modificar.

20 fichas parasitarias incluyen 21 ciclos: Taenia solium presenta teniasis y cisticercosis por separado. Se indican nombres de formas infectivas y diagnósticas, muestras, resumen en cuatro pasos y límites de interpretación. Las fuentes y las fechas de consulta están en la ficha. La síntesis educativa está pendiente de revisión clínica independiente.

## Laboratorio 3D

Diez formas de referencia: bacilo, cocos, virus envuelto, levadura, protozoo, nematodo, cestodo, trematodo, ácaro y piojo. Rotación, zoom, capas y corte educativo. Three.js 0.185.1/MIT se distribuye localmente con sus avisos y huellas. Los modelos no son fieles a todas las especies ni estadios del catálogo. WebGL2 es necesario; si no está disponible se presenta un mensaje explícito.

## LIVE, AMR y tratamiento

Se conserva la consulta manual real a PubMed mediante el backend existente. AMR Radar y Treatment Tracker permiten registrar/importar evidencia documentada, deduplicar, revisar y conservar historial dentro de preferencias y respaldo. No hay cifras de resistencia precargadas sin fuente. Los porcentajes se derivan de numerador y denominador informados, y la aceptación del usuario no equivale a validación clínica. La exportación de entradas reutilizables omite revisiones y vínculos de versión; el respaldo completo conserva el registro y sus relaciones.

## Guatemala y trabajo pendiente

MSPAS tiene prioridad nacional. Las referencias OPS y de México se identifican por origen y periodo. No se extrapolan tasas de países vecinos a Guatemala. Siguen pendientes la síntesis revisada de todas las fichas documentales, OCR de escaneos, ampliación de galerías y modelos específicos, conectores oficiales automáticos y el mapa con geometría y cifras nacionales verificadas. No se activan servicios ni costes.

## Verificación de esta entrega

77 pruebas de lógica, reconocimiento, separación temática, procedencia, deduplicación, errores y respaldos pasaron; tipos y compilación también. En este entorno restringido se ejecutó la misma suite compilada mediante TypeScript y Node porque el cargador tsx no pudo iniciarse. La interfaz se comprobó a 1280 × 900 y 390 × 844: índice, lectura de diagnóstico/tratamiento y límites sin desbordamiento horizontal. Esto no valida clínicamente el contenido ni certifica cada recurso externo.

La comprobación real a NCBI de esta entrega terminó con error externo de conexión/504. No se declara resuelta; repetir test:live desde Replit. El motor PDF se carga al abrir un PDF y usa el worker local de la misma versión. El bloque principal bajó de 1,51 MB a 1,08 MB, aunque conserva el aviso de tamaño y debe dividirse más en entregas siguientes.

## GitHub y Replit

La entrega se prepara mediante un PR hacia la rama de trabajo `codex/catalogo-imagenes-4c`, respetando la regla que requiere PR. El PR principal de la fase sigue siendo el #3 hacia main; consultar su estado antes de integrar.

Conserva el proyecto Replit existente. Desde Git/Version control, sincroniza la rama que contenga esta entrega; no vuelvas a importar otro proyecto. Antes de cambiar de origen o dominio, exporta el respaldo completo y después impórtalo con la función de restauración. GitHub contiene código y fuentes públicas de referencia; no contiene la biblioteca privada del navegador.

Con Node 22.12 o posterior:

```sh
npx --yes pnpm@11.19.0 install --frozen-lockfile --ignore-scripts
npx --yes pnpm@11.19.0 run lint
npx --yes pnpm@11.19.0 test
npx --yes pnpm@11.19.0 run build
npx --yes pnpm@11.19.0 run dev
```

Run utiliza la aplicación y API en el puerto 5000. Producción utiliza `node server/index.mjs` tras el build. Las variables de NCBI opcionales se guardan en Secrets del servidor, nunca en el cliente. La revisión/desarrollo no exige activar un despliegue de pago.
