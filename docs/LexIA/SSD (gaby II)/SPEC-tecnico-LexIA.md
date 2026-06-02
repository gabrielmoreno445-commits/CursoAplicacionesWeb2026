# SPEC Técnico — LexIA
> **Proyecto:** LexIA — Gestor inteligente de documentos legales con IA
> **Cubre:** Fases 1, 2 y 3
> **Fecha:** Mayo 2026

---

## 1. Stack tecnológico

| Capa | Tecnología | Desde |
|---|---|---|
| Frontend | Vue 3 SPA + TypeScript, Vue Router, Pinia, Vite | Fase 1 |
| Backend | Node.js + Express.js + TypeScript (`tsx` en dev, `tsc` en build) | Fase 1 |
| Base de datos | PostgreSQL 15 | Fase 1 |
| Almacenamiento de archivos | Volumen Docker local `/storage/uploads/` | Fase 1 |
| Subida de archivos | Multer (middleware Express) | Fase 1 |
| Autenticación | JWT en `localStorage` con clave `lexia_token` | Fase 1 |
| Extracción de texto | `pdf-parse` (PDF) + `mammoth` (DOCX) | Fase 2 (instalado en F1) |
| Motor de IA | Claude API — modelo `claude-opus-4-5` | Fase 2 |
| OCR | Tesseract.js | Fase 3 |
| Exportar PDF | Puppeteer (Chromium headless) | Fase 3 |
| Email | Nodemailer (SMTP configurable) | Fase 3 |
| Jobs programados | node-cron | Fase 3 |
| Entorno | Docker Compose | Fase 1 |

> **TypeScript full-stack:** Frontend con `*.ts` y componentes `.vue` con `<script setup lang="ts">`. Backend compilado con `tsc`; en desarrollo corre con `tsx`.
>
> **Por qué PostgreSQL:** El tipo nativo `JSONB` permite guardar los resultados estructurados de la IA (arrays de objetos) sin serialización manual. También facilita consultas sobre esos campos en fases futuras.
>
> **Por qué `claude-opus-4-5`:** Ventana de contexto amplia, adecuada para documentos legales extensos. El modelo se define en la variable de entorno `AI_MODEL` y puede cambiarse sin tocar código.
>
> **Por qué Tesseract.js:** Corre en el mismo proceso Node sin dependencias externas ni APIs de pago. Suficiente para un MVP con documentos escaneados de calidad razonable.
>
> **Por qué Puppeteer:** El reporte HTML ya tiene el diseño final; Puppeteer lo captura en Chromium headless sin necesidad de reconstruir el layout con otra librería de PDF.

---

## 2. Estructura de carpetas

