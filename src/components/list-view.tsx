'use client';

import { CATEGORIES, MEMBERS, STATUS_MAP } from '@/lib/constants';
import type { Expense } from '@/lib/constants';
import { formatMoney } from '@/lib/utils';

interface ListViewProps {
  filtered: Expense[];
  onCycleStatus: (id: string) => void;
  onEdit: (exp: Expense) => void;
  onDelete: (id: string) => void;
}

export default function ListView({ filtered, onCycleStatus, onEdit, onDelete }: ListViewProps) {
  return (
    <div className="animate-fade-in">
      {/* Header row - hidden on mobile */}
      <div className="hidden lg:grid grid-cols-[40px_1.5fr_1fr_0.8fr_0.8fr_1fr_80px] px-4 py-2.5 text-[11px] text-konfio-muted font-semibold uppercase tracking-wider border-b border-konfio-border">
        <span></span>
        <span>Descripción</span>
        <span>Miembro</span>
        <span>Categoría</span>
        <span>Fecha</span>
        <span className="text-right">Monto</span>
        <span></span>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-konfio-subtle">
          <p className="text-4xl mb-3">🔍</p>
          <p>No hay gastos con estos filtros</p>
        </div>
      )}

      {filtered.map((exp) => {
        const cat = CATEGORIES.find((c) => c.id === exp.category);
        const st = STATUS_MAP[exp.status];
        const memberIndex = MEMBERS.indexOf(exp.member);

        return (
          <div
            key={exp.id}
            className="grid grid-cols-[40px_1fr_auto] lg:grid-cols-[40px_1.5fr_1fr_0.8fr_0.8fr_1fr_80px] px-4 py-3.5 items-center border-b border-white/[0.04] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-slide-up"
          >
            <span className="text-xl">{cat?.icon}</span>
            <span className="font-medium text-sm">{exp.description}</span>
            <span className="hidden lg:flex items-center gap-2 text-[13px]">
              <span
                className="w-[22px] h-[22px] rounded-[7px] inline-flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: `hsl(${memberIndex * 60}, 50%, 35%)` }}
              >
                {exp.member[0]}
              </span>
              {exp.member}
            </span>
            <span className="hidden lg:block text-xs text-konfio-secondary">
              {cat?.label}
            </span>
            <span className="hidden lg:block text-xs text-konfio-muted font-mono">
              {new Date(exp.date + 'T12:00:00').toLocaleDateString('es-MX', {
                day: '2-digit',
                month: 'short',
              })}
            </span>
            <span className="font-mono font-bold text-right text-sm">
              {formatMoney(exp.amount)}
            </span>
            <span className="flex gap-1 justify-end">
              <button
                onClick={() => onCycleStatus(exp.id)}
                title="Cambiar estatus"
                className="w-7 h-7 rounded-lg border-none cursor-pointer text-[10px] font-bold flex items-center justify-center transition-all"
                style={{ background: st.bg, color: st.color }}
              >
                {st.label[0]}
              </button>
              <button
                onClick={() => onEdit(exp)}
                title="Editar"
                className="w-7 h-7 rounded-lg border border-white/[0.08] bg-transparent text-konfio-secondary text-[13px] cursor-pointer flex items-center justify-center transition-all hover:bg-white/10"
              >
                ✎
              </button>
              <button
                onClick={() => onDelete(exp.id)}
                title="Eliminar"
                className="w-7 h-7 rounded-lg border border-white/[0.08] bg-transparent text-konfio-orange text-[13px] cursor-pointer flex items-center justify-center transition-all hover:bg-white/10"
              >
                ✕
              </button>
            </span>
          </div>
        );
      })}
    </div>
  );
}
