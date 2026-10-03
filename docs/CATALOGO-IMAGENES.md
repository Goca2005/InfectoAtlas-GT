> Documento de la primera entrega v0.4.3. La ampliación actual y su estado están en [ATLAS-ACADEMICO.md](ATLAS-ACADEMICO.md).

# Fase 4C inicial — catálogo e imágenes reales (v0.4.3)

## Recorrido

1. Abre **Microorganismos → Explorar fichas documentadas**.
2. Consulta las ocho fichas: Campylobacter jejuni, Shigella dysenteriae, Toxoplasma gondii, Histoplasma capsulatum, Escherichia coli (enfoque diarrea), Streptococcus pneumoniae, Cryptococcus neoformans e Influenza A virus.
3. **Ficha Completa** muestra fuentes primarias enlazadas y fecha de consulta. Los campos no documentados se identifican como pendientes. Son síntesis educativas pendientes de revisión clínica independiente.
4. **Imágenes reales** presenta cuatro fotografías del CDC PHIL: 5778 (Campylobacter SEM), 10961 (Histoplasma filamentoso de suelo), 21106 (Toxoplasma IFA) y 11746 (influenza H1N1 TEM de 2009). Se muestran técnica, crédito, fecha, licencia, enlace original y límites de interpretación.
5. Exporta el respaldo y utiliza **Añadir fichas ausentes** para incorporarlas al catálogo personal. La lista de nombres se muestra antes de guardar. Solo se añaden especies ausentes por nombre normalizado e identificador. No se reemplazan versiones personales ni se borran duplicados antiguos.

Las fotografías se cargan desde el CDC y necesitan conexión. No se incluyen sus bytes en el respaldo: se conservan enlaces y metadatos. Cuatro fichas aún no tienen fotografía con procedencia documentada. Los modelos 3D siguen pendientes y serán representaciones educativas identificadas como tales.

## Corrección del importador de PDF

El analizador por reglas evita proponer una ficha nueva para una especie que ya existe y emite una sola propuesta de creación por especie/documento, conservando la primera página y cita. Las actualizaciones por campo/página siguen disponibles. La categoría se transmite como dato estructurado. Para propuestas anteriores, las seis especies reconocidas por el analizador tienen categoría explícita; las desconocidas sin categoría se rechazan. Ya no se asigna siempre «parásito» ni se inventan temperatura, síntomas, epidemiología nacional o año de publicación.

El texto aprobado sigue sujeto a revisión humana. Esta corrección no reclasifica automáticamente fichas antiguas: la biblioteca puede contener apuntes propios que deben conservarse. Las fuentes revisadas aquí no sustentan tasas, departamentos prioritarios o grupos de notificación en Guatemala.

## Estado del proyecto y siguientes fases

| Parte | Estado |
| --- | --- |
| Fases 1–3: catálogo, atlas, biblioteca, PDF, revisión y respaldo | Conservadas |
| 4A: PubMed real y trazabilidad | Implementada; consulta manual |
| 4B: alertas personales y publicaciones MSPAS/OPS/OMS | Implementada con consulta/importación manual; PR #2 integrado en main |
| 4C: ampliar catálogo y fotografías reales | Primera entrega: 8 fichas y 4 imágenes |
| Alertas programadas y conectores oficiales automáticos | Pendientes de fuente estable y persistencia compartida |
| AMR Radar y Treatment Tracker | Pendientes de datos oficiales y criterios clínicos |
| Mapa de Guatemala con cifras oficiales | Pendiente de datos geográficos verificables |
| Visor Three.js azul marino: virus, bacterias, hongos y parásitos | Pendiente |

## Integrar en GitHub y Replit

El cambio se prepara como PR de borrador sobre main. Tras revisarlo y fusionarlo, sincroniza el proyecto existente en Replit desde GitHub. Mantén el mismo origen de la aplicación y exporta un respaldo antes de cambiar de dominio: el almacenamiento del navegador no viaja mediante GitHub. No se activa despliegue ni servicio de pago.

Con Node 22.12 o posterior, instala con el lock existente y ejecuta:

```sh
npx --yes pnpm@11.19.0 install --frozen-lockfile --ignore-scripts
npx --yes pnpm@11.19.0 run lint
npx --yes pnpm@11.19.0 test
npx --yes pnpm@11.19.0 run build
npx --yes pnpm@11.19.0 run dev
```

**Run** en Replit sirve la aplicación y API en el puerto 5000. Para producción se utiliza `node server/index.mjs` después del build. No se añadió ninguna dependencia. Las pruebas de esta entrega verifican aislamiento, deduplicación, categorías, procedencia y errores de almacenamiento; no equivalen a validación clínica de las fichas.

La comprobación adicional de conexión real a NCBI desde el entorno local restringido terminó con error de conexión/504. No se declara aprobada. Repite `npx --yes pnpm@11.19.0 run test:live` en Replit con acceso a Internet. Pasaron 60 pruebas de lógica y respaldo, el chequeo de tipos y el build. El build conserva un aviso de tamaño del bloque principal (1.33 MB); la división de carga sigue pendiente.
