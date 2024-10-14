import { UserRole } from '@domain/enums';

export class User {
  constructor(
    public name: string,
    public created_by: number,
    public role?: UserRole,
    public id?: number,
  ) { }
}
