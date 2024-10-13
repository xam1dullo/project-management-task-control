import { TaskStatus } from "../enums/task-status.enum";

export class Task {
  constructor(
    public id: number,
    public createdBy: number,
    public projectId: number | null,
    public workerUserId: number | null,
    public status: TaskStatus,
    public dueDate?: Date,
    public doneAt?: Date,
  ) { }
}
