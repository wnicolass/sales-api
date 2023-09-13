import { Request, Response } from 'express';
import { ShowProfileService } from '../services/ShowProfileService';
import { UpdateProfileService } from '../services/UpdateProfileService';

export class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const showProfile = new ShowProfileService();
    const user = await showProfile.execute({ userId });
    return response.status(200).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body;
    const { username, email, password, oldPassword } = request.body;
    const updateProfile = new UpdateProfileService();
    const user = await updateProfile.execute({
      userId,
      username,
      email,
      password,
      oldPassword,
    });
    return response.status(200).json(user);
  }
}
