import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { ListUserService } from '../../../services/ListUserService';
import { CreateUserService } from '../../../services/CreateUserService';

export class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();
    const users = await listUsers.execute();
    return response.status(200).json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ username, email, password });
    return response.status(201).json(instanceToInstance(user));
  }
}
