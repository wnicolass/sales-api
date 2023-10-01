import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { ShowProfileService } from '../../../services/ShowProfileService';
import { UpdateProfileService } from '../../../services/UpdateProfileService';

export class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ userId });
    return response.status(200).json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const { username, email, password, oldPassword } = request.body;
    const updateProfile = container.resolve(UpdateProfileService);
    const user = await updateProfile.execute({
      userId,
      username,
      email,
      password,
      oldPassword,
    });
    return response.status(200).json(instanceToInstance(user));
  }
}
