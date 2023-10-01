import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { ListUserService } from '../../../services/ListUserService';
import { CreateUserService } from '../../../services/CreateUserService';

export class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page, limit } = request.query;
    const listUsers = container.resolve(ListUserService);
    const users = await listUsers.execute({
      page: page ? +page : 1,
      limit: limit ? +limit : 15,
    });
    return response.status(200).json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ username, email, password });
    return response.status(201).json(instanceToInstance(user));
  }
}
