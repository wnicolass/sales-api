import { Request, Response } from 'express';
import { ListUserService } from '../services/ListUserService';
import { CreateUserService } from '../services/CreateUserService';

export class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();
    const users = await listUsers.execute();
    return response.status(200).json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    return response.status(201).json(user);
  }
}
