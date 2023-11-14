/* eslint-disable @typescript-eslint/no-explicit-any */
import {action, observable, runInAction} from 'mobx';
// import { ActiveAccountDTO, ActiveAccountResponse } from 'src/model/dto/active-account.dto';
// import { LoginDTO } from 'src/model/dto/login.dto';
import {storageKeys} from 'constants/storage-keys';
import jwtDecode from 'jwt-decode';
import {ResponseDTO} from 'shared/dto/base.dto';
import {LoginDTO} from 'shared/dto/auth.dto';
import Container, {Service} from 'typedi';
import {HttpService} from './http.service';
import {User} from 'shared/business/user';
import {getCookie} from 'utils/string.util';

@Service()
export class AuthService {
  @observable
  user?: User;
  @observable
  httpService = Container.get(HttpService);
  resetToken?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  role: any;

  constructor() {
    const user = localStorage.getItem(storageKeys.USER_INFO);
    user && (this.user = JSON.parse(user));
  }

  handleInfoAuth(data: any) {
    return {
      id: data.id,
      exp: data?.exp,
      iat: data.iat,
      name: data.name,
      roleId: data.roleId,
      sub: data.sub,
      tenantId: data.tenantId,
      username: data.username,
    };
  }
  @action.bound
  setUser(user: Partial<User>) {
    if (this.user) {
      this.user = {...this.user, ...user};
      localStorage.setItem(storageKeys.USER_INFO, JSON.stringify(this.user));
    }
  }

  @action.bound
  getUser() {
    return this.user;
  }
  async signIn(loginDTO: LoginDTO): Promise<ResponseDTO> {
    const {data, msgSts} = await this.httpService.request(loginDTO);
    const token = data?.access_token || '';
    const decoded: any = JSON.stringify(jwtDecode(token));
    const userLocal: any = JSON.stringify(decoded);
    runInAction(() => (this.user = this.handleInfoAuth(userLocal)));

    try {
      if (data?.access_token) {
        localStorage.setItem(storageKeys.USER_ACCESS_TOKEN, data.access_token);
      }

      const token = data?.access_token || '';
      const decoded: any = jwtDecode(token);
      const userLocal = JSON.stringify(decoded);
      localStorage.setItem(storageKeys.USER_INFO, userLocal);
      localStorage.setItem(storageKeys.ROLE_ID, JSON.stringify(decoded.roleId));

      return {data, msgSts};
    } catch {
      return {data, msgSts};
    }
  }
  isSignedIn(): boolean {
    return getCookie(storageKeys.USER_ACCESS_TOKEN) !== null;
  }
}
