export interface IBcryptAdapter {
  compare(incomingPassword: string, hashedPassword: string): Promise<boolean>;
}
