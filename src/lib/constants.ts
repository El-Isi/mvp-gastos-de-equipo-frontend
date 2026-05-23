export interface CategoryItem {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export const CATEGORIES: CategoryItem[] = [
  { id: 'software', label: 'Software', icon: '💻', color: '#6C5CE7' },
  { id: 'hardware', label: 'Hardware', icon: '🖥️', color: '#00B894' },
  { id: 'viajes', label: 'Viajes', icon: '✈️', color: '#E17055' },
  { id: 'comidas', label: 'Comidas', icon: '🍽️', color: '#FDCB6E' },
  { id: 'servicios', label: 'Servicios', icon: '⚡', color: '#0984E3' },
  { id: 'otro', label: 'Otro', icon: '📦', color: '#B2BEC3' },
];

export const MEMBERS: string[] = [
  'Isidro', 'Samantha', 'Kiko', 'Carlos', 'Ana', 'Jorge',
];

export type ExpenseStatus = 'pendiente' | 'aprobado' | 'rechazado';

export interface StatusInfo {
  label: string;
  color: string;
  bg: string;
}

export const STATUS_MAP: Record<ExpenseStatus, StatusInfo> = {
  pendiente: { label: 'Pendiente', color: '#FDCB6E', bg: 'rgba(253,203,110,0.15)' },
  aprobado: { label: 'Aprobado', color: '#00B894', bg: 'rgba(0,184,148,0.15)' },
  rechazado: { label: 'Rechazado', color: '#E17055', bg: 'rgba(225,112,85,0.15)' },
};

export interface Expense {
  id: string;
  member: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  status: ExpenseStatus;
}

export const DEFAULT_EXPENSES: Expense[] = [
  { id: 'demo1', member: 'Isidro', category: 'software', description: 'Licencia n8n Cloud', amount: 4200, date: '2026-05-01', status: 'aprobado' },
  { id: 'demo2', member: 'Samantha', category: 'comidas', description: 'Almuerzo planning Q3', amount: 890, date: '2026-05-10', status: 'pendiente' },
  { id: 'demo3', member: 'Kiko', category: 'servicios', description: 'API Aclaraciones', amount: 1500, date: '2026-05-15', status: 'aprobado' },
  { id: 'demo4', member: 'Carlos', category: 'viajes', description: 'Uber a oficina CDMX', amount: 320, date: '2026-04-28', status: 'rechazado' },
  { id: 'demo5', member: 'Ana', category: 'hardware', description: 'Teclado mecánico', amount: 2100, date: '2026-05-18', status: 'pendiente' },
];
