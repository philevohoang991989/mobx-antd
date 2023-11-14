import {ResponseType} from 'axios';
import {METHOD} from 'constants/http';

export abstract class DTO {
  public abstract param: object | undefined;
  public abstract query: unknown;
  public abstract body: unknown;
  public abstract readonly url: string;
  public abstract readonly method: METHOD;
  public responseType?: ResponseType;
  public headers?: object;
}

export abstract class ResponseDTO {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract readonly data: any;
  public readonly msgSts:
    | {code: string; message: string; listMessage?: string[]}
    | undefined;
}
