import TasksList from "./tasks-list";
import TaskItem from "./task-item";
import TaskForm from "./task-form";

function Tasks() {}

Tasks.Form = TaskForm;
Tasks.List = TasksList;
Tasks.Item = TaskItem;

export default Tasks;
export { TasksList, TaskItem, TaskForm };
