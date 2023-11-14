export interface Token {
  access_token: string;
}

export interface ILoginBody {
  username: string;
  password: string;
}
export interface UserCustom {
  exp: number;
  iat: number;
  name: string;
  roleId: number;
  sub: string;
  tenantId: string;
  username: string;
}
