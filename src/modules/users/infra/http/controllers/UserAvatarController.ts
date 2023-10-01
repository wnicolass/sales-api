import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { UpdateUserAvatarService } from '../../../services/UpdateUserAvatarService';

export class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const { filename } = request.file!;
    const updateAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateAvatar.execute({ userId, filename });

    return response.status(200).json(instanceToInstance(user));
  }
}
