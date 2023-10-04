import { IUserToken } from './IUserToken';

export interface IUserTokenRepository {
  findByToken(token: string): Promise<IUserToken | null>;
  generate(userId: string): Promise<IUserToken>;
}
