# SPEC — Fase 2: LexIA

> **Proyecto:** LexIA — Gestor inteligente de documentos legales con IA
> **Fase:** 2 — Integración IA: análisis de letra chica + chat con el documento
> **Fecha:** Mayo 2026
> **Estado:** En planificación — iniciar cuando Fase 1 esté validada al 100%

---

## 1. Descripción de la fase

La Fase 1 entregó un gestor documental funcional: el usuario puede subir sus documentos
legales, organizarlos y consultarlos desde su panel personal.

La Fase 2 convierte esa biblioteca estática en un asistente inteligente, atacando dos frentes:

**Frente 1 — Análisis automático del documento**
El usuario hace clic en "Analizar con IA" sobre cualquier documento ya subido. El sistema
extrae el texto del archivo, lo envía a la Claude API con un prompt especializado, y
devuelve un reporte estructurado con:
- Resumen ejecutivo del documento en lenguaje simple
- Puntos de riesgo o cláusulas desfavorables ("letra chica") detectados
- Ventajas, derechos o cláusulas aprovechables que el usuario puede ejercer
- Nivel de riesgo general del documento (Bajo / Medio / Alto)

**Frente 2 — Chat conversacional con el documento**
Una vez analizado, el usuario puede hacer preguntas en lenguaje natural sobre ese
documento específico. El historial de la conversación se mantiene por sesión,
permitiendo preguntas como: "¿Puedo rescindir sin penalidad?",
"¿Cuánto tiempo tengo para reclamar?", "¿Qué pasa si el otro no cumple?"

---

## 2. Stack tecnológico

| Capa | Tecnología | Novedad en Fase 2 |
|---|---|---|
| Panel de usuario | Vue 3 SPA + TypeScript | Sin cambios de stack |
| Backend | Node.js + Express + TypeScript | Se agrega Claude API + extracción de texto |
| Base de datos | PostgreSQL 15 | Se agregan 2 tablas nuevas |
| Almacenamiento de archivos | Volumen Docker local | Sin cambios |
| IA | **Claude API (Anthropic)** — modelo `claude-opus-4-5` | **Nuevo** |
| Extracción de texto | `pdf-parse` (PDF) + `mammoth` (DOCX) — ya instalados | **Se activan** |
| Entorno | Docker Compose | Sin cambios |

> **Nota sobre el modelo:** Se usa `claude-opus-4-5` por su gran ventana de contexto,
> ideal para documentos legales extensos. Si el profesor dispone de otro modelo
> en su licencia, se puede cambiar la constante `AI_MODEL` en el `.env` sin tocar el código.

> **Manejo de documentos extensos:** Si el texto extraído supera los límites del contexto,
> el backend divide el documento en fragmentos solapados ("chunks"), los procesa
> secuencialmente y consolida las respuestas antes de guardar el análisis final.

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
│       │       └── analisis.ts           ← nuevo: llamadas al módulo IA
│       └── ArchivosVue/
│           ├── components/
│           │   ├── NavBar.vue            ← ya existe
│           │   ├── DocumentCard.vue      ← ya existe
│           │   ├── UploadZone.vue        ← ya existe
│           │   ├── AnalisisReporte.vue   ← nuevo: muestra el reporte estructurado de IA
│           │   ├── RiesgoBadge.vue       ← nuevo: badge de nivel de riesgo (Bajo/Medio/Alto)
│           │   └── ChatMensaje.vue       ← nuevo: burbuja individual del chat
│           ├── composables/
│           │   ├── useAuth.ts            ← ya existe
│           │   └── useChat.ts            ← nuevo: lógica del chat con historial
│           └── pages/
│               ├── LoginPage.vue             ← ya existe
│               ├── RegisterPage.vue          ← ya existe
│               ├── DashboardPage.vue         ← ya existe
│               ├── SubirDocumentoPage.vue    ← ya existe
│               └── DocumentoDetallePage.vue  ← modificada: activa el botón IA + panel de análisis + chat
│
├── backend/
│   └── src/
│       ├── routes/
│       │   ├── auth.ts          ← ya existe
│       │   ├── documentos.ts    ← ya existe
│       │   └── analisis.ts      ← nuevo: endpoints del módulo IA
│       ├── services/            ← nueva carpeta: lógica de negocio separada de las rutas
│       │   ├── extractorTexto.ts ← extrae texto de PDF o DOCX según mime_type
│       │   └── claudeService.ts  ← llama a la Claude API (análisis + chat)
│       └── middleware/
│           ├── authMiddleware.ts    ← ya existe
│           └── uploadMiddleware.ts  ← ya existe
│
└── database/
    └── schema.sql               ← se agregan 2 tablas al final
