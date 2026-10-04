# Ampliación académica 0.8.0

Consulta editorial: **3 de octubre de 2026**. Cada bloque conserva enlaces a sus fuentes. La fecha de consulta no significa que una guía se haya publicado ese día. Se mantiene pendiente la revisión clínica independiente.

## Qué se añadió

| Sección | Nuevas referencias |
| --- | --- |
| Bacterias | Klebsiella pneumoniae, Pseudomonas aeruginosa, Enterococcus faecalis |
| Virus | VIH-1, virus de hepatitis A, virus de hepatitis C |
| Hongos | Candida auris (Candidozyma auris), Pneumocystis jirovecii, Coccidioides immitis / C. posadasii |
| Parásitos | Cystoisospora belli, Balantioides coli, Echinococcus granulosus sensu lato |

También se completaron 23 referencias existentes que carecían de síntesis editorial. Las 63 entradas públicas ahora tienen bloques de identidad, manifestaciones, diagnóstico, principios de manejo, prevención y aplicación al estudio en Guatemala. Son 62 perfiles académicos: uno abarca las dos entradas de Trichophyton. Hay 412 bloques y 106 referencias bibliográficas clínicas y de laboratorio.

El contenido aparece en **Ver ficha → Ficha completa**. Se mantienen las fuentes por apartado, búsqueda, imágenes y el contenido literal de los documentos locales. Los datos personales conservan prioridad frente al catálogo público; esta ampliación no cambia su revisión ni entra automáticamente en sus respaldos.

## Imágenes y ciclos

La colección pasa de 274 a **355 imágenes distintas**, con **357 asociaciones**. Todas las referencias públicas tienen al menos una imagen. **21 entradas tienen ocho o más**; nueve aún tienen menos de cuatro. No se completa una cuota con dibujos generados, fotos sin licencia o fotografías de otro patógeno.

Los nuevos ciclos proceden de CDC DPDx. Se identifican los estadios infectivo y diagnóstico y se incluyen cuatro pasos explicativos. El conjunto tiene 25 ciclos para 24 fichas parasitarias; Taenia solium conserva dos ciclos diferentes.

Los registros PHIL conservan identificador, crédito, técnica, enlace, fecha de consulta y límites de interpretación. Las vistas de una serie no equivalen necesariamente a pacientes diferentes. Las imágenes de género o infección compartida se identifican como tales, sin atribuir una especie mediante la apariencia.

Para HCV se incluye la figura 1 de Rathi y colaboradores, *ACG Case Reports Journal* (2015), DOI **10.14309/crj.2015.74**, consultada en [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4508956/figure/F1/). Licencia **CC BY-NC-ND 4.0**: uso no comercial, atribución y sin modificaciones. Es histología de un caso histórico con HCV, no una imagen de partículas virales ni un hallazgo específico. Su tratamiento histórico no se usa como recomendación vigente. La figura 2, de hepatitis autoinmunitaria, se excluyó.

## Guatemala y pendientes

Las fuentes internacionales sirven para estudiar en Guatemala. No se convierten cifras extranjeras en cifras nacionales ni se asume disponibilidad local de medicamentos, pruebas o vacunas. Las referencias de países vecinos deben conservar país, periodo y alcance explícitos.

Falta ampliar galerías escasas; profundizar taxonomía, mecanismos de virulencia y diagnóstico diferencial con sus fuentes; efectuar revisión clínica independiente; y automatizar la incorporación verificable de boletines MSPAS/OPS/OMS. El mapa existente no contiene una serie actual confirmada de casos por departamento. PubMed es literatura científica, no vigilancia nacional en tiempo real.

## Integración y verificación

No se añadieron dependencias, servicios de pago ni nuevas credenciales. Se conserva el despliegue Cloudflare y el backend seguro de PubMed. El laboratorio muestra muestras reales y práctica; el visor 3D no aparece en la interfaz.

Las pruebas comprueban cobertura por apartado, fuentes, nombres y alias únicos, las cuatro categorías, imágenes documentadas, ciclos nuevos y conservación de registros y respaldos. En este entorno se compiló una copia temporal con TypeScript y se ejecutaron las mismas pruebas con Node: **108 aprobadas**. El build con Vite terminó; conserva una advertencia por tamaño del paquete principal.

En GitHub, integrar la actualización en main activa la vista previa de Cloudflare configurada. En Replit, importar o actualizar el repositorio y conservar el almacenamiento local y los respaldos. Los PDF locales de otro navegador/origen no se transfieren automáticamente a la vista publicada.
