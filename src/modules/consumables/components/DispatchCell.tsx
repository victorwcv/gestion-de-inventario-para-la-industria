import { useState, type FC } from "react";
import { Check, Loader2 } from "lucide-react";
import { useConsumables } from "../hooks/useConsumables";
import type { Row } from "@tanstack/react-table";
import type { Consumable } from "../schemas/consumable.schema";

export const DispatchCell: FC<{ row: Row<Consumable> }> = ({ row }) => {
  const { adjustStock, isChangingStock } = useConsumables();
  const stock: number = row.getValue("stock");
  const id = row.original.id;

  const [qty, setQty] = useState(1);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (qty <= 0 || qty > stock) return;
    adjustStock(id, -qty);
    setQty(1);
    
  };

  return (
    <form onSubmit={handleDispatch} className="flex items-center gap-2">
      <input
        type="number"
        min={1}
        max={stock}
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        disabled={isChangingStock}
        className="w-16 input disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isChangingStock || qty > stock}
        className="p-2 btn-primary disabled:opacity-50"
      >
        {isChangingStock ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Check className="w-5 h-5" />
        )}
      </button>
    </form>
  );
};