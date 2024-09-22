import { TaskItem } from "@/types/TaskItem";

export async function postTaskItem(taskItem: TaskItem) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskItem),
  };

  const res = await fetch("https://localhost:7135/api/Task", options);
  if (!res.ok) {
  }
  const data = await res.json();
  if (!res.ok) {
    // Lanza el error con los detalles de la respuesta
    throw {
      message: data?.title || "An error occurred",
      response: {
        status: res.status,
        data: data.errors, // Aquí obtienes los errores de validación
        traceId: data?.traceId,
      },
    };
  }

  return data;
}
