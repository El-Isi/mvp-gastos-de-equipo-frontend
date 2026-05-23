/**
 * Cliente para el notification-service de Konfío.
 *
 * IMPORTANTE: Este archivo debe usarse SOLO en el servidor
 * (API Routes, Server Components) para no exponer
 * NOTIFICATIONS_API_KEY al navegador.
 */

const NOTIFICATIONS_URL = process.env.NOTIFICATIONS_URL;
const NOTIFICATIONS_API_KEY = process.env.NOTIFICATIONS_API_KEY;

function getHeaders(token: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'x-api-key': NOTIFICATIONS_API_KEY ?? '',
  };
}

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

export interface SmsPayload {
  to: string;
  message: string;
}

export async function sendEmail(token: string, payload: EmailPayload): Promise<void> {
  const response = await fetch(`${NOTIFICATIONS_URL}/notifications/email`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Notification email failed (${response.status}): ${errorBody}`);
  }
}

export async function sendSms(token: string, payload: SmsPayload): Promise<void> {
  const response = await fetch(`${NOTIFICATIONS_URL}/notifications/sms`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Notification SMS failed (${response.status}): ${errorBody}`);
  }
}

/**
 * Helper: notificar cambio de estado de un gasto.
 * Ejemplo de uso desde una API Route cuando se aprueba/rechaza un gasto.
 */
export async function notifyExpenseStatusChange(
  token: string,
  recipientEmail: string,
  expenseDescription: string,
  newStatus: string,
): Promise<void> {
  const statusLabels: Record<string, string> = {
    aprobado: 'aprobado ✅',
    rechazado: 'rechazado ❌',
    pendiente: 'pendiente de revisión ⏳',
  };

  await sendEmail(token, {
    to: recipientEmail,
    subject: `Gasto ${statusLabels[newStatus] ?? newStatus}: ${expenseDescription}`,
    body: `El gasto "${expenseDescription}" ha sido marcado como ${statusLabels[newStatus] ?? newStatus}. Revisa el dashboard de Gastos de Equipo para más detalles.`,
  });
}
