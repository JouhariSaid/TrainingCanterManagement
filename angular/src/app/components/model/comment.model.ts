import {User} from "./user.model";
import {Training} from "./training.model";

export interface CommentModel {
  commentId: number;
  comment: string;
  validated: boolean;
  date: Date;
  user: User;
  training: Training;
}
