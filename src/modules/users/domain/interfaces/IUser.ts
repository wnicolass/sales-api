export interface IUser {
  user_id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
  getAvatarUrl(): string | null;
}
