# SPEC — Fase 1: LexIA

> **Proyecto:** LexIA — Gestor inteligente de documentos legales con IA
> **Fase:** 1 — Infraestructura + Autenticación + Gestión documental
> **Fecha:** Mayo 2026
> **Estado:** En planificación

---

## 1. Descripción del proyecto

Aplicación web que permite al usuario centralizar sus documentos legales (contratos,
pólizas, acuerdos de servicio, contratos laborales, etc.) en un solo lugar. Con la
integración de IA (Fase 2), el usuario podrá comprender la letra chica en lenguaje
simple y descubrir cláusulas o derechos que puede aprovechar a su favor.

**Quién usa qué:**
- **Usuario registrado** → sube sus documentos, los organiza por tipo/categoría y los
  consulta en cualquier momento desde su panel personal
- **Motor IA (Fase 2)** → analiza los documentos ya subidos: explica la letra chica,
  identifica puntos de riesgo y detecta ventajas ejercibles para el usuario

Esta fase cubre únicamente la infraestructura base, autenticación del usuario, y el
módulo de gestión documental completo (subir, listar, ver, eliminar). Sin análisis IA todavía.

---

## 2. Stack tecnológico

| Capa | Tecnología |
|---|---|
| Panel de usuario | Vue 3 SPA (Vue Router, Pinia, Composables, **TypeScript**) |
| Backend | Node.js con Express.js + **TypeScript**, autenticación con JWT |
| Base de datos | PostgreSQL 15 |
| Almacenamiento de archivos | Volumen Docker local (`/storage/uploads/`) |
| Subida de archivos | Multer (middleware Express) |
| Extracción de texto (preparación Fase 2) | `pdf-parse` (PDF) + `mammoth` (DOCX) — instalados, sin uso en Fase 1 |
| Entorno de desarrollo | Docker Compose |
| Asistente de código | Claude (Anthropic) / Codex en VS Code |

> **Nota TypeScript:** A diferencia de proyectos anteriores, este usa TypeScript en todo el stack.
> En el frontend: archivos `*.ts` para lógica y componentes `.vue` con `<script setup lang="ts">`.
> En el backend: compilación con `tsc`, ejecución en desarrollo con `tsx` (reemplaza a `ts-node`).

> **¿Por qué PostgreSQL y no MySQL?**
> En Fase 2 se almacenarán los resultados del análisis de IA como objetos JSON estructurados.
> PostgreSQL tiene el tipo nativo `JSONB` que permite guardar y consultar esa estructura
> de forma eficiente, sin necesidad de serializar/deserializar manualmente.

---

## 3. Estructura de carpetas

```
LexIA/
├── frontend/                            ← Vue 3 SPA
│   ├── src/
│   │   ├── ArchivosTS/
│   │   │   ├── api/                     ← funciones fetch al backend (una por entidad)
│   │   │   │   ├── auth.ts
│   │   │   │   └── documentos.ts
│   │   │   └── utils/                   ← funciones auxiliares puras
│   │   │       └── formatters.ts        ← formateo de fechas, tamaños de archivo, etc.
│   │   ├── ArchivosVue/
│   │   │   ├── components/              ← componentes reutilizables .vue
│   │   │   │   ├── NavBar.vue
│   │   │   │   ├── DocumentCard.vue     ← card de un documento en el listado
│   │   │   │   └── UploadZone.vue       ← zona drag & drop para subir archivos
│   │   │   ├── composables/             ← lógica reutilizable (equiv. custom hooks)
│   │   │   │   └── useAuth.ts
│   │   │   ├── pages/                   ← una página por pantalla .vue
│   │   │   │   ├── LoginPage.vue
│   │   │   │   ├── RegisterPage.vue
│   │   │   │   ├── DashboardPage.vue
│   │   │   │   ├── SubirDocumentoPage.vue
│   │   │   │   └── DocumentoDetallePage.vue
│   │   │   ├── router/
│   │   │   │   └── index.ts             ← rutas y guardia de auth
│   │   │   ├── stores/
│   │   │   │   └── authStore.ts         ← Pinia: usuario logueado
│   │   │   └── App.vue
│   │   └── main.ts
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/                             ← Node.js + Express + TypeScript
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   └── documentos.ts
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts        ← verifica JWT en cada request protegido
│   │   │   └── uploadMiddleware.ts      ← Multer: recibe y valida archivos entrantes
│   │   ├── types/
│   │   │   └── index.ts                 ← interfaces y tipos compartidos del backend
│   │   ├── db/
│   │   │   └── connection.ts            ← pool de conexión a PostgreSQL (pg)
│   │   └── index.ts                     ← entrada del servidor
│   ├── package.json
│   └── tsconfig.json
│
├── storage/
│   └── uploads/                         ← archivos subidos (montado como volumen Docker)
│
├── database/
│   └── schema.sql                       ← tablas del proyecto
│
├── SDD/                                 ← documentación
│   ├── SPEC-fase1.md
│   ├── SPEC-fase2.md
│   └── prompts-etapa/
│
└── docker-compose.yml                   ← levanta todo con un comando
```

