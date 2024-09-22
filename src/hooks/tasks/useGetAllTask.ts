import { useEffect, useState } from "react";
import * as signalr from "@microsoft/signalr";
const useGetAllTask = () => {
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

  return {
    tasks,
  };
}
export default useGetAllTask;