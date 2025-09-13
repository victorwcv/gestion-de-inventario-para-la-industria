import { useConsumables } from "../hooks/useConsumables";
import { PlusCircle, MinusCircle, Pencil } from "lucide-react";
import type { Consumable } from "../schemas";

type Props = { onEdit: (c: Consumable) => void };

export const ConsumableTable: React.FC<Props> = ({ onEdit }) => {
  const { data, isLoading, adjustStock, isChangingStock } = useConsumables();

  const handleMove = (id: string, delta: number) => {
    if (delta < 0 && !confirm("¿Confirmas salida de stock?")) return;
    adjustStock(id, delta);
  };

  if (isLoading) return <p className="p-4 text-center">Cargando…</p>;

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">SKU</th>
            <th className="px-4 py-2 text-left">Descripción</th>
            <th className="px-4 py-2 text-left">Ubicación</th>
            <th className="px-4 py-2 text-right">Stock</th>
            <th className="px-4 py-2 text-right">Mínimo</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((c) => (
            <tr key={c.id}>
              <td className="px-4 py-2">{c.sku}</td>
              <td className="px-4 py-2">{c.description}</td>
              <td className="px-4 py-2">{c.location || "-"}</td>
              <td
                className={`px-4 py-2 text-right font-semibold ${
                  c.stock <= c.minStock ? "text-red-600" : ""
                }`}
              >
                {c.stock}
              </td>
              <td className="px-4 py-2 text-right">{c.minStock}</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  disabled={isChangingStock}
                  onClick={() => handleMove(c.id, 1)}
                  className="text-green-600 hover:text-green-800"
                >
                  <PlusCircle className="w-5 h-5" />
                </button>
                <button
                  disabled={isChangingStock}
                  onClick={() => handleMove(c.id, -1)}
                  className="text-red-600 hover:text-red-800"
                >
                  <MinusCircle className="w-5 h-5" />
                </button>
                <button
                  disabled={isChangingStock}
                  onClick={() => onEdit(c)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Pencil className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
