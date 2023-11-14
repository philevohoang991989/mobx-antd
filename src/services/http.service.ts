import axios, {AxiosResponse} from 'axios';
import {ENDPOINT} from 'constants/endpoint';
import {STATUS_CODE} from 'constants/status';
import {Service} from 'typedi';
import {API_HOST} from '../environment/environment';
import {message} from 'antd';
import jwtDecode from 'jwt-decode';
import {getCookie} from 'utils/string.util';
import {ResponseDTO, DTO} from 'shared/dto/base.dto';
import {storageKeys} from 'constants/storage-keys';

export interface ITokenInfo {
  exp: number;
  iat: number;
  role: number;
  userId: number;
  username: string;
}

@Service()
export class HttpService {
  public token: string | undefined;

  constructor() {
    this.token = getCookie(storageKeys.USER_ACCESS_TOKEN) || undefined;
    axios.interceptors.response.use(
      (response: AxiosResponse<ResponseDTO>) => {
        if (response.data && response.data.data && response.data.data.token) {
          localStorage.setItem(
            storageKeys.USER_ACCESS_TOKEN,
            response.data.data.token,
          );
          this.token = response.data.data.token;
        }
        return response;
      },
      (error) => {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.msgSts
        ) {
          if (
            error.response.data.msgSts.message === STATUS_CODE.TOKEN_INVALID
          ) {
            localStorage.clear();
            this.token = undefined;
            window.location.href = '/';
          }
          if (error.response.data.msgSts.message === STATUS_CODE.FAILED) {
            message.error('Lỗi hệ thống');
          }
          return error.response;
        }
        return Promise.reject(error.response);
      },
    );
  }

  public getTokenInfo(): {exp: number} | undefined {
    return this.token ? jwtDecode(this.token) : undefined;
  }

  public async request<T extends DTO>(dto: T): Promise<ResponseDTO> {
    const user = (this.token ? jwtDecode(this.token) : undefined) as ITokenInfo;
    try {
      const response = await axios({
        method: dto.method,
        headers: {
          Authorization: this.token ? 'Bearer ' + this.token : '',
          'X-Frame-Options': 'DENY', // Prevent Clickjacking
          'Content-Security-Policy': "frame-ancestors 'self';",
          'x-amzn-oidc-identity': user && user.userId ? user.userId : '',
          ...dto.headers,
        },
        baseURL: API_HOST + ENDPOINT.BASE_URL,
        url: this.replaceURLToParamURL(dto.url, dto.param || {}),
        data: dto.body,
        params: dto.query,
        responseType: dto.responseType,
      });
      return {
        data: response.data.data || response.data,
        msgSts: response.data.msgSts || {
          code: STATUS_CODE.SUCCESS,
          message: 'Get data success',
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (errorResponse: any) {
      return {
        data: errorResponse?.data?.data,
        msgSts: errorResponse?.data?.msgSts || {
          code: STATUS_CODE.FAILED,
          message: 'Get data fail',
        },
      };
    }
  }

  private replaceURLToParamURL = (url: string, param: object): string => {
    let newUrl = url;
    Object.entries(param).forEach(([key, value]) => {
      newUrl = newUrl.replace(':' + key.toString(), value.toString());
    });
    return newUrl;
  };
}
