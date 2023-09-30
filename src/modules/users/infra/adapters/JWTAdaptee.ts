import { Secret, SignOptions, sign, verify } from 'jsonwebtoken';

export class JWTAdaptee {
  encode(
    payload: string | Buffer | object,
    secretOrPrivateKey: Secret,
    options?: SignOptions,
  ): string {
    return sign(payload, secretOrPrivateKey, options);
  }

  decode(token: string, secret: string) {
    return verify(token, secret);
  }
}
