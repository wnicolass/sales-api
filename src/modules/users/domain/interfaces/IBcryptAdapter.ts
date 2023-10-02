export interface IBcryptAdapter {
  compare(incomingPassword: string, hashedPassword: string): Promise<boolean>;
  hash(password: string, salt: string | number): Promise<string>;
}
