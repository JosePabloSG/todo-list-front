import { postTaskItem } from "@/server/actions";
import { TaskItem } from "@/types/TaskItem";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const usePostTask = () => {
  const { handleSubmit, register } = useForm();

  const mutation = useMutation({
    mutationFn: async (data: TaskItem) => await postTaskItem(data),
  });
  
  const onSubmit = handleSubmit(async (data) => {
    await mutation.mutateAsync(data as TaskItem);
  });

  return {
    onSubmit,
    register,
    mutation,
  };
};
export default usePostTask;
