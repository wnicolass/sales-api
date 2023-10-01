import bcrypt from 'bcrypt';

export class BcryptAdapter {
  public async compare(
    incomingPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(incomingPassword, hashedPassword);
  }

  public async hash(
    password: string,
    salt: string | number = 10,
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
