import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../entities/Customer';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  public async findByUsername(username: string): Promise<Customer | undefined> {
    return await this.findOne({ where: { username } });
  }

  public async findById(userId: string): Promise<Customer | undefined> {
    return await this.findOne({ where: { user_id: userId } });
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    return await this.findOne({ where: { email } });
  }
}