```

---

## 4. Pantallas nuevas o modificadas

### Modificada — `DocumentoDetallePage.vue`

Esta es la pantalla central de Fase 2. Según el estado del documento, muestra:

**Estado A — Sin analizar aún**
- Metadatos del documento (igual que Fase 1)
- Botón "Analizar con IA" ahora **activo**
- Al hacer clic: muestra spinner con mensaje "Analizando documento..." mientras espera la respuesta

**Estado B — Análisis en proceso**
- Barra de progreso o spinner animado
- Mensaje: "La IA está leyendo tu documento, esto puede tomar unos segundos..."

**Estado C — Análisis completado**
- Componente `AnalisisReporte.vue` con el reporte completo
- Panel de chat debajo del reporte para preguntas adicionales

> El estado del análisis se determina consultando si existe un registro en
> `analisis_documentos` para ese `documento_id`. No requiere polling: el
> frontend espera la respuesta del endpoint (request síncrono con timeout extendido).

---

## 5. Base de datos

### Modelo completo — Fase 2
```
usuarios       1──N  documentos
documentos     1──1  analisis_documentos    ← nuevo
analisis_documentos  1──N  mensajes_chat    ← nuevo
```

### Tablas nuevas

#### `analisis_documentos`
| Campo | Tipo | Notas |
|---|---|---|
| id | SERIAL PK | |
| documento_id | INT FK UNIQUE | → documentos.id (uno por documento) |
| resumen | TEXT | resumen ejecutivo en lenguaje simple |
| nivel_riesgo | VARCHAR(10) | 'bajo', 'medio', 'alto' |
| puntos_riesgo | JSONB | array de objetos `{ titulo, descripcion }` |
| puntos_ventaja | JSONB | array de objetos `{ titulo, descripcion }` |
| texto_extraido | TEXT | texto crudo del documento (para usarlo en el chat) |
| tokens_usados | INT | total de tokens consumidos en el análisis (para auditoría) |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

> `puntos_riesgo` y `puntos_ventaja` se guardan como `JSONB` para mantener
> la estructura rica que devuelve la IA sin perder información. Ejemplo:
> ```json
> [
>   { "titulo": "Cláusula de renovación automática", "descripcion": "El contrato se renueva sin aviso previo por igual período." },
>   { "titulo": "Penalidad por rescisión anticipada", "descripcion": "Se cobra el equivalente a 2 meses de cuota." }
> ]
> ```

#### `mensajes_chat`
| Campo | Tipo | Notas |
|---|---|---|
| id | SERIAL PK | |
| analisis_id | INT FK | → analisis_documentos.id |
| rol | VARCHAR(10) | 'user' o 'assistant' |
| contenido | TEXT | texto del mensaje |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

> El historial se reconstruye ordenando por `created_at ASC` para un `analisis_id` dado.
> Se envía completo a la Claude API en cada nueva pregunta para mantener contexto conversacional.

---

## 6. API REST — nuevos endpoints

### Módulo IA
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/analisis/:documentoId` | Dispara el análisis IA del documento y guarda resultado | Sí |
| GET | `/analisis/:documentoId` | Obtiene el análisis ya guardado de un documento | Sí |
| POST | `/analisis/:documentoId/chat` | Envía una pregunta al chat del documento | Sí |
| GET | `/analisis/:documentoId/chat` | Obtiene el historial de mensajes del chat | Sí |

### Flujo de `POST /analisis/:documentoId`

```
1. Verificar que el documento pertenece al usuario autenticado
2. Verificar que no existe ya un análisis para ese documento
3. Leer el archivo desde el volumen (ruta_archivo)
4. extractorTexto.ts → extraer texto según mime_type (PDF o DOCX)
5. claudeService.ts → enviar texto a Claude API con prompt de análisis
6. Parsear respuesta JSON de Claude
7. Guardar resultado en tabla analisis_documentos
8. Retornar el análisis completo al frontend
```

