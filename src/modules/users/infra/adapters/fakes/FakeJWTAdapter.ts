import {
  IJWTAdapter,
  JWTOptions,
  JWTPayload,
} from '@modules/users/domain/interfaces/IJWTAdapter';

export class FakeJWTAdapter implements IJWTAdapter {
  encode(
    payload: Record<string, string>,
    secret: string,
    opts: JWTOptions,
  ): string {
    return `${opts.subject}-encoded`;
  }

  decode(jwt: string, _secret: string): string | JWTPayload {
    return jwt.replace(/-encoded/, '');
  }
}
