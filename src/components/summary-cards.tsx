'use client';

import { formatMoney } from '@/lib/utils';

interface SummaryCardsProps {
  total: number;
  totalApproved: number;
  totalPending: number;
  filteredCount: number;
  approvedCount: number;
  pendingCount: number;
}

export default function SummaryCards({
  total,
  totalApproved,
  totalPending,
  filteredCount,
  approvedCount,
  pendingCount,
}: SummaryCardsProps) {
  const cards = [
    {
      label: 'Total gastos',
      value: formatMoney(total),
      accent: '#A29BFE',
      sub: `${filteredCount} registros`,
    },
    {
      label: 'Aprobados',
      value: formatMoney(totalApproved),
      accent: '#00B894',
      sub: `${approvedCount} gastos`,
    },
    {
      label: 'Pendientes',
      value: formatMoney(totalPending),
      accent: '#FDCB6E',
      sub: `${pendingCount} por revisar`,
    },
  ];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-7 animate-slide-up">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-konfio-card border border-konfio-border rounded-2xl px-5 py-5 relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{
              background: `linear-gradient(90deg, ${card.accent}, transparent)`,
            }}
          />
          <p className="text-xs text-konfio-muted mb-1.5 font-medium uppercase tracking-wider">
            {card.label}
          </p>
          <p
            className="text-2xl font-bold font-mono tracking-tight"
            style={{ color: card.accent }}
          >
            {card.value}
          </p>
          <p className="text-[11px] text-konfio-subtle mt-1">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
