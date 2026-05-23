'use client';

import { CATEGORIES, MEMBERS, STATUS_MAP } from '@/lib/constants';
import type { Expense } from '@/lib/constants';
import { formatMoney } from '@/lib/utils';

interface DashboardViewProps {
  filtered: Expense[];
  onViewAll: () => void;
}

export default function DashboardView({ filtered, onViewAll }: DashboardViewProps) {
  const catBreakdown = CATEGORIES.map((c) => ({
    ...c,
    total: filtered.filter((e) => e.category === c.id).reduce((s, e) => s + e.amount, 0),
    count: filtered.filter((e) => e.category === c.id).length,
  }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.total - a.total);

  const memberBreakdown = MEMBERS.map((m) => ({
    name: m,
    total: filtered.filter((e) => e.member === m).reduce((s, e) => s + e.amount, 0),
    count: filtered.filter((e) => e.member === m).length,
  }))
    .filter((m) => m.count > 0)
    .sort((a, b) => b.total - a.total);

  const maxCatTotal = Math.max(...catBreakdown.map((c) => c.total), 1);
  const maxMemberTotal = Math.max(...memberBreakdown.map((m) => m.total), 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
      {/* By Category */}
      <div className="bg-konfio-card border border-konfio-border rounded-2xl p-6">
        <h3 className="text-sm font-bold mb-4 text-konfio-secondary">Por categoría</h3>
        <div className="flex flex-col gap-3.5">
          {catBreakdown.map((c) => (
            <div key={c.id}>
              <div className="flex justify-between mb-1.5 text-[13px]">
                <span>
                  {c.icon} {c.label}{' '}
                  <span className="text-konfio-muted">({c.count})</span>
                </span>
                <span className="font-mono font-bold" style={{ color: c.color }}>
                  {formatMoney(c.total)}
                </span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-sm overflow-hidden">
                <div
                  className="h-full rounded-sm transition-all duration-500"
                  style={{
                    width: `${(c.total / maxCatTotal) * 100}%`,
                    background: c.color,
                  }}
                />
              </div>
            </div>
          ))}
          {catBreakdown.length === 0 && (
            <p className="text-konfio-subtle text-[13px]">Sin datos</p>
          )}
        </div>
      </div>

      {/* By Member */}
      <div className="bg-konfio-card border border-konfio-border rounded-2xl p-6">
        <h3 className="text-sm font-bold mb-4 text-konfio-secondary">Por miembro</h3>
        <div className="flex flex-col gap-3.5">
          {memberBreakdown.map((m, i) => (
            <div key={m.name}>
              <div className="flex justify-between mb-1.5 text-[13px]">
                <span className="flex items-center gap-2">
                  <span
                    className="w-[26px] h-[26px] rounded-lg inline-flex items-center justify-center text-[11px] font-bold text-white"
                    style={{ background: `hsl(${i * 60}, 50%, 35%)` }}
                  >
                    {m.name[0]}
                  </span>
                  {m.name}{' '}
                  <span className="text-konfio-muted">({m.count})</span>
                </span>
                <span className="font-mono font-bold">{formatMoney(m.total)}</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-sm overflow-hidden">
                <div
                  className="h-full rounded-sm transition-all duration-500"
                  style={{
                    width: `${(m.total / maxMemberTotal) * 100}%`,
                    background: `hsl(${i * 60}, 60%, 55%)`,
                  }}
                />
              </div>
            </div>
          ))}
          {memberBreakdown.length === 0 && (
            <p className="text-konfio-subtle text-[13px]">Sin datos</p>
          )}
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="md:col-span-2 bg-konfio-card border border-konfio-border rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-konfio-secondary">Últimos gastos</h3>
          <button
            className="bg-white/5 text-konfio-secondary border border-white/[0.08] px-4 py-2 rounded-[10px] cursor-pointer text-xs font-medium transition-all hover:bg-white/10 hover:text-konfio-text"
            onClick={onViewAll}
          >
            Ver todos →
          </button>
        </div>
        {filtered.slice(0, 5).map((exp) => {
          const cat = CATEGORIES.find((c) => c.id === exp.category);
          const st = STATUS_MAP[exp.status];
          return (
            <div
              key={exp.id}
              className="flex items-center gap-3.5 py-2.5 border-b border-white/[0.04] text-[13px]"
            >
              <span className="text-xl">{cat?.icon}</span>
              <span className="flex-1 font-medium">{exp.description}</span>
              <span className="text-konfio-muted text-xs">{exp.member}</span>
              <span
                className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                style={{ background: st.bg, color: st.color }}
              >
                {st.label}
              </span>
              <span className="font-mono font-bold min-w-[100px] text-right">
                {formatMoney(exp.amount)}
              </span>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-konfio-subtle">
            <p className="text-4xl mb-3">🔍</p>
            <p>No hay gastos con estos filtros</p>
          </div>
        )}
      </div>
    </div>
  );
}
