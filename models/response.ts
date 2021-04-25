import { UserModel } from "./user";

export type NotAllowed = {
  message: string;
};

export interface AuthResponse {
  jwt: string;
  user: UserModel;
}
