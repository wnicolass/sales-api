export interface IUpdateProfileRequest {
  userId: string;
  username?: string;
  email: string;
  password?: string;
  oldPassword?: string;
}
