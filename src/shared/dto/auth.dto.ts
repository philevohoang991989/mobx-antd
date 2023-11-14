import {ENDPOINT} from 'constants/endpoint';
import {DTO} from './base.dto';
import {METHOD} from 'constants/http';
import {ILoginBody} from 'interfaces';

export class LoginResponse {
  access_token: string;
  constructor(data: {access_token: string}) {
    this.access_token = data.access_token;
  }
}

export class LoginDTO extends DTO {
  public param: undefined;
  public url = ENDPOINT.LOGIN;
  public method = METHOD.POST;
  body: ILoginBody;
  public readonly responseClass = LoginResponse;
  public query: undefined;
  public headers: object;
  constructor(body: ILoginBody) {
    super();
    this.body = body;
    this.headers = {Authorization: undefined};
  }
}
