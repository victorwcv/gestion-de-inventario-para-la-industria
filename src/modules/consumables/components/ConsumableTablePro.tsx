import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { useConsumables } from "../hooks/useConsumables";
import { type Consumable } from "../schemas/consumable.schema";
import { ArrowUpDown, Search, Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { ConsumableTableSkeleton } from "./ConsumableTableSkeleton";
import { motion } from "framer-motion";
import { ConsumableFormModal, DispatchCell } from "@/modules/consumables/components";

const columns: ColumnDef<Consumable>[] = [
  {
    id: "edit",
    header: "Editar",
    cell: ({ row }) => <EditCell row={row} />,
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <button className="flex items-center gap-1" onClick={() => column.toggleSorting()}>
        SKU <ArrowUpDown className="w-4 h-4" />
      </button>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <button className="flex items-center gap-1" onClick={() => column.toggleSorting()}>
        Descripción <ArrowUpDown className="w-4 h-4" />
      </button>
    ),
  },
  {
    accessorKey: "location",
    header: "Ubicación",
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <button className="flex items-center gap-1" onClick={() => column.toggleSorting()}>
        Stock <ArrowUpDown className="w-4 h-4" />
      </button>
    ),
    cell: ({ row }) => {
      const stock = row.getValue<number>("stock");
      const unit = row.original.unit;
      const minStock = row.original.minStock;
      return (
        <span className={cn("font-semibold", stock <= minStock && "text-red-600")}>
          {stock} {unit}{" "}
        </span>
      );
    },
  },
  {
    accessorKey: "minStock",
    header: "Mínimo",
  },
  {
    id: "dispatch",
    header: "Despacho",
    cell: ({ row }) => <DispatchCell row={row} />,
  },
];

export const ConsumableTablePro = () => {
  const { data, isLoading } = useConsumables();
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <ConsumableTableSkeleton />;

  return (
    !isLoading && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-4">
          {/* Buscador */}
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Buscar..."
              className="max-w-sm input"
            />
          </div>

          {/* Tabla */}
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-muted">
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left text-sm font-medium text-foreground"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t border-border table-row">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-sm text-foreground">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {table.getFilteredRowModel().rows.length} filas
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="btn-secondary"
              >
                Anterior
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="btn-secondary"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  );
};

const EditCell: React.FC<{ row: Row<Consumable> }> = ({ row }) => {
  const [open, setOpen] = useState(false);
  const consumable = row.original as Consumable;
  const { updateStock } = useConsumables();

  const handleSave = (data: Omit<Consumable, "id" | "lastMovement">) => {
    updateStock.mutate({ ...consumable, ...data, lastMovement: new Date() });
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="p-2 opacity-50 hover:text-green-500">
        <Pencil className="w-5 h-5" />
      </button>
      <ConsumableFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSave}
        initial={consumable}
      />
    </>
  );
};

