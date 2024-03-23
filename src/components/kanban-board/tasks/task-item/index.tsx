import { Task as TaskModel } from "@models/task";

type Props = {
  task: TaskModel;
};

export default function TaskItem({ task }: Props) {
  return (
    <div className="li-content layout-row justify-content-between align-items-center">
      <span data-testid={`${task.name.split(" ").join("-")}-name`}>
        {task.name}
      </span>
      <div className="icons">
        <button
          className="icon-only x-small mx-2"
          data-testid={`${task.name.split(" ").join("-")}-back`}
        >
          <i className="material-icons">arrow_back</i>
        </button>
        <button
          className="icon-only x-small mx-2"
          data-testid={`${task.name.split(" ").join("-")}-forward`}
        >
          <i className="material-icons">arrow_forward</i>
        </button>
        <button
          className="icon-only danger x-small mx-2"
          data-testid={`${task.name.split(" ").join("-")}-delete`}
        >
          <i className="material-icons">delete</i>
        </button>
      </div>
    </div>
  );
}
