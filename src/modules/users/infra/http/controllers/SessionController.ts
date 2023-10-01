import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { CreateSessionService } from '../../../services/CreateSessionService';

export class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSessionService);
    const user = await createSession.execute({ email, password });

    return response.status(200).json(instanceToInstance(user));
  }
}
