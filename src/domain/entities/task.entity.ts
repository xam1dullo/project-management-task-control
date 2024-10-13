export class Task {
  constructor(
    public id: number,
    public createdBy: number,
    public createdAt: Date,
    public projectId: number,
    public dueDate: Date,
    public workerUserId: number,
    public status: 'CREATED' | 'IN_PROCESS' | 'DONE',
    public doneAt?: Date,
  ) {}
}
