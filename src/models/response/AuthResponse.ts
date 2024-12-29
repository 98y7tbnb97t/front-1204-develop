import { Error } from '../Error';
import { User } from '../User';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  users: User[];
  error: Error;
  errors: [];
}
