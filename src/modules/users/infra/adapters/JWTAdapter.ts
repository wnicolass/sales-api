import {
  IJWTAdapter,
  JWTOptions,
  JWTPayload,
} from '@modules/users/domain/interfaces/IJWTAdapter';
import { JWTAdaptee } from './JWTAdaptee';

export class JWTAdapter implements IJWTAdapter {
  constructor(private adaptee: JWTAdaptee = new JWTAdaptee()) {}

  encode(
    payload: Record<string, string>,
    secret: string,
    opts: JWTOptions,
  ): string {
    return this.adaptee.encode(payload, secret, opts);
  }

  decode(jwt: string, secret: string): string | JWTPayload {
    return this.adaptee.decode(jwt, secret);
  }
}
