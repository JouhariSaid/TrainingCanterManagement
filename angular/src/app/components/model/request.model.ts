import {User} from "./user.model";
import {Training} from "./training.model";

export interface RequestModel {
  requestId: number;
  user: User;
  training: Training;
  accepted: boolean;
}
