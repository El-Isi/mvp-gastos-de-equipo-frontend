/**
 * Cliente para el auth-service de Konfío.
 *
 * IMPORTANTE: Este archivo debe usarse SOLO en el servidor
 * (API Routes, Server Components, middleware) para no exponer
 * AUTH_SERVICE_API_KEY al navegador.
 */

const AUTH_URL = process.env.AUTH_SERVICE_URL;
const AUTH_API_KEY = process.env.AUTH_SERVICE_API_KEY;

function getHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': AUTH_API_KEY ?? '',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${AUTH_URL}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Auth login failed (${response.status}): ${body}`);
  }

  return response.json() as Promise<LoginResponse>;
}

export async function getMe(token: string): Promise<UserProfile> {
  const response = await fetch(`${AUTH_URL}/auth/me`, {
    headers: getHeaders(token),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Auth me failed (${response.status}): ${body}`);
  }

  return response.json() as Promise<UserProfile>;
}

export async function refreshAccessToken(refreshToken: string): Promise<{ access_token: string }> {
  const response = await fetch(`${AUTH_URL}/auth/refresh`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Auth refresh failed (${response.status}): ${body}`);
  }

  return response.json() as Promise<{ access_token: string }>;
}

export async function logout(token: string): Promise<void> {
  const response = await fetch(`${AUTH_URL}/auth/logout`, {
    method: 'POST',
    headers: getHeaders(token),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Auth logout failed (${response.status}): ${body}`);
  }
}