```
LexIA/
├── frontend/
│   └── src/
│       ├── ArchivosTS/
│       │   ├── api/
│       │   │   ├── auth.ts              ← fetch de autenticación
│       │   │   ├── documentos.ts        ← fetch de documentos
│       │   │   ├── analisis.ts          ← fetch del módulo IA            [F2]
│       │   │   ├── alertas.ts           ← fetch de alertas               [F3]
│       │   │   └── admin.ts             ← fetch del panel admin          [F3]
│       │   └── utils/
│       │       └── formatters.ts        ← fechas, tamaños de archivo
│       └── ArchivosVue/
│           ├── components/
│           │   ├── NavBar.vue
│           │   ├── DocumentCard.vue
│           │   ├── UploadZone.vue       ← drag & drop
│           │   ├── AnalisisReporte.vue  ← reporte estructurado IA        [F2]
│           │   ├── RiesgoBadge.vue      ← badge Bajo/Medio/Alto          [F2]
│           │   ├── ChatMensaje.vue      ← burbuja individual de chat     [F2]
│           │   ├── AlertaBadge.vue      ← badge "Vence en X días"        [F3]
│           │   ├── PlanBadge.vue        ← badge Free / Premium           [F3]
│           │   └── ComparacionDiff.vue  ← tabla diferencial              [F3]
│           ├── composables/
│           │   ├── useAuth.ts
│           │   ├── useChat.ts           ← historial y estado del chat    [F2]
│           │   └── useTheme.ts          ← dark mode toggle               [F2/F3]
│           ├── pages/
│           │   ├── LoginPage.vue
│           │   ├── RegisterPage.vue
│           │   ├── DashboardPage.vue
│           │   ├── SubirDocumentoPage.vue
│           │   ├── DocumentoDetallePage.vue
│           │   ├── AlertasPage.vue                                       [F3]
│           │   ├── ComparacionPage.vue                                   [F3]
│           │   └── admin/
│           │       ├── AdminDashboardPage.vue                            [F3]
│           │       └── AdminUsuariosPage.vue                             [F3]
│           ├── router/
│           │   └── index.ts             ← rutas + guardia de auth (+ guardia admin en F3)
│           ├── stores/
│           │   └── authStore.ts         ← Pinia: usuario logueado
│           └── App.vue
│
├── backend/
│   └── src/
│       ├── routes/
│       │   ├── auth.ts
│       │   ├── documentos.ts
│       │   ├── analisis.ts                                               [F2]
│       │   ├── alertas.ts                                                [F3]
│       │   ├── comparacion.ts                                            [F3]
│       │   └── admin.ts                                                  [F3]
│       ├── services/
│       │   ├── extractorTexto.ts        ← PDF/DOCX/OCR                  [F2+F3]
│       │   ├── claudeService.ts         ← análisis, chat, comparación   [F2+F3]
│       │   ├── ocrService.ts            ← Tesseract.js                  [F3]
│       │   ├── pdfExportService.ts      ← Puppeteer                     [F3]
│       │   └── emailService.ts          ← Nodemailer                    [F3]
│       ├── jobs/
│       │   └── verificadorAlertas.ts    ← cron diario 09:00             [F3]
│       ├── middleware/
│       │   ├── authMiddleware.ts        ← verifica JWT
│       │   ├── uploadMiddleware.ts      ← Multer + validación tipo/tamaño
│       │   └── adminMiddleware.ts       ← verifica rol 'admin'          [F3]
│       ├── types/
│       │   └── index.ts                 ← interfaces y tipos del backend
│       ├── db/
│       │   └── connection.ts            ← pool de conexión PostgreSQL
│       └── index.ts                     ← entrada del servidor
│
├── storage/
│   └── uploads/                         ← archivos subidos (volumen Docker)
│
├── database/
│   └── schema.sql                       ← todas las tablas del proyecto
│
└── docker-compose.yml
```

---

## 3. Base de datos

### Modelo entidad-relación

```
usuarios       1──N  documentos
usuarios       1──1  planes_usuario              [F3]
documentos     1──1  analisis_documentos         [F2]
analisis_doc.  1──N  mensajes_chat               [F2]
analisis_doc.  1──N  alertas_vencimiento         [F3]
analisis_doc.  1──N  reportes_compartidos        [F3]
documentos     N──N  comparaciones (tabla pivot) [F3]
```

### Tabla: `usuarios`

| Campo | Tipo | Notas |
|---|---|---|
| id | SERIAL PK | |
| nombre | VARCHAR(100) | nombre visible |
| email | VARCHAR(150) | UNIQUE |
| password_hash | VARCHAR(255) | bcrypt |
| rol | VARCHAR(20) | `'user'` (default) / `'admin'` — agregado en F3 |
| activo | BOOLEAN | DEFAULT true — agregado en F3 |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

### Tabla: `documentos`

| Campo | Tipo | Notas |
|---|---|---|
| id | SERIAL PK | |
| usuario_id | INT FK | → usuarios.id |
| nombre_original | VARCHAR(255) | nombre tal como lo subió el usuario |
| nombre_archivo | VARCHAR(255) | nombre UUID en disco |
| tipo | VARCHAR(50) | contrato, poliza, acuerdo_servicio, laboral, alquiler, otro |
| descripcion | TEXT | opcional |
| mime_type | VARCHAR(100) | PDF, DOCX o imagen (F3) |
| tamanio_bytes | INT | |
| ruta_archivo | VARCHAR(500) | ruta relativa en el volumen |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

> `nombre_archivo` usa UUID para evitar colisiones y no exponer el nombre original en el sistema de archivos.

### Tabla: `analisis_documentos` [F2]

| Campo | Tipo | Notas |
|---|---|---|
| id | SERIAL PK | |
| documento_id | INT FK UNIQUE | → documentos.id (uno por documento) |
| resumen | TEXT | resumen ejecutivo |
| nivel_riesgo | VARCHAR(10) | 'bajo', 'medio', 'alto' |
| puntos_riesgo | JSONB | `[{ titulo, descripcion }]` |
| puntos_ventaja | JSONB | `[{ titulo, descripcion }]` |
| texto_extraido | TEXT | texto crudo del archivo (usado en el chat para evitar re-extracción) |
| tokens_usados | INT | para auditoría |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

### Tabla: `mensajes_chat` [F2]

