# SPEC — Fase 3: LexIA

> **Proyecto:** LexIA — Gestor inteligente de documentos legales con IA
> **Fase:** 3 — Productividad avanzada + Alertas + Colaboración + Planes
> **Fecha:** Mayo 2026
> **Estado:** En planificación — iniciar cuando Fase 2 esté validada al 100%

---

## 1. Descripción de la fase

Las Fases 1 y 2 entregaron una aplicación funcional de punta a punta: el usuario
puede subir documentos legales, analizarlos con IA y chatear con ellos en lenguaje natural.

La Fase 3 convierte LexIA en un producto completo y sostenible, atacando tres frentes:

**Frente 1 — Productividad avanzada**
Herramientas que potencian el trabajo con los documentos ya analizados: exportar el
reporte de análisis como PDF descargable, comparar dos documentos entre sí para
detectar diferencias relevantes, y soporte OCR para documentos escaneados o fotografiados
que hasta ahora no podían procesarse.

**Frente 2 — Alertas y notificaciones**
El sistema detecta fechas de vencimiento mencionadas en los documentos durante el
análisis IA y las registra como alertas. El usuario recibe notificaciones por email
con anticipación configurable (30, 15 y 7 días antes del vencimiento).

**Frente 3 — Colaboración y modelo de negocio**
El usuario puede compartir el reporte de análisis de un documento con terceros
mediante un enlace público con expiración. Se introduce el sistema de roles y
planes (free / premium) con límites de uso diferenciados, y un panel de
administración para que el equipo de LexIA gestione usuarios y planes.

---

## 2. Stack tecnológico

| Capa | Tecnología | Novedad en Fase 3 |
|---|---|---|
| Panel de usuario | Vue 3 SPA + TypeScript | Sin cambios de stack |
| Panel de administración | Vue 3 SPA + TypeScript (ruta `/admin`) | **Nuevo** |
| Backend | Node.js + Express + TypeScript | Se agregan servicios de OCR, PDF, email y jobs |
| Base de datos | PostgreSQL 15 | Se agregan 4 tablas nuevas |
| Almacenamiento de archivos | Volumen Docker local | Sin cambios |
| OCR | **Tesseract.js** — librería Node, sin dependencias externas | **Nuevo** |
| Exportar PDF | **Puppeteer** — genera PDF desde HTML renderizado | **Nuevo** |
| Notificaciones email | **Nodemailer** — SMTP con Gmail o servicio configurable | **Nuevo** |
| Jobs programados | **node-cron** — corre el verificador de alertas diariamente | **Nuevo** |
| IA | Claude API (Anthropic) | Sin cambios |
| Entorno | Docker Compose | Sin cambios |

> **¿Por qué Tesseract.js para OCR?**
> Corre directamente en Node sin servicios externos. Para un MVP es suficiente.
> Si en el futuro se necesita mayor precisión en documentos complejos, se puede
> reemplazar por Google Vision API o AWS Textract sin cambiar la interfaz del servicio.

> **¿Por qué Puppeteer para el PDF?**
> El reporte de análisis ya está renderizado en HTML con estilos propios.
> Puppeteer abre esa vista en un Chromium headless y la exporta como PDF fiel
> al diseño, sin necesidad de re-construir el layout con una librería de PDF.

---

## 3. Estructura de carpetas

Solo se agregan carpetas y archivos nuevos. La estructura existente no se toca.

