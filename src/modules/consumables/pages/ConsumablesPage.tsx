import { useState } from "react";
import { useConsumables } from "../hooks";
import { ConsumableTable, ConsumableFormModal, type FormValues } from "../components";
import { Plus } from "lucide-react";
import type { Consumable } from "../schemas";

export default function ConsumablesPage() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Consumable | undefined>();
  const { addStock, updateStock, isChangingStock } = useConsumables();

  const handleAdd = (data: Omit<Consumable, "id" | "lastMovement">) => {
    addStock.mutate({ ...data, lastMovement: new Date() });
  };

  const handleEdit = (data: FormValues) => {
    if (!editing) return;
    updateStock.mutate({ ...editing, ...data, lastMovement: new Date() });
    setEditing(undefined);
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Insumos</h1>
        <button onClick={() => setOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Agregar
        </button>
      </div>

      <ConsumableTable
        onEdit={(c) => {
          setEditing(c);
          setOpen(true);
        }}
      />

      <ConsumableFormModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(undefined);
        }}
        onSubmit={editing ? handleEdit : handleAdd}
        initial={editing}
        loading={isChangingStock}
      />
    </section>
  );
}
