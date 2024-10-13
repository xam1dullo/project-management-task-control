export class Project {
  constructor(
    public id: number,
    public orgId: number,
    public createdBy: number,
    public name: string,
    public description: string,
  ) {}
}
