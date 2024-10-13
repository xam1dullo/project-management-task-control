import { UserRole } from "../enums/user-role.enum";

export class User {
  constructor(
    public id: number,
    public name: string,
    public createdBy: number,
    public role?: UserRole,
  ) { }
}
