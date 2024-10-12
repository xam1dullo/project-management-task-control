export class User {
  constructor(
    public id: number,
    public name: string,
    public role: 'Admin' | 'Manager' | 'Employee',
    public createdBy: number,
  ) { }
}
