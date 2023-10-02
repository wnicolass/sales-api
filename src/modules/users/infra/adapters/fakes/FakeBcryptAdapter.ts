export class FakeBcryptAdapter {
  public async compare(
    incomingPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return new Promise((res) =>
      res(`${incomingPassword}-hashed` === hashedPassword),
    );
  }

  public async hash(
    password: string,
    _salt: string | number = 10,
  ): Promise<string> {
    return new Promise((res) => res(`${password}-hashed`));
  }
}
