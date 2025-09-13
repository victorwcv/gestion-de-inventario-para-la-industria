import { useConsumables } from "../hooks/useConsumables";
import { format } from "date-fns";

export function ConsumableTable() {
  const { data, isLoading } = useConsumables();

  if (isLoading) return <p className="p-4">Cargando…</p>;

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">SKU</th>
          <th className="px-4 py-2 text-left">Descripción</th>
          <th className="px-4 py-2 text-left">Ubicación</th>
          <th className="px-4 py-2 text-right">Stock</th>
          <th className="px-4 py-2 text-right">Mínimo</th>
          <th className="px-4 py-2 text-left">Último mov.</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((c) => (
          <tr key={c.id}>
            <td className="px-4 py-2">{c.sku}</td>
            <td className="px-4 py-2">{c.description}</td>
            <td className="px-4 py-2">{c.location || "-"}</td>
            <td className="px-4 py-2 text-right">{c.stock}</td>
            <td className="px-4 py-2 text-right">{c.minStock}</td>
            <td className="px-4 py-2">
              {c.lastMovement ? format(c.lastMovement, "dd/MM/yy") : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}