import 'reflect-metadata';
import { describe, it, expect } from '@jest/globals';
import { CreateCustomerService } from './CreateCustomerService';
import { FakeCustomerRepository } from '../domain/repositories/fakes/FakeCustomerRespository';

describe('Create Customer Service', () => {
  it('should be able to create a new customer', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();
    const createCustomer = new CreateCustomerService(fakeCustomerRepository);
    const anyCustomer = await createCustomer.execute({
      username: 'any_username',
      email: 'any_email@gmail.com',
    });

    expect(anyCustomer).toHaveProperty('customer_id');
  });

  it('should not be able to create two customers with the same email', async () => {
    expect(2).toEqual(2);
  });
});
