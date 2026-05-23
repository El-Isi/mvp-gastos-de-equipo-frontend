'use client';

import { CATEGORIES, MEMBERS, STATUS_MAP } from '@/lib/constants';
import type { ExpenseStatus } from '@/lib/constants';
import type { ExpenseFormData } from '@/components/gastos-equipo';

interface ExpenseFormModalProps {
  form: ExpenseFormData;
  editingId: string | null;
  onFormChange: (updater: ExpenseFormData | ((prev: ExpenseFormData) => ExpenseFormData)) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function ExpenseFormModal({
  form,
  editingId,
  onFormChange,
  onSave,
  onClose,
}: ExpenseFormModalProps) {
  const updateField = (field: keyof ExpenseFormData, value: string) => {
    onFormChange((prev: ExpenseFormData) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-fast"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-konfio-card-dark border border-white/[0.08] rounded-[20px] p-8 w-[90%] max-w-[480px] animate-slide-up-modal"
      >
        <h2 className="text-lg font-bold mb-6">
          {editingId ? '✎ Editar gasto' : '＋ Nuevo gasto'}
        </h2>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-konfio-muted mb-1 block font-semibold uppercase tracking-wide">
                Miembro
              </label>
              <select
                className="w-full bg-white/5 border border-white/10 text-konfio-text py-2.5 px-3.5 rounded-[10px] text-sm outline-none focus:border-konfio-purple appearance-none cursor-pointer"
                value={form.member}
                onChange={(e) => updateField('member', e.target.value)}
              >
                {MEMBERS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-konfio-muted mb-1 block font-semibold uppercase tracking-wide">
                Categoría
              </label>
              <select
                className="w-full bg-white/5 border border-white/10 text-konfio-text py-2.5 px-3.5 rounded-[10px] text-sm outline-none focus:border-konfio-purple appearance-none cursor-pointer"
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] text-konfio-muted mb-1 block font-semibold uppercase tracking-wide">
              Descripción
            </label>
            <input
              className="w-full bg-white/5 border border-white/10 text-konfio-text py-2.5 px-3.5 rounded-[10px] text-sm outline-none focus:border-konfio-purple placeholder:text-konfio-muted"
              placeholder="Ej: Licencia Figma anual"
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-konfio-muted mb-1 block font-semibold uppercase tracking-wide">
                Monto (MXN)
              </label>
              <input
                className="w-full bg-white/5 border border-white/10 text-konfio-text py-2.5 px-3.5 rounded-[10px] text-sm outline-none focus:border-konfio-purple placeholder:text-konfio-muted"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => updateField('amount', e.target.value)}
              />
            </div>
            <div>
              <label className="text-[11px] text-konfio-muted mb-1 block font-semibold uppercase tracking-wide">
                Fecha
              </label>
              <input
                className="w-full bg-white/5 border border-white/10 text-konfio-text py-2.5 px-3.5 rounded-[10px] text-sm outline-none focus:border-konfio-purple"
                type="date"
                value={form.date}
                onChange={(e) => updateField('date', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-konfio-muted mb-1 block font-semibold uppercase tracking-wide">
              Estatus
            </label>
            <div className="flex gap-2">
              {(Object.entries(STATUS_MAP) as [ExpenseStatus, typeof STATUS_MAP.pendiente][]).map(
                ([key, val]) => (
                  <button
                    key={key}
                    onClick={() => updateField('status', key)}
                    className="flex-1 py-2 px-3 rounded-[10px] border-none cursor-pointer text-[13px] font-semibold transition-all"
                    style={{
                      background:
                        form.status === key
                          ? val.bg
                          : 'rgba(255,255,255,0.03)',
                      color: form.status === key ? val.color : '#636E72',
                      outline:
                        form.status === key
                          ? `2px solid ${val.color}`
                          : '2px solid transparent',
                    }}
                  >
                    {val.label}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2.5 mt-7 justify-end">
          <button
            className="bg-white/5 text-konfio-secondary border border-white/[0.08] px-4 py-2 rounded-[10px] cursor-pointer text-sm font-medium transition-all hover:bg-white/10 hover:text-konfio-text"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-5 py-2.5 rounded-[10px] text-sm font-bold text-white border-none cursor-pointer transition-all hover:scale-[1.03] hover:shadow-[0_4px_20px_rgba(108,92,231,0.4)] min-w-[120px]"
            style={{
              background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
            }}
            onClick={onSave}
          >
            {editingId ? 'Guardar cambios' : 'Registrar gasto'}
          </button>
        </div>
      </div>
    </div>
  );
}
