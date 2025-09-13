import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Consumable } from "@/modules/consumables/schemas";
import { mockConsumables } from "@/shared/lib/mockConsumables";
import { v4 as uuid } from "uuid";

const QUERY_KEY = ["consumables"];

// Simula API local
const getAll = async (): Promise<Consumable[]> =>
  new Promise((res) => setTimeout(() => res(mockConsumables), 300));

const create = async (dto: Omit<Consumable, "id">): Promise<Consumable> =>
  new Promise((res) =>
    setTimeout(() => {
      const created: Consumable = { ...dto, id: uuid() };
      mockConsumables.push(created);
      res(created);
    }, 300)
  );

const update = async (dto: Consumable): Promise<Consumable> =>
  new Promise((res) =>
    setTimeout(() => {
      const idx = mockConsumables.findIndex((c) => c.id === dto.id);
      if (idx !== -1) mockConsumables[idx] = dto;
      res(dto);
    }, 300)
  );

export function useConsumables() {
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getAll,
  });

  const addMutation = useMutation({
    mutationFn: create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  const updateMutation = useMutation({
    mutationFn: update,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  // Helper entrada/salida
  const adjustStock = (id: string, delta: number) => {
    const item = data.find((c) => c.id === id);
    if (!item) return;
    const updated: Consumable = {
      ...item,
      stock: item.stock + delta,
      lastMovement: new Date(),
    };
    updateMutation.mutate(updated);
  };

  return {
    data,
    isLoading,
    add: addMutation.mutate,
    update: updateMutation.mutate,
    adjustStock,
  };
}