import { Task } from "../models/task";
import { BaseRepository } from "./base-repository";

export default class TaskRepository extends BaseRepository<Task> {
  resource = 'tasks';

  getMany() {
    return super.getMany();
  }

  get(id: string) {
    return super.get(id);
  }

  create(data: Task) {
    return super.create(data);
  }

  update(id: string, data: Task) {
    return super.update(id, data);
  }

  delete(id: string) {
    return super.delete(id);
  }
}
