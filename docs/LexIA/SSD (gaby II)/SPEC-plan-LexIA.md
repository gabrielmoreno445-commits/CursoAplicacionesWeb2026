# SPEC Plan — LexIA
> **Proyecto:** LexIA — Gestor inteligente de documentos legales con IA
> **Cubre:** Fases 1, 2 y 3
> **Fecha:** Mayo 2026

---

## Resumen de fases

| Fase | Nombre | Prerequisito | Entregable |
|---|---|---|---|
| 1 | Infraestructura + Auth + Gestión documental | — | App funcional: login, subida y listado de documentos |
| 2 | Análisis IA + Chat | Fase 1 validada al 100% | Reporte de IA + chat conversacional por documento |
| 3 | Productividad + Alertas + Colaboración + Planes | Fase 2 validada al 100% | Alertas, exportación, comparación, admin, planes |

---

## Fase 1 — Infraestructura + Auth + Gestión documental

### Semana 1 — Infraestructura y base de datos

| # | Tarea | Capa | Descripción |
|---|---|---|---|
| 01 | Estructura de carpetas | infra | Crear toda la estructura del proyecto según el spec técnico |
| 02 | `docker-compose.yml` | infra | Servicios: backend, postgres, frontend |
| 03 | `database/schema.sql` | DB | Tablas `usuarios` y `documentos` |
| 04 | `backend/src/db/connection.ts` | BE | Pool de conexión a PostgreSQL con `pg` |
| 05 | `POST /auth/register` y `POST /auth/login` | BE | bcrypt para hash de contraseña + JWT en respuesta |
| 06 | `GET /auth/me` + `authMiddleware.ts` | BE | Extrae `usuario_id` del JWT; protege rutas |
| 07 | `uploadMiddleware.ts` | BE | Multer: valida tipo (PDF, DOCX) y límite 10 MB; nombre UUID en disco |
| 08 | `POST /documentos` | BE | Recibe archivo + metadatos, guarda en volumen y en DB |
| 09 | `GET /documentos`, `GET /documentos/:id`, `DELETE /documentos/:id` | BE | Listado con `?tipo=`, detalle y borrado con limpieza del archivo en disco |

### Semana 2 — Frontend

| # | Tarea | Capa | Descripción |
|---|---|---|---|
| 10 | Setup Vue 3 + TypeScript + Vite + Vue Router + Pinia | FE | Scaffolding del proyecto frontend |
| 11 | Sistema de diseño CSS | FE | Variables de color, tipografía, espaciado (sin librerías externas) |
| 12 | `authStore.ts` | FE | Pinia: login, logout, restaurar sesión desde `localStorage` con clave `lexia_token` |
| 13 | Guardia de rutas | FE | Vue Router redirige a `/login` si no hay token válido |
| 14 | `LoginPage.vue` y `RegisterPage.vue` | FE | Formularios con llamadas a `auth.ts` |
| 15 | `DashboardPage.vue` + `DocumentCard.vue` | FE | Listado de documentos con filtro por tipo |
| 16 | `SubirDocumentoPage.vue` + `UploadZone.vue` | FE | Drag & drop + campos de metadatos (tipo, descripción) |
| 17 | `DocumentoDetallePage.vue` | FE | Metadatos del documento + botón "Analizar con IA" visible pero deshabilitado con tooltip "Disponible próximamente" |

---

## Fase 2 — Análisis IA + Chat

### Semana 1 — Backend módulo IA

| # | Tarea | Capa | Descripción |
|---|---|---|---|
| 01 | Tablas `analisis_documentos` y `mensajes_chat` | DB | Agregar al `schema.sql` |
| 02 | `extractorTexto.ts` | BE | Extrae texto de PDF con `pdf-parse` y de DOCX con `mammoth` según `mime_type` |
| 03 | `claudeService.ts` — análisis | BE | Función `analizarDocumento(texto)`: llama a Claude API con prompt estructurado y parsea JSON |
| 04 | `claudeService.ts` — chat | BE | Función `chatConDocumento(historial, textoDoc, pregunta)` |
| 05 | `POST /analisis/:documentoId` | BE | Orquesta: verificar pertenencia → extraer texto → IA → guardar en DB → retornar análisis |
| 06 | `GET /analisis/:documentoId` | BE | Devuelve análisis existente |
| 07 | `POST /analisis/:documentoId/chat` | BE | Recupera historial, envía a IA, guarda y devuelve respuesta |
| 08 | `GET /analisis/:documentoId/chat` | BE | Devuelve historial ordenado por `created_at ASC` |

