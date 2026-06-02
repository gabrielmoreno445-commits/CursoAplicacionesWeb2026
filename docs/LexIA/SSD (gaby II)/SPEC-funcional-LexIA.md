# SPEC Funcional — LexIA
> **Proyecto:** LexIA — Gestor inteligente de documentos legales con IA
> **Cubre:** Fases 1, 2 y 3
> **Fecha:** Mayo 2026

---

## 1. Descripción del producto

LexIA permite centralizar documentos legales personales (contratos, pólizas, acuerdos
de servicio, contratos laborales, alquileres, etc.) en un panel privado. A partir de la
Fase 2, un motor de IA analiza cada documento y lo convierte en un reporte comprensible:
resume la letra chica, detecta riesgos y señala derechos ejercibles. El usuario también
puede chatear con el documento en lenguaje natural. En Fase 3 se agregan alertas de
vencimiento, exportación, comparación entre documentos, colaboración y un modelo de planes.

**Roles del sistema:**
- **Usuario registrado** → sube, organiza y consulta sus documentos; activa el análisis IA; chatea con cada documento.
- **Motor IA** → analiza documentos, responde preguntas y compara pares de documentos.
- **Administrador** → gestiona usuarios y planes desde el panel `/admin`.

---

## 2. Módulos funcionales

### Módulo 1 — Autenticación (Fase 1)

| Función | Descripción |
|---|---|
| Registro | El usuario crea una cuenta con nombre, email y contraseña. |
| Login | Acceso con email y contraseña; el sistema emite un token de sesión. |
| Sesión persistente | El token se conserva en el navegador; al recargar, la sesión se restaura automáticamente. |
| Cierre de sesión | El usuario puede cerrar sesión desde cualquier pantalla. |
| Rutas protegidas | Cualquier ruta que no sea `/login` o `/register` redirige al login si no hay sesión activa. |

---

### Módulo 2 — Gestión documental (Fase 1)

| Función | Descripción |
|---|---|
| Subir documento | El usuario sube un archivo PDF o DOCX (máx. 10 MB) con metadatos: tipo, descripción. |
| Tipos de documento | Contrato, póliza, acuerdo de servicio, laboral, alquiler, otro. |
| Drag & drop | La zona de subida acepta arrastrar y soltar archivos. |
| Listado personal | Vista de todos los documentos del usuario con nombre, tipo y fecha de carga. |
| Filtro por tipo | El dashboard permite filtrar documentos por categoría. |
| Ver detalle | Pantalla con todos los metadatos de un documento. |
| Eliminar documento | El usuario puede eliminar un documento; se borra el archivo y el registro de base de datos. |

---

### Módulo 3 — Análisis IA (Fase 2)

| Función | Descripción |
|---|---|
| Activar análisis | Botón "Analizar con IA" en la pantalla de detalle; visible desde Fase 1, activo desde Fase 2. |
| Spinner de espera | Mientras el análisis corre, se muestra un indicador animado con mensaje de progreso. |
| Reporte estructurado | Al finalizar, se presenta: resumen ejecutivo, nivel de riesgo (Bajo / Medio / Alto), lista de puntos de riesgo y lista de ventajas o derechos ejercibles. |
| Badge de riesgo | Indicador visual con color (verde / amarillo / rojo) según el nivel de riesgo detectado. |
| Un análisis por documento | El análisis se guarda; al volver a la pantalla de detalle se muestra el reporte guardado sin volver a llamar a la IA. |
| Bloqueo de re-análisis | Si ya existe un análisis, el botón muestra la fecha del análisis anterior y no permite re-ejecutar. |

---

### Módulo 4 — Chat con el documento (Fase 2)

| Función | Descripción |
|---|---|
| Panel de chat | Debajo del reporte de análisis, el usuario puede hacer preguntas en lenguaje natural sobre el documento específico. |
| Contexto del documento | La IA responde siempre en base al texto del documento y al análisis previo. |
| Historial de conversación | Los mensajes anteriores se recuperan y se presentan al volver a la pantalla. |
| Indicador "escribiendo…" | Mientras la IA genera la respuesta, se muestra un indicador animado. |
| Citas de cláusulas | Cuando la respuesta se basa en una sección concreta del documento, la IA la cita. |

