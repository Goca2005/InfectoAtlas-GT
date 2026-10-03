# Avance 0.6.0 · portal académico y atlas visual

## Cambios

- Portada académica con fotografías auténticas para los cuatro grupos, búsqueda y accesos a fichas, laboratorio, biblioteca y PubMed.
- Atlas visual global con filtros por grupo, técnica/texto, tipo de imagen y microorganismo. Las fotografías compartidas se cuentan una sola vez y conservan todas sus fichas asociadas. Los nombres repetidos de fichas personales se agrupan en el selector, conservando cada registro.
- Miniaturas reales en las tarjetas del catálogo, con indicación de imágenes pendientes cuando no hay una fuente documentada.
- 43 referencias incluidas disponibles desde la primera visita. Las fichas personales tienen prioridad; las referencias ausentes se muestran en memoria sin escribir en el almacenamiento personal ni en sus respaldos.
- 11 referencias clínicas iniciales adicionales a las 32 referencias visuales anteriores. Contienen manifestaciones y fuente; los apartados sin información permanecen pendientes.
- 13 apartados de signos característicos para 14 perfiles: se añaden tétanos, tos ferina, Lyme, parvovirus B19, varicela, sífilis y dermatofitosis. Solo se usa el término tríada cuando la fuente lo respalda; se conserva el contexto congénito en las tríadas anteriores.
- Cinco fotografías clínicas adicionales: PHIL 6121 (varicela), 2361 y 4147 (sífilis), 15441 y 16682 (tiñas con especie atribuida por el registro). Dominio público y créditos comprobados en sus registros originales. Se conservan las imágenes previas.
- Práctica de observación en el laboratorio: seis preparaciones reales por sesión, respuesta por grupo de muestra/preparación y revelación de técnica, procedencia y ficha. La clasificación procede de metadatos; no realiza diagnóstico de imágenes de pacientes.
- Secciones grandes cargadas al abrirlas. La compilación produce un archivo principal de aproximadamente 624 kB y un archivo de datos visuales de 193 kB, frente al archivo principal anterior de 1.116 MB. Sigue pendiente reducir la descarga inicial; el motor PDF y Three.js conservan su carga separada.
- Pantalla de avance en la portada: contenido incluido, entradas con imágenes y páginas sin texto extraíble. [Guía de publicación futura](PUBLICACION.md).

## Conteos reproducibles

El catálogo público tiene 43 perfiles, 38 con imágenes, 207 fotografías distintas y 209 asociaciones de fotografías con perfiles. Diez perfiles tienen ocho o más imágenes; cinco todavía no tienen imágenes. Veinte perfiles de parásitos conservan 21 ciclos CDC.

El catálogo visible en un navegador puede ser mayor por sus fichas personales y sus PDF. Una entrada documental o de género no equivale a una ficha clínica completa. Los indicadores no expresan un porcentaje de proyecto terminado ni una validación clínica automática.

## Verificación

TypeScript y compilación de producción. 92 pruebas automatizadas, incluidas ocho nuevas sobre conservación de datos, referencias públicas, asociación de páginas, deduplicación de fotografías, filtros, imágenes clínicas y práctica de observación.

En el entorno local restringido, el cargador `tsx` no pudo iniciarse por `uv_os_get_passwd/ENOMEM`. Se ejecutó la misma suite sobre una copia temporal compilada con TypeScript, ajustando solo imports ESM para Node. No se cambiaron las fuentes para eludir restricciones.

La revisión visual comprueba escritorio y teléfono, fotografías originales cargadas, filtros y apertura de fichas. Los documentos y notas personales no se suben al repositorio. La verificación local no equivale a un despliegue probado en Render ni a una revisión médica independiente.

## Fuentes de los nuevos apartados clínicos

Consultadas el 3 de octubre de 2026:

- [Tétanos: signos clínicos](https://www.cdc.gov/tetanus/hcp/clinical-signs/index.html).
- [Tos ferina: signos y síntomas](https://www.cdc.gov/pertussis/signs-symptoms/index.html).
- [Lyme: manifestaciones y eritema migratorio](https://www.cdc.gov/lyme/signs-symptoms/index.html).
- [Parvovirus B19](https://www.cdc.gov/parvovirus-b19/about/index.html).
- [Varicela: presentación clínica](https://www.cdc.gov/chickenpox/hcp/clinical-signs/index.html).
- [Sífilis y sus etapas](https://www.cdc.gov/syphilis/about/index.html).
- [Dermatofitosis](https://www.cdc.gov/ringworm/about/index.html).

Cada fotografía enlaza a su registro PHIL y a sus condiciones de uso. Son referencias internacionales para educación en Guatemala; no establecen la situación epidemiológica nacional.

## Próxima prioridad

Completar y revisar las fichas, incorporar texto de páginas escaneadas, ampliar las galerías por microorganismo y preparar una colección documental pública con atribución y permisos. Continúan pendientes datos oficiales nacionales, ampliación del 3D experimental y verificación en alojamiento final.
