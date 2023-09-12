import { EntityRepository, Repository } from 'typeorm';
import { UserToken } from '../entities/UserToken';

@EntityRepository(UserToken)
export class UserTokenRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    return await this.findOne({ where: { token } });
  }

  public async generate(userId: string): Promise<UserToken | undefined> {
    const userToken = this.create({ user_id: userId });
    return await this.save(userToken);
  }
}