```
LexIA/
├── frontend/
│   └── src/
│       ├── ArchivosTS/
│       │   └── api/
│       │       ├── auth.ts               ← ya existe
│       │       ├── documentos.ts         ← ya existe
│       │       ├── analisis.ts           ← ya existe
│       │       ├── alertas.ts            ← nuevo
│       │       └── admin.ts              ← nuevo
│       └── ArchivosVue/
│           ├── components/
│           │   ├── NavBar.vue            ← ya existe (se agrega link a Alertas)
│           │   ├── DocumentCard.vue      ← ya existe
│           │   ├── UploadZone.vue        ← ya existe
│           │   ├── AnalisisReporte.vue   ← ya existe
│           │   ├── RiesgoBadge.vue       ← ya existe
│           │   ├── ChatMensaje.vue       ← ya existe
│           │   ├── AlertaBadge.vue       ← nuevo: badge "Vence en X días"
│           │   ├── PlanBadge.vue         ← nuevo: badge Free / Premium
│           │   └── ComparacionDiff.vue   ← nuevo: visualización de diferencias entre documentos
│           ├── composables/
│           │   ├── useAuth.ts            ← ya existe
│           │   ├── useChat.ts            ← ya existe
│           │   └── useTheme.ts           ← ya existe
│           └── pages/
│               ├── LoginPage.vue             ← ya existe
│               ├── RegisterPage.vue          ← ya existe
│               ├── DashboardPage.vue         ← modificada: se agrega panel de alertas próximas
│               ├── SubirDocumentoPage.vue    ← ya existe
│               ├── DocumentoDetallePage.vue  ← modificada: botón exportar PDF + botón comparar
│               ├── AlertasPage.vue           ← nuevo: listado de alertas de vencimiento
│               ├── ComparacionPage.vue       ← nuevo: seleccionar dos docs y ver diferencias
│               └── admin/                   ← nuevo: sección admin (solo rol admin)
│                   ├── AdminDashboardPage.vue
│                   └── AdminUsuariosPage.vue
│
├── backend/
│   └── src/
│       ├── routes/
│       │   ├── auth.ts           ← ya existe
│       │   ├── documentos.ts     ← ya existe
│       │   ├── analisis.ts       ← ya existe
│       │   ├── alertas.ts        ← nuevo
│       │   ├── comparacion.ts    ← nuevo
│       │   └── admin.ts          ← nuevo
│       ├── services/
│       │   ├── extractorTexto.ts ← ya existe (se agrega rama OCR)
│       │   ├── claudeService.ts  ← ya existe (se agrega prompt de comparación)
│       │   ├── ocrService.ts     ← nuevo: procesa imágenes con Tesseract.js
│       │   ├── pdfExportService.ts ← nuevo: genera PDF con Puppeteer
│       │   └── emailService.ts   ← nuevo: envía emails con Nodemailer
│       ├── jobs/
│       │   └── verificadorAlertas.ts ← nuevo: cron job diario de vencimientos
│       └── middleware/
│           ├── authMiddleware.ts    ← ya existe
│           ├── uploadMiddleware.ts  ← ya existe (se agrega soporte a image/png, image/jpeg)
│           └── adminMiddleware.ts   ← nuevo: verifica rol 'admin' en el JWT
│
└── database/
    └── schema.sql               ← se agregan 4 tablas al final
```

---

## 4. Pantallas nuevas o modificadas

### Panel de usuario — nuevas
| # | Componente | Ruta Vue | Descripción |
|---|---|---|---|
| 1 | `AlertasPage.vue` | `/alertas` | Listado de todas las alertas de vencimiento del usuario, con estado (pendiente / vista / vencida) |
| 2 | `ComparacionPage.vue` | `/comparar` | Selector de dos documentos + visualización de diferencias detectadas por IA |

### Panel de usuario — modificadas
| # | Componente | Qué cambia |
|---|---|---|
| 3 | `DashboardPage.vue` | Se agrega sección "Próximas alertas" con los 3 vencimientos más cercanos |
| 4 | `DocumentoDetallePage.vue` | Se agregan botones: "Exportar PDF" y "Comparar con otro documento" |
| 5 | `NavBar.vue` | Se agrega link a Alertas con badge de cantidad no leídas |

### Panel de administración — nuevas (ruta `/admin`)
| # | Componente | Ruta Vue | Descripción |
|---|---|---|---|
| 6 | `AdminDashboardPage.vue` | `/admin` | Métricas globales: total usuarios, documentos analizados, distribución free/premium |
| 7 | `AdminUsuariosPage.vue` | `/admin/usuarios` | Listado de usuarios con búsqueda, filtro por plan y acciones: cambiar plan, desactivar cuenta |

> El panel `/admin` es una sección protegida por `adminMiddleware.ts`.
> Solo accesible para usuarios con `rol = 'admin'`. Si un usuario sin ese rol
> intenta acceder, Vue Router lo redirige al Dashboard normal.

---

## 5. Base de datos

### Modelo completo — Fase 3
```
usuarios            1──N  documentos
usuarios            1──1  planes_usuario         ← nuevo
documentos          1──1  analisis_documentos
analisis_documentos 1──N  mensajes_chat
analisis_documentos 1──N  alertas_vencimiento    ← nuevo
analisis_documentos 1──N  reportes_compartidos   ← nuevo
documentos          N──N  comparaciones           ← nuevo (tabla pivote)
```

