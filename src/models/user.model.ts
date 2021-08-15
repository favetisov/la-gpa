import { RoleLevel } from './role-level.model';

export class User {
  id: number;
  token: string;
  name: string;
  roles: Array<RoleLevel> = [];

  constructor(model?: UserServerInterface) {
    if (model) {
      this.id = model.id;
      this.name = model.name;
      this.token = model.token;
      this.roles = model.roles;
    }
  }
}

export class UserServerInterface {
  id: number;
  token: string;
  name: string;
  roles: Array<RoleLevel>;
}
