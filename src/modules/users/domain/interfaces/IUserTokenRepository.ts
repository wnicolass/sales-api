import { IUserToken } from './IUserToken';

export interface IUserTokenRepository {
  findByToken(token: string): Promise<IUserToken | undefined>;
  generate(userId: string): Promise<IUserToken>;
}
