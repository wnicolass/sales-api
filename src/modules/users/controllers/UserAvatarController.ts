import { Request, Response } from 'express';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';

export class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const { filename } = request.file!;
    const updateAvatar = new UpdateUserAvatarService();
    const user = updateAvatar.execute({ userId, filename });

    return response.status(200).json(user);
  }
}