### Modificaciones a tablas existentes

#### `usuarios` — campos nuevos
| Campo | Tipo | Notas |
|---|---|---|
| rol | VARCHAR(20) | 'user' (default) o 'admin' |
| activo | BOOLEAN | DEFAULT true — permite desactivar cuentas desde el panel admin |

### Tablas nuevas

#### `planes_usuario`
| Campo | Tipo | Notas |
|---|---|---|
| id | SERIAL PK | |
| usuario_id | INT FK UNIQUE | → usuarios.id |
| plan | VARCHAR(20) | 'free' o 'premium' |
| documentos_mes_limite | INT | free: 3 / premium: ilimitado (-1) |
| analisis_mes_limite | INT | free: 3 / premium: ilimitado (-1) |
| documentos_mes_usados | INT | se resetea el 1° de cada mes |
| analisis_mes_usados | INT | se resetea el 1° de cada mes |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

> Los límites del plan free se verifican en el backend antes de permitir subir
> un documento o disparar un análisis. Si el usuario alcanzó el límite, el
> endpoint devuelve `403` con mensaje descriptivo en español.

#### `alertas_vencimiento`
| Campo | Tipo | Notas |
|---|---|---|
| id | SERIAL PK | |
| analisis_id | INT FK | → analisis_documentos.id |
| usuario_id | INT FK | → usuarios.id |
| descripcion | TEXT | descripción de la fecha detectada por IA. Ej: "Vencimiento del contrato" |
| fecha_vencimiento | DATE | fecha extraída del documento por la IA |
| dias_anticipacion | INT[] | días de anticipación para notificar. Default: [30, 15, 7] |
| notificaciones_enviadas | INT[] | días en los que ya se envió email. Ej: [30, 15] |
| vista | BOOLEAN | DEFAULT false — el usuario marcó la alerta como vista |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

> La IA extrae fechas de vencimiento durante el análisis del documento (Fase 2
> modificada) y las registra en esta tabla automáticamente. El usuario puede
> además crear alertas manualmente desde `AlertasPage.vue`.

#### `reportes_compartidos`
| Campo | Tipo | Notas |
|---|---|---|
| id | SERIAL PK | |
| analisis_id | INT FK | → analisis_documentos.id |
| token_publico | VARCHAR(64) | UUID generado al compartir — forma la URL pública |
| expira_at | TIMESTAMPTZ | fecha de expiración del enlace (default: 7 días) |
| vistas | INT | contador de visualizaciones del enlace |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

> La URL pública tiene la forma `/compartido/:token_publico` y es accesible
> sin autenticación, pero solo muestra el reporte de análisis (sin el chat ni
> el archivo original). Al expirar, devuelve una pantalla de "enlace vencido".

#### `comparaciones`
| Campo | Tipo | Notas |
|---|---|---|
| id | SERIAL PK | |
| usuario_id | INT FK | → usuarios.id |
| documento_a_id | INT FK | → documentos.id |
| documento_b_id | INT FK | → documentos.id |
| resultado | JSONB | análisis comparativo estructurado generado por IA |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

---

## 6. API REST — nuevos endpoints

### Alertas de vencimiento
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/alertas` | Listar todas las alertas del usuario | Sí |
| POST | `/alertas` | Crear alerta manualmente para un documento | Sí |
| PUT | `/alertas/:id/vista` | Marcar alerta como vista | Sí |
| DELETE | `/alertas/:id` | Eliminar una alerta | Sí |

### Exportar PDF
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/analisis/:documentoId/exportar-pdf` | Genera y descarga el reporte como PDF | Sí |

### Compartir reporte
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/analisis/:documentoId/compartir` | Genera enlace público con expiración | Sí |
| GET | `/compartido/:token` | Obtiene reporte público (sin auth) | No |

### Comparación de documentos
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/comparacion` | Compara dos documentos con IA y guarda resultado | Sí |
| GET | `/comparacion/:id` | Obtiene comparación ya guardada | Sí |

### OCR
> No es un endpoint independiente. Se integra dentro de `POST /documentos`:
> si el archivo subido es una imagen (`image/png`, `image/jpeg`), el backend
> corre `ocrService.ts` para extraer el texto antes de guardar en DB.
> Para el usuario, la experiencia es idéntica a subir un PDF.