### Semana 2 — Frontend módulo IA

| # | Tarea | Capa | Descripción |
|---|---|---|---|
| 09 | `analisis.ts` en `api/` | FE | Funciones fetch para los 4 endpoints del módulo IA |
| 10 | `RiesgoBadge.vue` | FE | Badge con color según nivel (verde / amarillo / rojo) |
| 11 | `AnalisisReporte.vue` | FE | Muestra resumen, badge de riesgo, listas de puntos_riesgo y puntos_ventaja |
| 12 | `ChatMensaje.vue` | FE | Burbuja con estilo diferenciado usuario / asistente |
| 13 | `useChat.ts` composable | FE | Maneja estado del historial, input del chat y estado de carga |
| 14 | `DocumentoDetallePage.vue` — activación | FE | Activar botón IA; integrar `AnalisisReporte.vue` y panel de chat según estado del documento |
| 15 | Estados de carga | FE | Spinner durante análisis + indicador "escribiendo…" en el chat |

### Semana 3 — Polish y ajustes

| # | Tarea | Capa | Descripción |
|---|---|---|---|
| 16 | Dark mode toggle | FE | `useTheme.ts` composable con persistencia en `localStorage` |
| 17 | Manejo de errores IA | BE + FE | Timeout de IA, documento sin texto extraíble, API key inválida |
| 18 | Validación re-análisis | BE + FE | Bloquear si ya existe análisis; mostrar fecha del análisis anterior |
| 19 | Responsive mobile | FE | Panel de detalle y chat adaptados a pantallas pequeñas |
| 20 | Animaciones `AnalisisReporte.vue` | FE | Fade-in por sección al cargar el reporte |

---

## Fase 3 — Productividad + Alertas + Colaboración + Planes

### Semana 1 — Base de datos y backend: planes + admin

| # | Tarea | Capa | Descripción |
|---|---|---|---|
| 01 | Campos `rol` y `activo` en `usuarios` | DB | Migración de la tabla existente |
| 02 | Tabla `planes_usuario` + seed inicial | DB | Todos los usuarios actuales pasan a plan free |
| 03 | `adminMiddleware.ts` | BE | Verifica `rol === 'admin'` en el JWT |
| 04 | `GET /admin/metricas` | BE | Totales: usuarios, documentos analizados, distribución de planes |
| 05 | `GET /admin/usuarios` con paginación y filtros | BE | Listado con búsqueda por email y filtro por plan |
| 06 | `PUT /admin/usuarios/:id/plan` y `PUT /admin/usuarios/:id/activo` | BE | Cambiar plan y activar/desactivar cuenta |
| 07 | Middleware de límite de plan | BE | Verifica contadores en `planes_usuario` antes de `POST /documentos` y `POST /analisis/:id`; devuelve `403` si se alcanzó el límite |

### Semana 2 — Backend: alertas, OCR y exportar PDF

| # | Tarea | Capa | Descripción |
|---|---|---|---|
| 08 | Tabla `alertas_vencimiento` | DB | Agregar al `schema.sql` |
| 09 | Prompt de análisis actualizado | BE | Agregar instrucción de extracción de `fechas_clave` a `claudeService.ts` |
| 10 | Guardar alertas en `POST /analisis/:documentoId` | BE | Parsear `fechas_clave` del JSON IA y crear filas en `alertas_vencimiento` |
| 11 | Endpoints `GET /alertas`, `POST /alertas`, `PUT /alertas/:id/vista`, `DELETE /alertas/:id` | BE | CRUD de alertas del usuario |
| 12 | `emailService.ts` | BE | Nodemailer con configuración SMTP por variables de entorno |
| 13 | `verificadorAlertas.ts` | BE | Cron job diario (09:00): verifica alertas próximas y envía emails no duplicados |
| 14 | `ocrService.ts` + integración en `POST /documentos` | BE | Tesseract.js para imágenes PNG/JPEG; experiencia transparente para el usuario |
| 15 | `pdfExportService.ts` + `GET /analisis/:documentoId/exportar-pdf` | BE | Puppeteer genera PDF desde el HTML del reporte |

