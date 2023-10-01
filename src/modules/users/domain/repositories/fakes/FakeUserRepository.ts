import { randomUUID } from 'node:crypto';
import { IUser } from '@modules/users/domain/interfaces/IUser';
import { IPagination } from '@shared/interfaces/IPagination';
import { IUserRepository } from '@modules/users/domain/interfaces/IUserRepository';
import { IPaginationParams } from '@shared/interfaces/IPaginationParams';
import { FakeBcryptAdapter } from './FakeBcryptAdapter';
import { ICreateUserRequest } from '@modules/users/domain/interfaces/ICreateUserRequest';

export class FakeUserRepository implements IUserRepository {
  private users: IUser[] = [];

  public async create({
    username,
    email,
    password,
  }: ICreateUserRequest): Promise<IUser> {
    return new Promise((res) => {
      const user: IUser = {
        user_id: randomUUID(),
        username,
        email,
        password,
        created_at: new Date(),
        updated_at: new Date(),
        avatar: '',
        getAvatarUrl() {
          return null;
        },
        async hashPassword() {
          const fakeBcryptAdapter = new FakeBcryptAdapter();
          this.password = await fakeBcryptAdapter.hash(this.password);
          return;
        },
      };
      user.hashPassword();
      this.users.push(user);

      return res(user);
    });
  }

  public async save(user: IUser): Promise<IUser> {
    return new Promise((res) => {
      const userIndex = this.users.findIndex(
        (dbUser) => dbUser.user_id === user.user_id,
      );
      this.users[userIndex] = user;
      return res(user);
    });
  }

  public async findAll({
    page,
    skip,
    take,
  }: IPaginationParams): Promise<IPagination<IUser>> {
    return {
      current_page: page,
      total: this.users.length,
      per_page: take,
      data: this.users,
    };
  }

  public async findByUsername(username: string): Promise<IUser | undefined> {
    return new Promise((res) =>
      res(this.users.find((user) => user.username === username)),
    );
  }

  public async findById(userId: string): Promise<IUser | undefined> {
    return new Promise((res) =>
      res(this.users.find((user) => user.user_id === userId)),
    );
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    return new Promise((res) =>
      res(this.users.find((user) => user.email === email)),
    );
  }
}
