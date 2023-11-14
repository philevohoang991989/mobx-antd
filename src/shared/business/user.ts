export class User {
  id?: number;
  exp?: number;
  iat?: number;
  name?: string;
  roleId?: number;
  sub?: string;
  tenantId?: string;
  username?: string;
  constructor(data: {
    id?: number;
    exp?: number;
    iat?: number;
    name: string;
    roleId?: number;
    sub?: string;
    tenantId?: string;
    username?: string;
  }) {
    this.id = data.id;
    this.exp = data.exp;
    this.iat = data.iat;
    this.name = data.name;
    this.roleId = data.roleId;
    this.sub = data.sub;
    this.tenantId = data.tenantId;
    this.username = data.username;
  }
}