---

## 4. Pantallas — Fase 1

| # | Componente | Ruta Vue | Descripción |
|---|---|---|---|
| 1 | `LoginPage.vue` | `/login` | Formulario de acceso con email y contraseña |
| 2 | `RegisterPage.vue` | `/register` | Registro de nuevo usuario |
| 3 | `DashboardPage.vue` | `/` | Listado de documentos del usuario con filtro por tipo |
| 4 | `SubirDocumentoPage.vue` | `/subir` | Formulario para subir un documento con sus metadatos |
| 5 | `DocumentoDetallePage.vue` | `/documentos/:id` | Vista de metadatos del documento + botón "Analizar con IA" deshabilitado |

> En Fase 1 la pantalla de detalle muestra los datos del documento y un botón
> "Analizar con IA" visible pero deshabilitado, con tooltip "Disponible próximamente".
> Se activa en Fase 2.

---

## 5. Base de datos

### Modelo — Fase 1
```
usuarios  1──N  documentos
```
En Fase 2 se agregan las tablas `analisis_documentos` y `mensajes_chat`.

### Tablas

#### `usuarios`
| Campo | Tipo | Notas |
|---|---|---|
| id | SERIAL PK | |
| nombre | VARCHAR(100) | nombre visible en el panel |
| email | VARCHAR(150) | UNIQUE, se usa para el login |
| password_hash | VARCHAR(255) | bcrypt |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

#### `documentos`
| Campo | Tipo | Notas |
|---|---|---|
| id | SERIAL PK | |
| usuario_id | INT FK | → usuarios.id |
| nombre_original | VARCHAR(255) | nombre del archivo tal como lo subió el usuario |
| nombre_archivo | VARCHAR(255) | nombre UUID con el que se guarda en disco |
| tipo | VARCHAR(50) | 'contrato', 'poliza', 'acuerdo_servicio', 'laboral', 'alquiler', 'otro' |
| descripcion | TEXT | descripción opcional que ingresa el usuario al subir |
| mime_type | VARCHAR(100) | 'application/pdf' o 'application/vnd.openxmlformats...' |
| tamanio_bytes | INT | tamaño del archivo |
| ruta_archivo | VARCHAR(500) | ruta relativa en el volumen: `uploads/uuid.pdf` |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

> `nombre_archivo` usa UUID para evitar colisiones y no exponer el nombre original
> en el sistema de archivos. Ejemplo: `a3f1bc92-...pdf`.

---

## 6. API REST — Fase 1

### Autenticación
| Método | Ruta | Descripción | Auth requerida |
|---|---|---|---|
| POST | `/auth/register` | Registrar nuevo usuario | No |
| POST | `/auth/login` | Login → devuelve JWT | No |
| GET | `/auth/me` | Devuelve datos del usuario logueado | Sí |

### Documentos
| Método | Ruta | Descripción | Auth requerida |
|---|---|---|---|
| GET | `/documentos` | Listar documentos del usuario (acepta `?tipo=`) | Sí |
| POST | `/documentos` | Subir un documento (multipart/form-data) | Sí |
| GET | `/documentos/:id` | Ver metadatos completos de un documento | Sí |
| DELETE | `/documentos/:id` | Eliminar documento y su archivo del volumen | Sí |

> Todas las rutas de `/documentos` requieren header `Authorization: Bearer <token>`

### Respuesta de `/auth/login` (ejemplo)
```json
{
  "token": "eyJhbGci...",
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com"
  }
}
```