### Semana 3 — Backend: compartir + comparación

| # | Tarea | Capa | Descripción |
|---|---|---|---|
| 16 | Tablas `reportes_compartidos` y `comparaciones` | DB | Agregar al `schema.sql` |
| 17 | `POST /analisis/:documentoId/compartir` y `GET /compartido/:token` | BE | Genera token UUID + endpoint público sin auth (solo expone reporte) |
| 18 | Prompt de comparación en `claudeService.ts` | BE | JSON estructurado con diferencias, favorabilidad y recomendación |
| 19 | `POST /comparacion` y `GET /comparacion/:id` | BE | Requiere ambos documentos analizados; devuelve `400` si alguno no lo está |

### Semana 4 — Frontend

| # | Tarea | Capa | Descripción |
|---|---|---|---|
| 20 | `AlertasPage.vue` + `AlertaBadge.vue` | FE | Listado con estado y días restantes; badge de color por urgencia |
| 21 | Sección "Próximas alertas" en `DashboardPage.vue` | FE | Los 3 vencimientos más cercanos |
| 22 | Badge de alertas no leídas en `NavBar.vue` | FE | Contador actualizado desde el store |
| 23 | Botón "Exportar PDF" en `DocumentoDetallePage.vue` | FE | Descarga directa del PDF generado por el servidor |
| 24 | Botón "Compartir reporte" + modal con enlace copiable | FE | Genera enlace y lo copia al portapapeles |
| 25 | Vista pública `/compartido/:token` | FE | Sin layout de auth; maneja estado de enlace vencido |
| 26 | `ComparacionPage.vue` + `ComparacionDiff.vue` | FE | Selector de dos documentos + tabla diferencial con colores por impacto |
| 27 | `AdminDashboardPage.vue` y `AdminUsuariosPage.vue` | FE | Panel de administración con métricas y gestión de usuarios |
| 28 | Guardia de ruta `/admin` | FE | Vue Router verifica rol `admin`; redirige al dashboard si no autorizado |
| 29 | `PlanBadge.vue` en `NavBar` | FE | Muestra el plan actual del usuario (Free / Premium) |

---

## Convenciones de tareas

- `DB` — cambios en `database/schema.sql` o migraciones
- `BE` — backend Node.js / Express
- `FE` — frontend Vue 3
- `infra` — Docker, estructura de proyecto, configuración de entorno

## Criterios de validación por fase

**Fase 1 completa cuando:**
- Un usuario puede registrarse, iniciar sesión y cerrar sesión.
- Un usuario puede subir, listar, ver y eliminar documentos.
- El sistema rechaza archivos de tipo o tamaño inválido.
- Las rutas protegidas redirigen al login sin token.

**Fase 2 completa cuando:**
- El botón "Analizar con IA" genera un reporte estructurado correctamente.
- El reporte se persiste y se recupera sin volver a llamar a la IA.
- El usuario puede hacer preguntas en el chat y obtener respuestas contextuales.
- El historial del chat se conserva entre visitas.
- Los errores de la IA (timeout, JSON inválido) se manejan con mensajes claros.

**Fase 3 completa cuando:**
- Las alertas se crean automáticamente al analizar un documento con fechas detectadas.
- El cron job envía emails sin duplicados en los umbrales configurados.
- Un documento PNG/JPEG es analizable como si fuera un PDF.
- El reporte se exporta como PDF descargable.
- El enlace compartido expira correctamente y es accesible sin autenticación.
- La comparación de dos documentos genera una tabla diferencial completa.
- El panel admin permite cambiar planes y desactivar cuentas.
- Los límites del plan free bloquean en el backend con mensajes descriptivos.
