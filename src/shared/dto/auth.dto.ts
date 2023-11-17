import {ENDPOINT} from 'constants/endpoint';
import {DTO} from './base.dto';
import {METHOD} from 'constants/http';
import {ILoginBody} from 'interfaces';
export class ForgotPassBody {
  public email!: string;
}
export class ResetPassResponse {
  public message!: string;
  public timestamp!: string;
}
export class ResetPassQuery {
  public password!: string;
  public token!: string;
}
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
export class ForgotPassDTO extends DTO {
  public static url = ENDPOINT.FORGOT_PASSWORD;
  public url = ForgotPassDTO.url;
  public method = METHOD.POST;
  public query: undefined;
  public param: undefined;

  constructor(public body: ForgotPassBody) {
    super();
  }
}
export class ResetPassDTO extends DTO {
  public param: undefined;
  public url = ENDPOINT.RESET_PASS;
  public method = METHOD.POST;
  public readonly responseClass = ResetPassResponse;
  public query: undefined;
  constructor(public body: ResetPassQuery) {
    super();
  }
}
