import 'reflect-metadata';
import { describe, it, expect, beforeAll } from '@jest/globals';
import { AppError } from '@shared/errors/AppError';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import { CreateUserService } from './CreateUserService';
import { FakeUserRepository } from '../domain/repositories/fakes/FakeUserRepository';
import { IUser } from '../domain/interfaces/IUser';
import { CreateSessionService } from './CreateSessionService';
import { FakeJWTAdapter } from '../infra/adapters/fakes/FakeJWTAdapter';
import { FakeBcryptAdapter } from '../infra/adapters/fakes/FakeBcryptAdapter';

describe('Create Session Service', () => {
  let fakeUserRepository: IUserRepository;
  let createUser: CreateUserService;
  let sut: CreateSessionService;
  let user: IUser;

  beforeAll(async () => {
    fakeUserRepository = new FakeUserRepository();
    createUser = new CreateUserService(fakeUserRepository);
    sut = new CreateSessionService(
      fakeUserRepository,
      new FakeJWTAdapter(),
      new FakeBcryptAdapter(),
    );
    user = await createUser.execute({
      username: 'any_username',
      email: 'any_email@gmail.com',
      password: 'any_password',
    });
  });

  it('should be able to authenticate', async () => {
    const response = await sut.execute({
      email: user.email,
      password: 'any_password',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with unexistent user', async () => {
    await expect(
      sut.execute({
        email: 'wrong_email@gmail.com',
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await expect(
      sut.execute({
        email: user.email,
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
