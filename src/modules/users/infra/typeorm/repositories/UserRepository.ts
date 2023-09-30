import { Repository, getRepository } from 'typeorm';
import { User } from '../entities/User';
import { IUserRepository } from '@modules/users/domain/interfaces/IUserRepository';
import { ICreateUserRequest } from '@modules/users/domain/interfaces/ICreateUserRequest';
import { IUser } from '@modules/users/domain/interfaces/IUser';

export class UserRepository implements IUserRepository {
  constructor(private ormRepo: Repository<User> = getRepository(User)) {}

  public async create({
    username,
    email,
    password,
  }: ICreateUserRequest): Promise<User> {
    const user = this.ormRepo.create({ username, email, password });

    return user;
  }

  public async save(user: IUser): Promise<User> {
    return await this.ormRepo.save(user);
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    return await this.ormRepo.findOne({ where: { username } });
  }

  public async findById(userId: string): Promise<User | undefined> {
    return await this.ormRepo.findOne({ where: { user_id: userId } });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.ormRepo.findOne({ where: { email } });
  }
}
