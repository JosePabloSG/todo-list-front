import { postTaskItem } from "@/server/actions";
import { TaskItem } from "@/types/TaskItem";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const usePostTask = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data: TaskItem) => await postTaskItem(data),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutation.mutateAsync(data as TaskItem);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError("root", {
        type: "manual",
        message: error.response.data.Description,
      });
      console.log(error.response.data.Description);
    }
  });
  return {
    onSubmit,
    register,
    mutation,
    errors,
  };
};
export default usePostTask;
