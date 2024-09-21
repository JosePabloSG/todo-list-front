"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import usePostTask from "@/hooks/tasks/usePostTask";
import * as signalr from "@microsoft/signalr";

export function TodoListComponent() {
  const { register, onSubmit } = usePostTask();

  // Estado para las tareas recibidas en tiempo real
  const [tasks, setTasks] = useState<{ id: number; description: string }[]>([]);

  useEffect(() => {
    const connection = new signalr.HubConnectionBuilder()
      .withUrl("https://localhost:7135/TaskHub")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log("Connected to the SignalR hub");

        connection.on(
          "ReceiveTaskNotification",
          (taskItem: { id: number; description: string }) => {
            console.log("New task received:", taskItem);

            // Actualiza el estado con la nueva tarea
            setTasks((prevTasks) => [...prevTasks, taskItem]);
          }
        );
      })
      .catch((err) =>
        console.error("Error while starting SignalR connection: ", err)
      );

    return () => {
      connection.stop();
    };
  }, []);

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
        </ul>
      </div>
    </form>
  );
}
