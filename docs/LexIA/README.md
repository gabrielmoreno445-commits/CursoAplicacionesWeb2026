# LexIA

Documentacion tecnica y funcional del proyecto **LexIA**.

Este directorio agrupa la planificacion de las tres fases del sistema, con el objetivo de dejar registro ordenado del alcance, la arquitectura prevista, la base de datos, las API y las decisiones tecnicas definidas en cada etapa.

## Proposito

LexIA es un gestor inteligente de documentos legales con IA. La documentacion reunida aqui describe su evolucion desde el gestor documental inicial hasta las fases de analisis automatizado, chat sobre el documento, alertas, comparacion, exportacion de reportes y administracion.

## Alcance de la documentacion

- Definicion funcional por fases.
- Stack tecnologico previsto.
- Estructura de carpetas del proyecto.
- Modelo de datos y tablas asociadas.
- Endpoints REST previstos para backend y frontend.
- Tareas y decisiones tecnicas relevantes.

## Documentos

- `SDD (gaby)/SPEC-fase1-LexIA.md`: infraestructura base, autenticacion y gestion documental.
- `SDD (gaby)/SPEC-fase2-LexIA.md`: analisis con IA y chat sobre documentos.
- `SDD (gaby)/SPEC-fase3-LexIA.md`: alertas, comparacion, exportacion PDF, comparticion y panel de administracion.

## Stack resumido

- Frontend: Vue 3 SPA con TypeScript, Vue Router y Pinia.
- Backend: Node.js con Express.js y TypeScript.
- Base de datos: PostgreSQL 15.
- Almacenamiento: volumen Docker local para archivos subidos.
- Subida de archivos: Multer.
- Extraccion de texto: `pdf-parse` y `mammoth`.
- IA: Claude API de Anthropic.
- Entorno de desarrollo: Docker Compose.

## Observacion

Este indice solo resume el contenido ya definido en los `SPECs` y debe actualizarse si se incorpora nueva documentacion tecnica.
