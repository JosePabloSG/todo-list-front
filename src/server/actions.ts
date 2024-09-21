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
  const data = await res.json();

  return data;
}