---

### Módulo 5 — Alertas de vencimiento (Fase 3)

| Función | Descripción |
|---|---|
| Detección automática | Durante el análisis, la IA identifica fechas de vencimiento o renovación mencionadas en el documento y las registra como alertas. |
| Creación manual | El usuario puede agregar alertas propias desde la pantalla de alertas. |
| Listado de alertas | Página `/alertas` con todas las alertas del usuario, estado (pendiente / vista / vencida) y días restantes. |
| Badge en el menú | El menú principal muestra la cantidad de alertas no vistas. |
| Panel en dashboard | El dashboard muestra los 3 vencimientos más próximos. |
| Notificaciones por email | El sistema envía emails automáticos 30, 15 y 7 días antes de cada vencimiento (configurable). |
| Marcar como vista | El usuario puede marcar una alerta como leída. |
| Eliminar alerta | El usuario puede borrar alertas que ya no le interesan. |

---

### Módulo 6 — Exportar y compartir (Fase 3)

| Función | Descripción |
|---|---|
| Exportar PDF | Botón "Exportar PDF" en la pantalla de detalle; genera y descarga el reporte de análisis como archivo PDF. |
| Compartir reporte | Botón "Compartir reporte"; genera un enlace público con expiración de 7 días. |
| Vista pública | Cualquier persona con el enlace puede ver el reporte (sin autenticación, sin acceso al archivo original ni al chat). |
| Enlace vencido | Si el enlace expiró, se muestra una pantalla de aviso. |

---

### Módulo 7 — Comparación de documentos (Fase 3)

| Función | Descripción |
|---|---|
| Selector de documentos | El usuario elige dos documentos previamente analizados para comparar. |
| Análisis comparativo | La IA compara ambos textos y devuelve: resumen de diferencias, documento más favorable al usuario, tabla de diferencias por categoría (penalidades, plazos, obligaciones, etc.) y recomendación final. |
| Visualización diferencial | Tabla visual con colores según el campo `impacto` de cada diferencia (favorable a A / favorable a B / neutro). |
| Prerrequisito | Ambos documentos deben estar previamente analizados; si alguno no lo está, se indica con mensaje claro. |

---

### Módulo 8 — OCR para documentos escaneados (Fase 3)

| Función | Descripción |
|---|---|
| Soporte de imágenes | Al subir un archivo PNG o JPEG, el sistema extrae automáticamente el texto mediante OCR antes de procesarlo. |
| Transparencia para el usuario | La experiencia es idéntica a subir un PDF; el proceso OCR ocurre en el servidor sin pasos adicionales. |

---

### Módulo 9 — Planes y límites (Fase 3)

| Función | Plan Free | Plan Premium |
|---|---|---|
| Documentos por mes | 3 | Ilimitados |
| Análisis por mes | 3 | Ilimitados |
| Mensaje al alcanzar el límite | Error 403 con mensaje descriptivo | — |
| Badge de plan | Visible en la barra de navegación | Visible en la barra de navegación |

---

### Módulo 10 — Panel de administración (Fase 3)

| Función | Descripción |
|---|---|
| Acceso restringido | Solo usuarios con rol `admin` pueden acceder a `/admin`; los demás son redirigidos al dashboard normal. |
| Dashboard de métricas | Total de usuarios, documentos analizados, distribución free/premium por mes. |
| Gestión de usuarios | Listado paginado con búsqueda y filtro por plan. |
| Cambiar plan | El admin puede promover o degradar el plan de un usuario. |
| Desactivar cuenta | El admin puede desactivar o reactivar una cuenta de usuario. |

---

## 3. Pantallas — resumen completo