### Panel de administración
| Método | Ruta | Descripción | Auth (admin) |
|---|---|---|---|
| GET | `/admin/metricas` | Total usuarios, documentos, análisis por mes | Sí |
| GET | `/admin/usuarios` | Listado paginado con filtros | Sí |
| PUT | `/admin/usuarios/:id/plan` | Cambiar plan de un usuario | Sí |
| PUT | `/admin/usuarios/:id/activo` | Activar o desactivar una cuenta | Sí |

### Modificación de endpoint existente
| Método | Ruta | Qué cambia |
|---|---|---|
| POST | `/analisis/:documentoId` | Al generar el análisis, también extrae fechas de vencimiento y las guarda en `alertas_vencimiento` |
| POST | `/documentos` | Verifica límite del plan antes de aceptar el archivo |

---

## 7. Lógica de alertas y notificaciones

### Flujo de detección automática de vencimientos

Al correr `POST /analisis/:documentoId`, `claudeService.ts` recibe una instrucción adicional en el prompt para detectar fechas de vencimiento:

```
Además del análisis principal, identificá todas las fechas de vencimiento,
renovación o plazo relevantes que aparezcan en el documento.
Incluí en el JSON de respuesta un campo adicional:

"fechas_clave": [
  { "descripcion": "Vencimiento del contrato", "fecha": "2027-03-15" },
  { "descripcion": "Opción de renovación", "fecha": "2027-01-15" }
]
```

El backend parsea ese campo y guarda cada fecha como una fila en `alertas_vencimiento`.

### Cron job diario — `verificadorAlertas.ts`

Corre todos los días a las 09:00 hs (configurable por variable de entorno).

```
Para cada alerta en alertas_vencimiento donde fecha_vencimiento >= HOY:
  Calcular días_restantes = fecha_vencimiento - HOY
  Para cada umbral en dias_anticipacion (ej: [30, 15, 7]):
    Si dias_restantes == umbral Y umbral no está en notificaciones_enviadas:
      emailService.ts → enviar email al usuario
      Actualizar notificaciones_enviadas agregando el umbral
```

### Variables de entorno para email

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=notificaciones@lexia.app
EMAIL_PASS=app_password
EMAIL_FROM="LexIA <notificaciones@lexia.app>"
```

---

## 8. Lógica de comparación de documentos con IA

El prompt de comparación en `claudeService.ts` recibe el texto extraído de ambos documentos y devuelve JSON estructurado:

```
Comparás dos documentos legales y respondés ÚNICAMENTE con JSON válido:

