export interface JWTOptions {
  subject?: string;
  expiresIn?: string | number;
}

export interface JWTPayload {
  [key: string]: unknown;
}

export interface IJWTAdapter {
  encode(
    payload: Record<string, string>,
    secret: string,
    opts: JWTOptions,
  ): string;
  decode(jwt: string, secret: string): string | JWTPayload;
}
