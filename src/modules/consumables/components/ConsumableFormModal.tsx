import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { consumableSchema, type Consumable } from "../schemas/consumable.schema";

type FormValues = Omit<Consumable, "id" | "lastMovement">;

export function ConsumableFormModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(consumableSchema.omit({ id: true, lastMovement: true })),
  });

  const submit = (data: FormValues) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-50">
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
            <Dialog.Panel className="bg-white rounded p-6 w-full max-w-md">
              <Dialog.Title className="text-lg font-bold mb-4">Nuevo Insumo</Dialog.Title>

              <form onSubmit={handleSubmit(submit)} className="space-y-4">
                <input {...register("sku")} placeholder="SKU" className="input" />
                {errors.sku && <span className="text-red-600 text-sm">{errors.sku.message}</span>}

                <input {...register("description")} placeholder="Descripción" className="input" />
                {errors.description && <span className="text-red-600 text-sm">{errors.description.message}</span>}

                <select {...register("unit")} className="input">
                  <option value="m">m</option>
                  <option value="ud">ud</option>
                  <option value="kg">kg</option>
                  <option value="L">L</option>
                  <option value="rollo">rollo</option>
                </select>

                <input type="number" {...register("stock", { valueAsNumber: true })} placeholder="Stock inicial" className="input" />
                {errors.stock && <span className="text-red-600 text-sm">{errors.stock.message}</span>}

                <input type="number" {...register("minStock", { valueAsNumber: true })} placeholder="Stock mínimo" className="input" />
                {errors.minStock && <span className="text-red-600 text-sm">{errors.minStock.message}</span>}

                <input {...register("location")} placeholder="Ubicación" className="input" />

                <div className="flex justify-end gap-2">
                  <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
                  <button type="submit" className="btn-primary">Guardar</button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}