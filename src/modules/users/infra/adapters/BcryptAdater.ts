import bcrypt from 'bcrypt';

export class BcryptAdapter {
  public async compare(
    incomingPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(incomingPassword, hashedPassword);
  }
}