| Campo | Tipo | Notas |
|---|---|---|
| id | SERIAL PK | |
| analisis_id | INT FK | → analisis_documentos.id |
| rol | VARCHAR(10) | 'user' / 'assistant' |
| contenido | TEXT | |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

> El historial se reconstruye ordenando por `created_at ASC`.

### Tabla: `planes_usuario` [F3]

| Campo | Tipo | Notas |
|---|---|---|
| id | SERIAL PK | |
| usuario_id | INT FK UNIQUE | → usuarios.id |
| plan | VARCHAR(20) | 'free' / 'premium' |
| documentos_mes_limite | INT | free: 3 / premium: -1 (ilimitado) |
| analisis_mes_limite | INT | free: 3 / premium: -1 (ilimitado) |
| documentos_mes_usados | INT | se resetea el 1° de cada mes |
| analisis_mes_usados | INT | se resetea el 1° de cada mes |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

### Tabla: `alertas_vencimiento` [F3]

| Campo | Tipo | Notas |
|---|---|---|
| id | SERIAL PK | |
| analisis_id | INT FK | → analisis_documentos.id |
| usuario_id | INT FK | → usuarios.id |
| descripcion | TEXT | texto de la fecha detectada |
| fecha_vencimiento | DATE | |
| dias_anticipacion | INT[] | default: [30, 15, 7] |
| notificaciones_enviadas | INT[] | días ya notificados |
| vista | BOOLEAN | DEFAULT false |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

### Tabla: `reportes_compartidos` [F3]

| Campo | Tipo | Notas |
|---|---|---|
| id | SERIAL PK | |
| analisis_id | INT FK | → analisis_documentos.id |
| token_publico | VARCHAR(64) | UUID — forma la URL pública |
| expira_at | TIMESTAMPTZ | default: NOW() + 7 días |
| vistas | INT | contador de accesos |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

### Tabla: `comparaciones` [F3]

| Campo | Tipo | Notas |
|---|---|---|
| id | SERIAL PK | |
| usuario_id | INT FK | → usuarios.id |
| documento_a_id | INT FK | → documentos.id |
| documento_b_id | INT FK | → documentos.id |
| resultado | JSONB | análisis comparativo estructurado |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

---

## 4. API REST — endpoints completos

### Autenticación

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/auth/register` | Registrar usuario | No |
| POST | `/auth/login` | Login → devuelve JWT | No |
| GET | `/auth/me` | Datos del usuario logueado | Sí |

### Documentos

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/documentos` | Listar documentos del usuario (`?tipo=`) | Sí |
| POST | `/documentos` | Subir documento (multipart/form-data) | Sí |
| GET | `/documentos/:id` | Ver metadatos de un documento | Sí |
| DELETE | `/documentos/:id` | Eliminar documento y archivo | Sí |

### Análisis IA [F2]

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/analisis/:documentoId` | Disparar análisis IA y guardar resultado | Sí |
| GET | `/analisis/:documentoId` | Obtener análisis guardado | Sí |
| POST | `/analisis/:documentoId/chat` | Enviar pregunta al chat | Sí |
| GET | `/analisis/:documentoId/chat` | Obtener historial de chat | Sí |

### Alertas [F3]

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/alertas` | Listar alertas del usuario | Sí |
| POST | `/alertas` | Crear alerta manual | Sí |
| PUT | `/alertas/:id/vista` | Marcar alerta como vista | Sí |
| DELETE | `/alertas/:id` | Eliminar alerta | Sí |

### Exportar y compartir [F3]

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/analisis/:documentoId/exportar-pdf` | Genera y descarga el reporte como PDF | Sí |
| POST | `/analisis/:documentoId/compartir` | Genera enlace público con expiración | Sí |
| GET | `/compartido/:token` | Obtiene reporte público | No |

### Comparación [F3]

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/comparacion` | Compara dos documentos con IA | Sí |
| GET | `/comparacion/:id` | Obtiene comparación guardada | Sí |

### Panel admin [F3]

| Método | Ruta | Descripción | Auth admin |
|---|---|---|---|
| GET | `/admin/metricas` | Totales y distribución por mes | Sí |
| GET | `/admin/usuarios` | Listado paginado con filtros | Sí |
| PUT | `/admin/usuarios/:id/plan` | Cambiar plan de un usuario | Sí |
| PUT | `/admin/usuarios/:id/activo` | Activar o desactivar cuenta | Sí |

### Endpoints modificados en F3

