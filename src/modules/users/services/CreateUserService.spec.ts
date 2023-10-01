import 'reflect-metadata';
import { describe, it, expect, beforeAll } from '@jest/globals';
import { AppError } from '@shared/errors/AppError';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import { CreateUserService } from './CreateUserService';
import { FakeUserRepository } from '../domain/repositories/fakes/FakeUserRepository';

describe('Create User Service', () => {
  let fakeUserRepository: IUserRepository;
  let sut: CreateUserService;

  beforeAll(() => {
    fakeUserRepository = new FakeUserRepository();
    sut = new CreateUserService(fakeUserRepository);
  });

  it('should be able to create a new user', async () => {
    const anyCustomer = await sut.execute({
      username: 'any_username',
      email: 'any_email@gmail.com',
      password: 'any_password',
    });

    expect(anyCustomer).toHaveProperty('user_id');
  });

  it('should not be able to create two users with the same email', async () => {
    await expect(
      sut.execute({
        username: 'any_username',
        email: 'any_email@gmail.com',
        password: 'any_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