### Respuesta de `GET /documentos` (ejemplo)
```json
[
  {
    "id": 3,
    "nombre_original": "contrato-alquiler-2025.pdf",
    "tipo": "alquiler",
    "descripcion": "Contrato de alquiler depto Palermo",
    "tamanio_bytes": 204800,
    "created_at": "2026-05-20T14:32:00Z"
  }
]
```

### Errores — formato estándar
```json
{ "error": "mensaje descriptivo en español" }
```

---

## 7. Tareas — Sprint Fase 1

### Semana 1 — Infraestructura y base de datos
- [ ] **01** Estructura de carpetas completa del proyecto — `infra`
- [ ] **02** `docker-compose.yml` con servicios: backend, postgres, frontend — `infra`
- [ ] **03** `database/schema.sql` con tablas `usuarios` y `documentos` — `DB`
- [ ] **04** `backend/src/db/connection.ts` — pool de conexión a PostgreSQL con `pg` — `BE`
- [ ] **05** `POST /auth/register` y `POST /auth/login` con bcrypt + JWT — `BE`
- [ ] **06** `GET /auth/me` con `authMiddleware.ts` — `BE`
- [ ] **07** `uploadMiddleware.ts` con Multer: validar tipo (PDF, DOCX) y límite 10MB — `BE`
- [ ] **08** `POST /documentos` — recibe archivo + metadatos, guarda en volumen y DB — `BE`
- [ ] **09** `GET /documentos`, `GET /documentos/:id`, `DELETE /documentos/:id` — `BE`

### Semana 2 — Frontend
- [ ] **10** Setup Vue 3 + TypeScript + Vite + Vue Router + Pinia — `FE`
- [ ] **11** Sistema de diseño CSS: variables de color, tipografía, espaciado — `FE`
- [ ] **12** `authStore.ts` en Pinia (login, logout, restaurar sesión desde `localStorage`) — `FE`
- [ ] **13** Guardia de rutas en Vue Router (redirige a `/login` si no hay token) — `FE`
- [ ] **14** `LoginPage.vue` y `RegisterPage.vue` con llamadas al backend — `FE`
- [ ] **15** `DashboardPage.vue` con listado de `DocumentCard.vue` + filtro por tipo — `FE`
- [ ] **16** `SubirDocumentoPage.vue` con `UploadZone.vue` (drag & drop) + campos de metadatos — `FE`
- [ ] **17** `DocumentoDetallePage.vue` con metadatos + botón "Analizar con IA" deshabilitado — `FE`

---

## 8. Decisiones técnicas

- **TypeScript full-stack:** Tipos e interfaces definidos en `backend/src/types/index.ts`. Si en Fase 2 la complejidad crece, se puede crear un paquete `shared/` con tipos compartidos entre frontend y backend.
- **JWT:** Token en `localStorage` con clave `"lexia_token"`, enviado como header `Authorization: Bearer` en cada request protegido.
- **usuario_id:** Siempre extraído del JWT en el backend (`req.usuario.id`), nunca desde el body del request.
- **Multer:** Maneja la recepción de archivos. Guarda con nombre UUID en `/storage/uploads/`. Tipos aceptados en Fase 1: `.pdf` y `.docx`.
- **pdf-parse y mammoth instalados desde Fase 1:** Aunque no se usan todavía, instalarlos ahora evita cambios de dependencias en Fase 2.
- **PostgreSQL sobre MySQL:** Se elige PostgreSQL por el tipo `JSONB`, que en Fase 2 se usará para almacenar los resultados del análisis IA sin tener que serializar manualmente.
- **Sin librerías de UI externas:** Todo el diseño con variables CSS propias.
- **Vue Router ≈ React Router · Pinia ≈ React Context · Composables ≈ Custom Hooks**

---

## 9. Fuera de scope — Fase 1

- Análisis de letra chica con IA (Fase 2)
- Detección de ventajas y oportunidades en documentos (Fase 2)
- Chat conversacional con el documento (Fase 2)
- Editar perfil de usuario (Fase 2)
- Dark mode toggle (Fase 2)
- Compartir documentos con otros usuarios (Fase 3)
- Soporte para imágenes escaneadas / OCR (Fase 3)
- Alertas de vencimiento de contratos (Fase 3)
- Exportar reporte del análisis en PDF (Fase 3)
- Historial de análisis anteriores (Fase 3)
- Roles de usuario / plan premium (Fase 3)