{
  "resumen_comparacion": "string — diferencias principales en lenguaje simple",
  "documento_mas_favorable": "A" | "B" | "equivalentes",
  "razon_favorabilidad": "string — por qué uno es más favorable al usuario",
  "diferencias": [
    {
      "categoria": "string — ej: 'Penalidades', 'Plazos', 'Obligaciones'",
      "documento_a": "string — cómo lo trata el documento A",
      "documento_b": "string — cómo lo trata el documento B",
      "impacto": "favorable_a" | "favorable_b" | "neutro"
    }
  ],
  "recomendacion": "string — conclusión y recomendación para el usuario"
}
```

El componente `ComparacionDiff.vue` renderiza este JSON como una tabla visual
con colores diferenciados según el campo `impacto` de cada fila.

---

## 9. Tareas — Sprint Fase 3

### Semana 1 — Base de datos y backend: planes + admin
- [ ] **01** Agregar campo `rol` y `activo` a tabla `usuarios` — `DB`
- [ ] **02** Crear tabla `planes_usuario` y seed inicial (todos los usuarios actuales → free) — `DB`
- [ ] **03** `adminMiddleware.ts` — verifica `rol === 'admin'` en el JWT — `BE`
- [ ] **04** Endpoints `GET/PUT /admin/usuarios` y `GET /admin/metricas` — `BE`
- [ ] **05** Middleware de límite de plan en `POST /documentos` y `POST /analisis/:id` — `BE`
- [ ] **06** Endpoint `PUT /admin/usuarios/:id/plan` y `PUT /admin/usuarios/:id/activo` — `BE`

### Semana 2 — Backend: alertas, OCR y exportar PDF
- [ ] **07** Crear tabla `alertas_vencimiento` en `schema.sql` — `DB`
- [ ] **08** Actualizar prompt de análisis en `claudeService.ts` para extraer `fechas_clave` — `BE`
- [ ] **09** Guardar alertas detectadas en `POST /analisis/:documentoId` — `BE`
- [ ] **10** Endpoints `GET/POST/PUT/DELETE /alertas` — `BE`
- [ ] **11** `emailService.ts` con Nodemailer — `BE`
- [ ] **12** `verificadorAlertas.ts` con node-cron — `BE`
- [ ] **13** `ocrService.ts` con Tesseract.js + integración en `POST /documentos` — `BE`
- [ ] **14** `pdfExportService.ts` con Puppeteer + endpoint `GET /analisis/:id/exportar-pdf` — `BE`

### Semana 3 — Backend: compartir + comparación
- [ ] **15** Crear tablas `reportes_compartidos` y `comparaciones` en `schema.sql` — `DB`
- [ ] **16** `POST /analisis/:documentoId/compartir` y `GET /compartido/:token` — `BE`
- [ ] **17** Prompt de comparación en `claudeService.ts` — `BE`
- [ ] **18** `POST /comparacion` y `GET /comparacion/:id` — `BE`

### Semana 4 — Frontend
- [ ] **19** `AlertasPage.vue` con listado y badge de días restantes (`AlertaBadge.vue`) — `FE`
- [ ] **20** Sección "Próximas alertas" en `DashboardPage.vue` — `FE`
- [ ] **21** Badge de alertas no leídas en `NavBar.vue` — `FE`
- [ ] **22** Botón "Exportar PDF" en `DocumentoDetallePage.vue` — `FE`
- [ ] **23** Botón "Compartir reporte" + modal con enlace copiable en `DocumentoDetallePage.vue` — `FE`
- [ ] **24** Vista pública `/compartido/:token` (sin layout de auth) — `FE`
- [ ] **25** `ComparacionPage.vue` con selector de dos documentos y `ComparacionDiff.vue` — `FE`
- [ ] **26** `AdminDashboardPage.vue` y `AdminUsuariosPage.vue` — `FE`
- [ ] **27** Guardia de ruta `/admin` en Vue Router para rol admin — `FE`
- [ ] **28** `PlanBadge.vue` en NavBar mostrando el plan actual del usuario — `FE`

---

## 10. Decisiones técnicas

- **Tesseract.js sobre servicio externo:** Corre en el mismo proceso Node sin APIs de pago. Suficiente para MVP con documentos escaneados de calidad razonable.
- **Puppeteer para PDF:** El reporte HTML ya tiene el diseño final; Puppeteer lo captura fielmente sin reescribir el layout. Se ejecuta en el servidor, el usuario descarga el archivo directamente.
- **node-cron dentro del proceso Express:** Para el MVP, correr el cron en el mismo proceso es suficiente. En Fase 4 se puede mover a un worker separado con BullMQ si la carga escala.
- **Límites del plan en el backend:** La verificación de límites siempre ocurre en el servidor, nunca solo en el frontend. El frontend puede mostrar advertencias visuales, pero el backend es la fuente de verdad.
- **Rol admin no es editable por el usuario:** El campo `rol` solo puede ser modificado directamente en la base de datos o por otro admin. No hay endpoint de "auto-promoción".
- **Comparaciones sin caché de texto:** La comparación usa `texto_extraido` ya guardado en `analisis_documentos`, por lo tanto ambos documentos deben haber sido analizados previamente. Si alguno no tiene análisis, el endpoint devuelve `400` con mensaje claro.
- **Enlace compartido sin autenticación:** La ruta `/compartido/:token` no requiere JWT y es accesible por cualquier persona con el enlace. Solo expone el reporte de análisis, nunca el archivo original ni el historial de chat.

---

## 11. Fuera de scope — Fase 3

- Re-análisis de un documento (eliminar análisis anterior y volver a correr)
- Streaming de respuestas del chat en tiempo real
- Historial de versiones de un documento
- Integración con Google Drive o Dropbox para importar documentos
- Análisis en idiomas distintos al español
- App mobile nativa
- Recordatorios por WhatsApp o SMS
- Pasarela de pagos para el plan premium (suscripción real)
- Multi-tenant (organizaciones con varios usuarios)
