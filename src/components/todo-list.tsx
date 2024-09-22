"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import usePostTask from "@/hooks/tasks/usePostTask";
import useGetAllTask from "@/hooks/tasks/useGetAllTask";


export function TodoListComponent() {
  const { register, onSubmit, errors } = usePostTask();
  const { tasks } = useGetAllTask();
  return (
    <form onSubmit={onSubmit}>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Lista de Tareas</h1>
        <div className="flex mb-4">
          <Input
            type="text"
            {...register("description")}
            placeholder="Nueva tarea"
            className="mr-2"
          />
          <Button type="submit">Agregar</Button>
        </div>
        <ul className="space-y-2">
          {/* Muestra la lista de tareas recibidas */}
          {tasks.map((task, index) => (
            <li
              className="flex items-center justify-between bg-gray-100 p-2 rounded"
              key={index}
            >
              <span>{task.description}</span>
            </li>
          ))}
          {errors.root && <p className="text-red-500">{errors.root.message}</p>}
        </ul>
      </div>
    </form>
  );
}
