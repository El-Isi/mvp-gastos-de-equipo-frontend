# Integraciones — Gastos de Equipo (TSO Konfío)

## Resumen

Este MVP es una aplicación frontend (Next.js) que actualmente opera con datos en memoria (`DEFAULT_EXPENSES` en `src/lib/constants.ts`). No tiene backend propio ni llamadas a APIs externas.

Se analizaron los archivos generados y se identificaron las siguientes áreas de integración:

---

## 1. Autenticación — `auth-service` ✅ Disponible

**Estado actual:** No hay autenticación implementada. La app es abierta sin login.

**Servicio real disponible:**

| Campo | Valor |
|---|---|
| Servicio | `auth-service` |
| Base URL | `https://auth.konfio.mx/api/v1` |
| Variables de entorno | `AUTH_SERVICE_URL`, `AUTH_SERVICE_API_KEY` |

### Endpoints disponibles

| Método | Path | Descripción |
|---|---|---|
| `POST` | `/auth/login` | Login con email y password |
| `POST` | `/auth/refresh` | Renovar access token |
| `POST` | `/auth/logout` | Invalidar tokens |
| `GET` | `/auth/me` | Obtener usuario autenticado |

### Patrón de integración recomendado

```typescript
// src/lib/auth-service.ts
const AUTH_URL = process.env.AUTH_SERVICE_URL; // https://auth.konfio.mx/api/v1
const AUTH_API_KEY = process.env.AUTH_SERVICE_API_KEY;

export async function login(email: string, password: string): Promise<{ access_token: string; refresh_token: string }> {
  const response = await fetch(`${AUTH_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': AUTH_API_KEY!,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`Auth login failed: ${response.status}`);
  }

  return response.json();
}

