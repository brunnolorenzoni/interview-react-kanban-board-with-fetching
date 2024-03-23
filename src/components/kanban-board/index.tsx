import { TaskForm } from "@components/kanban-board/tasks";
import Board from "@components/kanban-board/board";

export default function KanbanBoard() {
  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <TaskForm />
      <Board />
    </div>
  );
}
