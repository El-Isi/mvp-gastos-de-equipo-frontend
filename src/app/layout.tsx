import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gastos de Equipo - TSO Konfío',
  description: 'App para registrar y aprobar gastos del equipo TSO de Konfío con dashboard, lista y filtros por categoría y miembro',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
