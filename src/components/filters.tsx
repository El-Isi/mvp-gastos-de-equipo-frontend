'use client';

import { CATEGORIES, MEMBERS } from '@/lib/constants';

interface FiltersProps {
  filterCat: string;
  filterMember: string;
  onFilterCat: (val: string) => void;
  onFilterMember: (val: string) => void;
  onClear: () => void;
  onReset: () => void;
}

export default function Filters({
  filterCat,
  filterMember,
  onFilterCat,
  onFilterMember,
  onClear,
  onReset,
}: FiltersProps) {
  const hasFilters = filterCat !== 'all' || filterMember !== 'all';

  return (
    <div className="flex gap-2.5 mb-6 flex-wrap items-center animate-slide-up-slow">
      <span className="text-xs text-konfio-muted font-medium">Filtros:</span>
      <select
        className="bg-white/5 border border-white/10 text-konfio-text py-1.5 pl-3 pr-7 rounded-[10px] text-[13px] outline-none focus:border-konfio-purple appearance-none cursor-pointer"
        value={filterCat}
        onChange={(e) => onFilterCat(e.target.value)}
      >
        <option value="all">Todas las categorías</option>
        {CATEGORIES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.icon} {c.label}
          </option>
        ))}
      </select>
      <select
        className="bg-white/5 border border-white/10 text-konfio-text py-1.5 pl-3 pr-7 rounded-[10px] text-[13px] outline-none focus:border-konfio-purple appearance-none cursor-pointer"
        value={filterMember}
        onChange={(e) => onFilterMember(e.target.value)}
      >
        <option value="all">Todos los miembros</option>
        {MEMBERS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      {hasFilters && (
        <button
          className="bg-white/5 text-konfio-secondary border border-white/[0.08] px-3 py-1.5 rounded-[10px] cursor-pointer text-xs font-medium transition-all hover:bg-white/10 hover:text-konfio-text"
          onClick={onClear}
        >
          ✕ Limpiar
        </button>
      )}
      <div className="flex-1" />
      <button
        className="bg-white/5 text-konfio-muted border border-white/[0.08] px-2.5 py-1 rounded-[10px] cursor-pointer text-[11px] font-medium transition-all hover:bg-white/10 hover:text-konfio-text"
        onClick={onReset}
      >
        ↺ Reset demo
      </button>
    </div>
  );
}
