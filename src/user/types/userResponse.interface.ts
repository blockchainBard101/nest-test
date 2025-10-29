import { IUser } from './user.types';

export interface IUserResponse {
  user: IUser & { token: string };
}
