import { IUser } from './IUser';
import { IPagination } from '@shared/interfaces/IPagination';
import { IPaginationParams } from '@shared/interfaces/IPaginationParams';
import { ICreateUserRequest } from './ICreateUserRequest';

export interface IUserRepository {
  findAll({ page, skip, take }: IPaginationParams): Promise<IPagination<IUser>>;
  findByUsername(username: string): Promise<IUser | undefined>;
  findById(userId: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  create({ username, email, password }: ICreateUserRequest): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}