| # | Pantalla | Ruta | Fase | Descripción resumida |
|---|---|---|---|---|
| 1 | `LoginPage` | `/login` | 1 | Formulario de acceso |
| 2 | `RegisterPage` | `/register` | 1 | Registro de nuevo usuario |
| 3 | `DashboardPage` | `/` | 1→3 | Listado de documentos + filtro por tipo + alertas próximas (F3) |
| 4 | `SubirDocumentoPage` | `/subir` | 1 | Subida de archivo + metadatos |
| 5 | `DocumentoDetallePage` | `/documentos/:id` | 1→3 | Metadatos + reporte IA (F2) + chat (F2) + exportar/compartir (F3) |
| 6 | `AlertasPage` | `/alertas` | 3 | Listado completo de alertas de vencimiento |
| 7 | `ComparacionPage` | `/comparar` | 3 | Selector de dos documentos + tabla diferencial |
| 8 | Vista pública compartida | `/compartido/:token` | 3 | Reporte público sin autenticación |
| 9 | `AdminDashboardPage` | `/admin` | 3 | Métricas globales (solo admin) |
| 10 | `AdminUsuariosPage` | `/admin/usuarios` | 3 | Gestión de usuarios y planes (solo admin) |

---

## 4. Estados de `DocumentoDetallePage`

La pantalla central del producto tiene cuatro estados posibles:

| Estado | Condición | Qué se muestra |
|---|---|---|
| **Sin analizar** | No existe análisis en DB | Metadatos + botón "Analizar con IA" activo |
| **En proceso** | Request IA en curso | Spinner + mensaje "La IA está leyendo tu documento…" |
| **Analizado** | Análisis guardado en DB | Reporte completo (resumen, riesgo, puntos) + panel de chat |
| **Compartido** | Vista pública vía token | Solo reporte; sin chat, sin archivo, sin acceso auth |

---

## 5. Flujos principales

### Flujo: subir y analizar un documento
```
1. Usuario sube archivo (PDF, DOCX o imagen escaneada)
2. Sistema valida tipo y tamaño, guarda en volumen, registra metadatos en DB
3. Usuario navega al detalle del documento
4. Usuario hace clic en "Analizar con IA"
5. Sistema extrae texto del archivo (o corre OCR si es imagen)
6. Sistema envía texto a la IA con prompt estructurado
7. IA devuelve JSON con resumen, nivel_riesgo, puntos_riesgo, puntos_ventaja (+ fechas_clave en F3)
8. Sistema guarda el análisis en DB (y crea alertas si detectó fechas — F3)
9. Frontend muestra el reporte completo
```

### Flujo: chat con el documento
```
1. Usuario escribe una pregunta en el panel de chat
2. Sistema recupera historial de mensajes previos de DB
3. Sistema envía a la IA: texto del documento + análisis previo + historial + nueva pregunta
4. IA responde en lenguaje natural citando cláusulas cuando corresponde
5. Respuesta se guarda en DB y se muestra en el chat
```

### Flujo: alerta de vencimiento
```
1. La IA detecta fechas durante el análisis y las guarda como alertas
2. Cron job diario (09:00) verifica alertas próximas
3. Si una alerta está a 30, 15 o 7 días de su fecha y no se envió ese aviso:
   → Sistema envía email al usuario
   → Registra el aviso como enviado
4. El usuario ve la alerta en su panel y puede marcarla como vista
```

---

## 6. Fuera de scope (global)

| Funcionalidad | Descartada para |
|---|---|
| Re-análisis de documento (eliminar y re-correr IA) | No contemplado en ninguna fase |
| Streaming de respuestas del chat en tiempo real | No contemplado en ninguna fase |
| Historial de versiones de un documento | No contemplado |
| Integración con Google Drive o Dropbox | No contemplado |
| Análisis en idiomas distintos al español | No contemplado |
| App mobile nativa | No contemplado |
| Recordatorios por WhatsApp o SMS | No contemplado |
| Pasarela de pagos real para plan premium | No contemplado |
| Multi-tenant (organizaciones con múltiples usuarios) | No contemplado |
