'use client';

interface HeaderProps {
  view: string;
  onChangeView: (view: 'dashboard' | 'lista') => void;
  onNewExpense: () => void;
}

export default function Header({ view, onChangeView, onNewExpense }: HeaderProps) {
  return (
    <header
      className="px-8 py-6 border-b border-konfio-border flex items-center justify-between flex-wrap gap-4"
      style={{
        background: 'linear-gradient(180deg, rgba(108,92,231,0.06) 0%, transparent 100%)',
      }}
    >
      <div className="flex items-center gap-3.5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
          }}
        >
          $
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight leading-tight">
            Gastos de Equipo
          </h1>
          <p className="text-xs text-konfio-muted font-mono">
            TSO · Expedientes
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <button
          className={`px-4 py-2 rounded-[10px] text-sm font-medium border transition-all cursor-pointer ${
            view === 'dashboard'
              ? 'bg-konfio-purple/15 text-konfio-purple-light border-konfio-purple/30'
              : 'bg-white/5 text-konfio-secondary border-white/[0.08] hover:bg-white/10 hover:text-konfio-text'
          }`}
          onClick={() => onChangeView('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`px-4 py-2 rounded-[10px] text-sm font-medium border transition-all cursor-pointer ${
            view === 'lista'
              ? 'bg-konfio-purple/15 text-konfio-purple-light border-konfio-purple/30'
              : 'bg-white/5 text-konfio-secondary border-white/[0.08] hover:bg-white/10 hover:text-konfio-text'
          }`}
          onClick={() => onChangeView('lista')}
        >
          📋 Lista
        </button>
        <button
          className="px-5 py-2.5 rounded-[10px] text-sm font-bold text-white border-none cursor-pointer transition-all hover:scale-[1.03] hover:shadow-[0_4px_20px_rgba(108,92,231,0.4)]"
          style={{
            background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
          }}
          onClick={onNewExpense}
        >
          + Nuevo gasto
        </button>
      </div>
    </header>
  );
}