### Respuesta de `POST /analisis/:documentoId` (ejemplo)
```json
{
  "id": 7,
  "documento_id": 3,
  "resumen": "Es un contrato de locación por 24 meses con renovación automática. El locatario tiene obligaciones de mantenimiento y restricciones para subarrendar.",
  "nivel_riesgo": "medio",
  "puntos_riesgo": [
    {
      "titulo": "Renovación automática sin aviso",
      "descripcion": "El contrato se renueva automáticamente si ninguna parte notifica con 60 días de anticipación."
    },
    {
      "titulo": "Penalidad por rescisión anticipada",
      "descripcion": "Si el locatario rescinde antes de los 12 meses, debe abonar 1,5 meses de alquiler."
    }
  ],
  "puntos_ventaja": [
    {
      "titulo": "Derecho de prórroga unilateral",
      "descripcion": "El locatario puede extender el contrato por 6 meses adicionales notificando con 30 días."
    }
  ],
  "created_at": "2026-05-27T10:15:00Z"
}
```

### Respuesta de `POST /analisis/:documentoId/chat` (ejemplo)
```json
{
  "rol": "assistant",
  "contenido": "Sí, podés rescindir sin penalidad una vez que superaste los primeros 12 meses de contrato. Antes de ese plazo, la cláusula 8.2 establece una penalidad equivalente a 1,5 meses de alquiler.",
  "created_at": "2026-05-27T10:22:00Z"
}
```

---

## 7. Integración con Claude API

### Prompt de análisis — estructura

El `claudeService.ts` construye el siguiente prompt del sistema para el análisis inicial:

```
Sos un asistente legal experto en análisis de contratos y documentos legales.
Analizá el siguiente documento y respondé ÚNICAMENTE con un objeto JSON válido,
sin texto adicional antes ni después, con esta estructura exacta:

{
  "resumen": "string — resumen ejecutivo en lenguaje claro y accesible, máximo 3 párrafos",
  "nivel_riesgo": "bajo" | "medio" | "alto",
  "puntos_riesgo": [
    { "titulo": "string", "descripcion": "string — explicación en lenguaje simple" }
  ],
  "puntos_ventaja": [
    { "titulo": "string", "descripcion": "string — explicación de cómo aprovechar este punto" }
  ]
}

Criterios:
- nivel_riesgo "alto": cláusulas abusivas, penalidades desproporcionadas o restricciones de derechos básicos
- nivel_riesgo "medio": cláusulas que requieren atención pero son habituales en el tipo de documento
- nivel_riesgo "bajo": documento estándar sin puntos que perjudiquen significativamente al usuario
- En puntos_ventaja incluí derechos ejercibles, opciones de rescisión, garantías a favor del usuario, etc.
- Usá siempre lenguaje simple, evitá tecnicismos sin explicación
```

### Prompt de chat — estructura

Para el chat, `claudeService.ts` usa el historial de `mensajes_chat` más el contexto del documento:

```
Sos un asistente legal que ayuda al usuario a entender un documento legal específico.
A continuación tenés el texto completo del documento y el análisis previo que realizaste.
Respondé las preguntas del usuario de forma clara, precisa y en lenguaje accesible.
Si la respuesta está en el documento, citá la cláusula o sección relevante.
Si la pregunta está fuera del alcance del documento, indicalo claramente.

[DOCUMENTO]
{texto_extraido}

[ANÁLISIS PREVIO]
{resumen_del_analisis}
```

### Variables de entorno requeridas

```env
CLAUDE_API_KEY=sk-ant-...
AI_MODEL=claude-opus-4-5
AI_MAX_TOKENS=4096
```

---

## 8. Tareas — Sprint Fase 2

