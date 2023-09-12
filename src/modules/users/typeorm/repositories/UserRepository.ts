import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findByUsername(username: string): Promise<User | undefined> {
    return await this.findOne({ where: { username } });
  }

  public async findById(userId: string): Promise<User | undefined> {
    return await this.findOne({ where: { user_id: userId } });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({ where: { email } });
  }
}
