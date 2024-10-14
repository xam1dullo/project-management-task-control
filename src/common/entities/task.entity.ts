import { TaskStatus } from '../../domain/enums/task-status.enum';

export class Task {
  constructor(
    public name: string,
    public created_by: number,
    public status: TaskStatus,
    public due_date?: Date,
    public done_at?: Date,
    public project_id?: number | null,
    public worker_user_id?: number | null,
  ) { }
}
