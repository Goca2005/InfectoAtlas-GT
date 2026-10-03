# InfectoAtlas GT 0.7.0 · ampliación de fichas

## Qué incorpora

Continúa la Fase 4C del proyecto existente. Añade 138 apartados de síntesis para 28 fichas, con 38 fuentes institucionales enlazadas junto a cada explicación. La dermatofitosis comparte una síntesis general entre dos especies; sus imágenes siguen separadas por especie.

Se amplían tétanos, tos ferina, enfermedad de Lyme, parvovirus B19, varicela, sífilis, rubéola, sarampión, difteria, dermatofitosis, tuberculosis, S. aureus/MRSA, candidiasis invasiva, histoplasmosis, criptococosis, giardiasis, amebiasis, ascariasis y enterobiasis.

Se añaden ocho referencias públicas: **Neisseria meningitidis, Vibrio cholerae, Herpes simplex virus 1, Hepatitis B virus, SARS-CoV-2, Aspergillus fumigatus, Sporothrix schenckii y Cyclospora cayetanensis**. Si ya existe una ficha personal con ese nombre, se conserva y recibe el contenido de consulta sin sobrescribir sus campos.

## Presentación y documentos

- «Ficha académica» muestra la síntesis, sus enlaces, imágenes pertinentes y fragmentos literales de documentos dentro de cada apartado.
- «Consultar datos del registro original» conserva la información anterior y las notas personales.
- La búsqueda cubre síntesis, fuentes, datos guardados y documentos; reconoce tildes.
- El índice es lateral en escritorio y selector en pantallas pequeñas. Los ciclos sin contenido se omiten del índice.
- Los encabezados MORFOLOGÍA, ENFERMEDAD y SINTOMATOLOGÍA controlan mejor la agrupación de los apuntes; también se reconoce el caso de un único encabezado extraído después del cuerpo de una diapositiva. Una mención a «forma diagnóstica» no cambia un párrafo morfológico de apartado; «CICLOSPORIASIS» no se interpreta como encabezado de ciclo.
- Esta agrupación sigue siendo una ayuda de lectura. No convierte los documentos en una validación clínica automática; se mantienen páginas, texto y advertencias de atribución compartida.

## Imágenes y ciclos

Se incorporan **67 fotografías** documentadas: microscopía, cultivos, imágenes clínicas y un vector identificado. Las fotografías de distintas vistas de una misma serie se describen como tales, sin inventar pacientes distintos. Se excluyeron ilustraciones generadas, fotografías administrativas, imágenes caninas y exantemas por echovirus que aparecían en búsquedas de rubéola.

Cyclospora incorpora ocho microfotografías CDC DPDx y su ciclo original, con ooquiste esporulado como estadio infectivo y ooquiste no esporulado en heces como estadio diagnóstico. Las figuras con créditos explícitos a terceros no se incorporaron a este lote.

| Colección pública incluida | 0.6.0 | 0.7.0 |
| --- | ---: | ---: |
| Referencias | 43 | 51 |
| Fotografías distintas | 207 | 274 |
| Asociaciones imagen/ficha | 209 | 276 |
| Fichas con imágenes | 38 | 44 |
| Fichas con ocho o más imágenes | 10 | 18 |
| Fichas sin imágenes | 5 | 7 |
| Fichas parasitarias con ciclos CDC | 20 | 21 |
| Referencias de ciclos CDC | 21 | 22 |

Los siete perfiles sin imágenes corresponden a nuevas referencias cuyo material visual sigue pendiente. La colección no alcanza todavía ocho fotografías para todos los microorganismos. Las cifras de tu navegador pueden ser distintas porque incluyen fichas, grupos y documentos personales.

## Fuentes y alcance

Las síntesis se redactaron a partir de guías CDC, CDC DPDx y OMS, consultadas el 3 de octubre de 2026. Cada bloque cita sus fuentes y cada fotografía conserva registro, técnica, autor/institución, fecha disponible y condiciones de uso. La fecha de consulta no equivale a revisión clínica independiente.

Se añade un enlace de lectura al libro *Medical Microbiology*, 4.ª edición, NCBI Bookshelf, publicado en 1996. Se identifica como material histórico de fundamentos; no se copian sus figuras ni se usa como guía terapéutica actual.

El enfoque sigue siendo Guatemala. Las referencias internacionales no aportan incidencia nacional ni confirman brotes, disponibilidad de fármacos o protocolos MSPAS. Las dosis no se prescriben desde la síntesis. Los campos guardados y los estados de revisión permanecen intactos.

## Verificación

- TypeScript sin errores y compilación Vite satisfactoria.
- 100 pruebas pasan: catálogo, citas, aliases, imágenes exactas, ciclo Cyclospora, agrupación literal, búsqueda, conservación de registros, respaldos, importación documental y servicios LIVE existentes.
- En este entorno restringido se ejecutaron las mismas pruebas sobre una copia temporal compilada con TypeScript; se ajustaron imports ESM en esa copia. El comando normal del proyecto continúa siendo `pnpm test`.
- El build mantiene una advertencia de tamaño del paquete principal. Es una optimización pendiente, no una validación clínica.
- No se añadieron dependencias, claves, suscripciones ni servicios de pago. Los PDF personales no forman parte del código ni del paquete de entrega.

## Qué sigue pendiente

1. Ampliar las síntesis restantes y las fichas que solo provienen de documentos; revisar posibles atribuciones a grupos o especies.
2. Completar imágenes pertinentes hasta ocho cuando existan materiales reutilizables. Mantener el número real disponible cuando no haya suficiente material.
3. Transcribir u obtener OCR de las páginas sin texto extraíble, y revisar la información antes de convertirla en campos clínicos.
4. Incorporar más anatomía 3D documentada. Las formas educativas actuales siguen identificadas como esquemas; la estructura experimental disponible representa una proteína, no un microorganismo entero.
5. Completar series oficiales de Guatemala y revisión profesional del contenido; mantener país, periodo y método en referencias vecinas.
6. Continuar alertas, fuentes OMS/OPS/MSPAS, AMR Radar, Treatment Tracker y el mapa Guatemala a partir de evidencia revisada.

## Integración y publicación

El cambio se prepara sobre main 0.6.0 y se integra por pull request respetando las reglas de GitHub. El proyecto y sus servicios existentes se conservan. Para visualizarlo en una copia del repositorio actualiza main, instala con el lockfile existente y ejecuta los comandos documentados en el README.

Para publicar cuando esté terminado, consulta [PUBLICACION.md](PUBLICACION.md). El despliegue conectado a Cloudflare depende de su configuración: esta entrega no modifica esa conexión ni confirma una publicación externa. Una vista estática no ejecuta por sí sola el backend Express de PubMed.

Los documentos personales pertenecen al navegador donde se importaron. Cambiar de dominio no los traslada automáticamente: utiliza el respaldo verificado y conserva los PDF originales.
