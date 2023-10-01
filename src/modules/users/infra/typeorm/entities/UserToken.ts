import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUserToken } from '@modules/users/domain/interfaces/IUserToken';

@Entity('user_token')
export class UserToken implements IUserToken {
  @PrimaryGeneratedColumn('uuid')
  token_id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