### Semana 1 — Backend módulo IA
- [ ] **01** Agregar tablas `analisis_documentos` y `mensajes_chat` al `schema.sql` — `DB`
- [ ] **02** `extractorTexto.ts` — extrae texto de PDF con `pdf-parse` y de DOCX con `mammoth` — `BE`
- [ ] **03** `claudeService.ts` — función `analizarDocumento(texto)` que llama a Claude API y parsea el JSON — `BE`
- [ ] **04** `claudeService.ts` — función `chatConDocumento(historial, textoDoc, pregunta)` para el chat — `BE`
- [ ] **05** `POST /analisis/:documentoId` — orquesta la extracción + análisis IA + guardado en DB — `BE`
- [ ] **06** `GET /analisis/:documentoId` — devuelve análisis existente — `BE`
- [ ] **07** `POST /analisis/:documentoId/chat` — envía pregunta, actualiza historial, devuelve respuesta — `BE`
- [ ] **08** `GET /analisis/:documentoId/chat` — devuelve historial ordenado — `BE`

### Semana 2 — Frontend módulo IA
- [ ] **09** `analisis.ts` en `api/` — funciones fetch para todos los endpoints del módulo IA — `FE`
- [ ] **10** `RiesgoBadge.vue` — badge de color según nivel (verde/amarillo/rojo) — `FE`
- [ ] **11** `AnalisisReporte.vue` — muestra resumen, badge de riesgo, listas de puntos riesgo/ventaja — `FE`
- [ ] **12** `ChatMensaje.vue` — burbuja de mensaje con estilo diferenciado usuario/asistente — `FE`
- [ ] **13** `useChat.ts` composable — maneja el estado del historial y el input del chat — `FE`
- [ ] **14** `DocumentoDetallePage.vue` — activar botón IA, integrar `AnalisisReporte.vue` y panel de chat — `FE`
- [ ] **15** Estados de carga: spinner durante análisis + indicador "escribiendo..." en el chat — `FE`

### Semana 3 — Polish y ajustes
- [ ] **16** Dark mode toggle con `useTheme.ts` composable — `FE`
- [ ] **17** Manejo de errores: timeout de IA, documento sin texto extraíble, API key inválida — `BE` + `FE`
- [ ] **18** Validación: bloquear re-análisis si ya existe (mostrar fecha del análisis anterior) — `BE` + `FE`
- [ ] **19** Responsive mobile: panel de detalle y chat adaptados a pantallas pequeñas — `FE`
- [ ] **20** Animaciones de entrada en `AnalisisReporte.vue` (fade-in por sección) — `FE`

---

## 9. Decisiones técnicas

- **Respuesta JSON forzada:** Se le pide a Claude que responda únicamente con JSON válido. El backend valida con `JSON.parse()` envuelto en `try/catch`; si falla, reintenta una vez con un prompt de corrección antes de devolver error al usuario.
- **texto_extraido en DB:** Se guarda el texto crudo del documento en la tabla `analisis_documentos`. Esto evita re-extraer el archivo en cada mensaje del chat y hace el sistema más robusto ante eliminaciones accidentales del archivo.
- **Historial de chat completo en cada request:** En lugar de un sistema de memoria complejo, se envía el historial completo de `mensajes_chat` a Claude en cada pregunta. Para documentos muy extensos con chats largos, se puede implementar truncado del historial antiguo en Fase 3.
- **Un análisis por documento:** La relación `UNIQUE` en `documento_id` evita duplicados. Si el usuario quiere re-analizar, se deberá eliminar el análisis anterior (funcionalidad Fase 3).
- **Sin streaming en Fase 2:** Las respuestas de Claude se esperan completas antes de mostrarlas. El streaming (respuesta en tiempo real letra a letra) es una mejora para Fase 3.
- **Seguridad:** El `usuario_id` siempre se extrae del JWT. Antes de analizar o chatear, el backend verifica que `documento.usuario_id === req.usuario.id` para evitar acceso cruzado entre usuarios.

---

## 10. Fuera de scope — Fase 2

- Re-análisis de un documento ya analizado (Fase 3)
- Streaming de respuestas del chat en tiempo real (Fase 3)
- Exportar el reporte de análisis como PDF (Fase 3)
- Comparar dos documentos entre sí (Fase 3)
- Soporte para imágenes escaneadas / OCR (Fase 3)
- Alertas de vencimiento de contratos (Fase 3)
- Historial de análisis anteriores por documento (Fase 3)
- Compartir reporte con otro usuario (Fase 3)
- Roles de usuario / límites de uso por plan (Fase 3)
- Análisis de documentos en idiomas distintos al español (Fase 3)
