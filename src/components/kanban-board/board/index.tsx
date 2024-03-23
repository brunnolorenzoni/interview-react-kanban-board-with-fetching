import { STAGE_NAMES } from "@constants/task";
import TaskRepository from "@repositories/task-repository";
import { TasksList } from "@components/kanban-board/tasks";
import { useQuery } from "@tanstack/react-query";
import "./index.css";

const repository = new TaskRepository();

export default function Board() {
  const {
    isLoading,
    data: tasks,
    isError,
  } = useQuery({
    queryKey: [repository.resource, "getMany"],
    queryFn: () => repository.getMany(),
  });

  return (
    <div className="board mt-50">
      <div className="board__container board__scrollable-container">
        {STAGE_NAMES.map((stage, index) => {
          return (
            <div
              className="card outlined"
              key={`stage-${index}`}
            >
              <div className="card-text">
                <h4>{stage}</h4>
                {isLoading && (
                  <div className="card-fallback">
                    <i className="card-fallback__icon material-icons">
                      hourglass_empty
                    </i>
                    <p className="card-fallback__name my-2">Loading</p>
                  </div>
                )}
                {isError && (
                  <div className="card-fallback">
                    <i className="card-fallback__icon material-icons">error</i>
                    <p className="card-fallback__name my-2">
                      Sorry, try again later
                    </p>
                  </div>
                )}
                <TasksList
                  stage={index}
                  tasks={tasks}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
