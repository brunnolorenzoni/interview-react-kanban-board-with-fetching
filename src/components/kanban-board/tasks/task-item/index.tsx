import { Task } from "@models/task";
import TaskRepository from "@/repositories/task-repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotifications from "@/hooks/useNotifications";
import { STAGE_NAMES } from "@/constants/task";

type Props = {
  task: Task;
};

const repository = new TaskRepository();

export default function TaskItem({ task }: Props) {
  const notification = useNotifications(repository.resource);
  const queryClient = useQueryClient();

  const { mutate: moveTask, isPending: isMoving } = useMutation({
    mutationFn: (data: Task) => repository.update(task.name, data),
    onSuccess: (_) => {
      notification.success("Task moved");
      queryClient.refetchQueries({
        queryKey: [repository.resource, "getMany"],
      });
    },
    onError: () => {
      notification.error("Try again later");
    },
  });

  const { mutate: deleteTask, isPending: isDeleting } = useMutation({
    mutationFn: () => repository.delete(task.name),
    onSuccess: (_) => {
      notification.success("Task removed");
      queryClient.refetchQueries({
        queryKey: [repository.resource, "getMany"],
      });
    },
    onError: () => {
      notification.error("Try again later");
    },
  });

  const isStageValid = (stage: number) => {
    return stage >= 0 && stage <= STAGE_NAMES.length;
  };

  const handleMove = (movement: number) => {
    const stage = task.stage + movement;
    if (!isStageValid(stage)) return;

    const update = { stage } as Task;
    moveTask(update);
  };

  const isDisabled = isMoving || isDeleting;

  return (
    <div className="li-content layout-row justify-content-between align-items-center">
      <span data-testid={`${task.name.split(" ").join("-")}-name`}>
        {task.name}
      </span>
      <div className="icons">
        <button
          className="icon-only x-small mx-2"
          data-testid={`${task.name.split(" ").join("-")}-back`}
          onClick={() => handleMove(-1)}
          disabled={isDisabled}
        >
          <i className="material-icons">arrow_back</i>
        </button>
        <button
          className="icon-only x-small mx-2"
          data-testid={`${task.name.split(" ").join("-")}-forward`}
          onClick={() => handleMove(1)}
          disabled={isDisabled}
        >
          <i className="material-icons">arrow_forward</i>
        </button>
        <button
          className="icon-only danger x-small mx-2"
          data-testid={`${task.name.split(" ").join("-")}-delete`}
          onClick={() => deleteTask()}
          disabled={isDisabled}
        >
          <i className="material-icons">delete</i>
        </button>
      </div>
    </div>
  );
}
