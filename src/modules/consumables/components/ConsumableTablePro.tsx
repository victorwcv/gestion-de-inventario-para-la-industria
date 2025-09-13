import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useConsumables } from "../hooks/useConsumables";
import { type Consumable } from "../schemas/consumable.schema";
import { ArrowUpDown, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { ConsumableTableSkeleton } from "./ConsumableTableSkeleton";
import { motion } from "framer-motion";

const columns: ColumnDef<Consumable>[] = [
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
      const minStock = row.original.minStock;
      return (
        <span className={cn("font-semibold", stock <= minStock && "text-red-600")}>{stock}</span>
      );
    },
  },
  {
    accessorKey: "minStock",
    header: "Mínimo",
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
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-muted ">
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
                  <tr key={row.id} className="border-t border-border">
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
