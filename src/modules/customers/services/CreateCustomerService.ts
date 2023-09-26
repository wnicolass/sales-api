import { injectable, inject } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { ICustomer } from '../domain/interfaces/ICustomer';
import { ICreateCustomer } from '../domain/interfaces/ICreateCustomer';
import { ICustomerRepository } from '../domain/interfaces/ICustomerRepository';

@injectable()
export class CreateCustomerService {
  constructor(
    @inject('CustomerRepository') private repository: ICustomerRepository,
  ) {}

  public async execute({
    username,
    email,
  }: ICreateCustomer): Promise<ICustomer> {
    const emailAlreadyExists = !!(await this.repository.findByEmail(email));

    if (emailAlreadyExists) {
      throw new AppError(`Email "${email}" already in use`);
    }

    return await this.repository.create({ username, email });
  }
}
