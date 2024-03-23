import { Task } from "@/models/task";
import TaskItem from "@/components/kanban-board/tasks/task-item";

type Props = {
  tasks: Task[] | undefined;
  stage: number;
};

export default function TasksList({ stage, tasks }: Props) {
  if (!tasks) return;

  const filteredTasks = tasks.filter((task) => {
    return task.stage === stage;
  });

  return (
    <ul
      className="styled mt-50"
      data-testid={`stage-${stage}`}
    >
      {filteredTasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
        />
      ))}
    </ul>
  );
}
