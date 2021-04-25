import { EventData } from "./event";

export interface UserModel {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: {
    id: number;
    name: string;
    description: string;
    type: string;
  };
  created_at: string;
  updated_at: string;
  events: EventData[];
}
