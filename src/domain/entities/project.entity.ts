export class Project {
  constructor(
    public id: number,
    public orgId: number | null,
    public createdBy: number,
    public name: string,
    public description?: string,
  ) { }
}
