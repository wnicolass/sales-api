import { ICreateUserRequest } from './ICreateUserRequest';
import { IUser } from './IUser';

export interface IUserRepository {
  findByUsername(username: string): Promise<IUser | undefined>;
  findById(userId: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  create({ username, email, password }: ICreateUserRequest): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}
