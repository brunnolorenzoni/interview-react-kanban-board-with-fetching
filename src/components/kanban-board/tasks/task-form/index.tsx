import { FormEvent, useRef } from "react";
import { Task } from "@models/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TaskRepository from "@/repositories/task-repository";
import useNotifications from "@hooks/useNotifications";
import useForm from "@/hooks/useForm";
import classNames from "classnames";

const repository = new TaskRepository();

export default function TaskForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const notification = useNotifications(repository.resource);
  const { errors, dispatchErrors, clearForm } = useForm();
  const queryClient = useQueryClient();

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: (data: Task) => repository.create(data),
    onSuccess: (_) => {
      notification.success("Task added");
      clearForm(formRef.current!);
      queryClient.getQueryData([repository.resource]);
      queryClient.refetchQueries({
        queryKey: [repository.resource, "getMany"],
      });
    },
    onError: (error) => {
      notification.error(error.message);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const taskName = inputRef.current?.value;

    if (!taskName) {
      return dispatchErrors({
        type: "set-error",
        inputKey: "create-task-input",
      });
    }

    mutate({
      name: taskName,
      stage: 0,
    });
  };

  const inputClassName = classNames({
    large: true,
    error: errors["create-task-input"],
  });

  return (
    <section className="mt-50 layout-row align-items-center justify-content-center">
      <form
        className="w-100"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="w-100 inline-flex wrap align-items-start justify-content-center">
          <div className="mx-12 my-12">
            <input
              ref={inputRef}
              id="create-task-input"
              type="text"
              className={inputClassName}
              placeholder="New task name"
              data-testid="create-task-input"
              disabled={isSubmitting}
              autoComplete="off"
            />
            {errors["create-task-input"] && (
              <div className="text-start error-text">Name is required</div>
            )}
          </div>
          <div className="flex justify-content-center mx-12 my-12">
            <button
              type="submit"
              className="my-0 mx-0"
              data-testid="create-task-button"
              disabled={isSubmitting}
            >
              Create task
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