| Endpoint | Qué cambia |
|---|---|
| `POST /analisis/:documentoId` | Extrae `fechas_clave` del JSON de IA y crea alertas en `alertas_vencimiento` |
| `POST /documentos` | Verifica límite del plan antes de aceptar el archivo; soporta imágenes (OCR) |

### Formato de error estándar

```json
{ "error": "mensaje descriptivo en español" }
```

---

## 5. Integración con Claude API

### Variables de entorno

```env
CLAUDE_API_KEY=sk-ant-...
AI_MODEL=claude-opus-4-5
AI_MAX_TOKENS=4096
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=notificaciones@lexia.app
EMAIL_PASS=app_password
EMAIL_FROM="LexIA <notificaciones@lexia.app>"
```

### Prompt de análisis (`claudeService.ts`)

```
Sos un asistente legal experto en análisis de contratos y documentos legales.
Analizá el siguiente documento y respondé ÚNICAMENTE con un objeto JSON válido,
sin texto adicional antes ni después, con esta estructura exacta:

{
  "resumen": "string — resumen ejecutivo en lenguaje claro, máximo 3 párrafos",
  "nivel_riesgo": "bajo" | "medio" | "alto",
  "puntos_riesgo": [{ "titulo": "string", "descripcion": "string" }],
  "puntos_ventaja": [{ "titulo": "string", "descripcion": "string" }],
  "fechas_clave": [{ "descripcion": "string", "fecha": "YYYY-MM-DD" }]  ← agregado en F3
}

Criterios nivel_riesgo:
- "alto": cláusulas abusivas, penalidades desproporcionadas o restricción de derechos básicos
- "medio": cláusulas que requieren atención pero son habituales en el tipo de documento
- "bajo": documento estándar sin puntos que perjudiquen significativamente al usuario
```

### Prompt de chat (`claudeService.ts`)

```
Sos un asistente legal que ayuda al usuario a entender un documento legal específico.
Respondé las preguntas del usuario de forma clara, precisa y en lenguaje accesible.
Si la respuesta está en el documento, citá la cláusula o sección relevante.
Si la pregunta está fuera del alcance del documento, indicalo claramente.

[DOCUMENTO]
{texto_extraido}

[ANÁLISIS PREVIO]
{resumen_del_analisis}
```

### Prompt de comparación (`claudeService.ts`) [F3]

```
Comparás dos documentos legales y respondés ÚNICAMENTE con JSON válido:

{
  "resumen_comparacion": "string",
  "documento_mas_favorable": "A" | "B" | "equivalentes",
  "razon_favorabilidad": "string",
  "diferencias": [{
    "categoria": "string",
    "documento_a": "string",
    "documento_b": "string",
    "impacto": "favorable_a" | "favorable_b" | "neutro"
  }],
  "recomendacion": "string"
}
```

### Manejo de respuesta JSON

La respuesta de Claude se parsea con `JSON.parse()` dentro de un `try/catch`.
Si falla, el backend reintenta una vez con un prompt de corrección.
Si vuelve a fallar, devuelve error al frontend.

### Documentos extensos

Si el texto extraído supera la ventana de contexto, el backend divide el documento
en fragmentos solapados ("chunks"), los procesa secuencialmente y consolida las
respuestas antes de guardar el análisis final.

---

## 6. Decisiones técnicas clave

| Decisión | Justificación |
|---|---|
| `usuario_id` siempre desde el JWT | Nunca desde el body del request; evita acceso cruzado entre usuarios |
| `texto_extraido` guardado en DB | Evita re-extraer el archivo en cada mensaje del chat; mayor robustez ante borrados |
| Historial completo en cada request de chat | Alternativa simple a un sistema de memoria complejo; truncable en versiones futuras |
| Un análisis por documento (UNIQUE en `documento_id`) | Evita duplicados; el re-análisis queda fuera de scope por ahora |
| Sin streaming en F1 y F2 | Las respuestas se esperan completas; el streaming es mejora futura |
| Límites del plan solo en el backend | El frontend puede mostrar advertencias, pero el backend es la fuente de verdad |
| Rol `admin` no editable por el usuario | Solo modificable en DB o por otro admin; sin endpoint de auto-promoción |
| Comparación requiere análisis previo de ambos docs | Usa `texto_extraido` ya guardado; si alguno no está analizado, retorna `400` |
| Enlace compartido sin autenticación | Expone solo el reporte; nunca el archivo original ni el historial de chat |
| node-cron en el mismo proceso Express | Suficiente para MVP; migrable a BullMQ si escala |
| Sin librerías de UI externas | Todo el diseño con variables CSS propias |
