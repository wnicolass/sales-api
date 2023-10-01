import 'reflect-metadata';
import { describe, it, expect, beforeAll } from '@jest/globals';
import { AppError } from '@shared/errors/AppError';
import { ICustomerRepository } from '../domain/interfaces/ICustomerRepository';
import { CreateCustomerService } from './CreateCustomerService';
import { FakeCustomerRepository } from '../domain/repositories/fakes/FakeCustomerRespository';

describe('Create Customer Service', () => {
  let fakeCustomerRepository: ICustomerRepository;
  let sut: CreateCustomerService;

  beforeAll(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    sut = new CreateCustomerService(fakeCustomerRepository);
  });

  it('should be able to create a new customer', async () => {
    const anyCustomer = await sut.execute({
      username: 'any_username',
      email: 'any_email@gmail.com',
    });

    expect(anyCustomer).toHaveProperty('customer_id');
  });

  it('should not be able to create two customers with the same email', async () => {
    await expect(
      sut.execute({
        username: 'any_username',
        email: 'any_email@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