export async function getMe(token: string): Promise<{ id: string; email: string; name: string }> {
  const response = await fetch(`${AUTH_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'x-api-key': AUTH_API_KEY!,
    },
  });

  if (!response.ok) {
    throw new Error(`Auth me failed: ${response.status}`);
  }

  return response.json();
}

export async function refreshToken(refreshToken: string): Promise<{ access_token: string }> {
  const response = await fetch(`${AUTH_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': AUTH_API_KEY!,
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error(`Auth refresh failed: ${response.status}`);
  }

  return response.json();
}

export async function logout(token: string): Promise<void> {
  await fetch(`${AUTH_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-api-key': AUTH_API_KEY!,
    },
  });
}
```

### Implementación recomendada

1. Crear una página `/login` con formulario de email/password
2. Usar Next.js API Routes (`/api/auth/login`, `/api/auth/me`) como proxy al auth-service para no exponer `AUTH_SERVICE_API_KEY` al cliente
3. Almacenar el `access_token` en una cookie httpOnly
4. Crear un middleware de Next.js que valide el token en rutas protegidas
5. Usar el usuario autenticado para filtrar gastos por miembro del equipo

---

## 2. Notificaciones — `notification-service` ✅ Disponible

**Estado actual:** No hay notificaciones implementadas. Cuando un gasto cambia de estado (pendiente → aprobado → rechazado), no se notifica a nadie.

**Servicio real disponible:**

| Campo | Valor |
|---|---|
| Servicio | `notification-service` |
| Base URL | `https://notifications.konfio.mx/api/v1` |
| Variables de entorno | `NOTIFICATIONS_URL`, `NOTIFICATIONS_API_KEY` |

### Endpoints disponibles

| Método | Path | Descripción |
|---|---|---|
| `POST` | `/notifications/email` | Enviar email transaccional |
| `POST` | `/notifications/sms` | Enviar SMS |

### Patrón de integración recomendado

```typescript
// src/lib/notification-service.ts
const NOTIFICATIONS_URL = process.env.NOTIFICATIONS_URL; // https://notifications.konfio.mx/api/v1
const NOTIFICATIONS_API_KEY = process.env.NOTIFICATIONS_API_KEY;

interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

export async function sendEmail(token: string, payload: EmailPayload): Promise<void> {
  const response = await fetch(`${NOTIFICATIONS_URL}/notifications/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'x-api-key': NOTIFICATIONS_API_KEY!,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Notification email failed: ${response.status}`);
  }
}
```

### Casos de uso recomendados

- Notificar al **aprobador** cuando se registra un nuevo gasto
- Notificar al **solicitante** cuando su gasto es aprobado o rechazado
- Enviar resumen semanal de gastos al líder de equipo

---

## 3. Gaps identificados — Servicios NO disponibles

### 3.1 API de Gastos (CRUD Backend) ❌ No disponible

**Descripción:** Actualmente todos los gastos se almacenan en el estado de React con datos mock (`DEFAULT_EXPENSES`). No existe persistencia.

**Archivos afectados:**
- `src/lib/constants.ts` — contiene `DEFAULT_EXPENSES` como datos iniciales en memoria
- `src/components/gastos-equipo.tsx` — todo el CRUD opera sobre `useState`

**Lo que se necesita:**
- Un servicio backend (NestJS) o API Route de Next.js con base de datos
- Endpoints CRUD: `GET /expenses`, `POST /expenses`, `PUT /expenses/:id`, `DELETE /expenses/:id`
- Soporte para filtrado por categoría, miembro y estado
- Paginación cursor-based (patrón Konfío)

**Recomendación:** Crear un backend NestJS con PostgreSQL o usar Next.js API Routes con una base de datos (Prisma + PostgreSQL). Mientras tanto, el mock en `DEFAULT_EXPENSES` se mantiene funcional para demostración.

### 3.2 Servicio de Usuarios/Miembros del Equipo ❌ No disponible

**Descripción:** Los miembros del equipo están hardcodeados en `src/lib/constants.ts` (`MEMBERS`). No hay un servicio que provea la lista real de integrantes del equipo TSO.

**Archivos afectados:**
- `src/lib/constants.ts` — contiene `MEMBERS` hardcodeado
- `src/components/filters.tsx` — usa `MEMBERS` para el dropdown de filtros
- `src/components/dashboard-view.tsx` — usa `MEMBERS` para el breakdown por miembro

**Recomendación:** Usar `auth-service` (`GET /auth/me`) para obtener el usuario actual. Para la lista completa de miembros del equipo, se necesitaría un servicio de directorio/equipos o un endpoint adicional. Mientras tanto, el array `MEMBERS` se mantiene como fuente de datos.

### 3.3 Servicio de Archivos/Comprobantes ❌ No disponible

**Descripción:** No hay funcionalidad para adjuntar comprobantes (fotos de tickets, facturas PDF) a los gastos.

**Recomendación:** Implementar un servicio de storage (S3, GCS) con un API de upload. No es bloqueante para el MVP actual.

---

## 4. Variables de entorno hardcodeadas encontradas

| Archivo | Variable | Estado |
|---|---|---|
| `.env.example` | `NEXT_PUBLIC_API_URL` | ⚠️ Placeholder — no se usa en ningún archivo actualmente |

**Acción:** Se actualizó `.env.example` con las variables reales necesarias para las integraciones con auth-service y notification-service.

---

## 5. Resumen de estado de integraciones

| Integración | Servicio Konfío | Estado |
|---|---|---|
| Autenticación (login/logout) | `auth-service` | ✅ Disponible — pendiente de implementar |
| Notificaciones (email/SMS) | `notification-service` | ✅ Disponible — pendiente de implementar |
| CRUD de gastos (persistencia) | — | ❌ No hay servicio — usar mock o crear backend |
| Directorio de miembros | — | ❌ No hay servicio — usar array hardcodeado |
| Upload de comprobantes | — | ❌ No hay servicio — feature futuro |

---

## 6. Arquitectura recomendada para producción

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│   Next.js App   │────▶│  Next.js API     │────▶│  auth-service       │
│   (Frontend)    │     │  Routes (proxy)  │     │  (Konfío)           │
└─────────────────┘     └──────────────────┘     └─────────────────────┘
                              │                         │
                              │                  ┌──────┴──────────────┐
                              │                  │  notification-svc   │
                              │                  │  (Konfío)           │
                              │                  └─────────────────────┘
                              │
                        ┌─────┴─────────┐
                        │  PostgreSQL   │
                        │  (gastos DB)  │
                        └───────────────┘
```
