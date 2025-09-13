import { useState } from "react";
import { useConsumables } from "../hooks";
import { ConsumableTable, ConsumableFormModal } from "../components";
import { Plus } from "lucide-react";
import type { Consumable } from "../schemas";

export default function ConsumablesPage() {
  const [open, setOpen] = useState(false);
  const { add } = useConsumables();

  const handleAdd = (data: Omit<Consumable, "id" | "lastMovement">) => {
    add({ ...data, lastMovement: new Date() });
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Insumos</h1>
        <button onClick={() => setOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Agregar
        </button>
      </div>

      <ConsumableTable />

      <ConsumableFormModal open={open} onClose={() => setOpen(false)} onSubmit={handleAdd} />
    </section>
  );
}