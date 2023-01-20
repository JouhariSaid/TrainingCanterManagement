import {User} from "./user.model";
import {CommentModel} from "./comment.model";
import {FileHandle} from "./file-handler.model";

export interface Training {
  trainingId: number;
  name: string;
  description: string;
  image: FileHandle;
  startDate: Date;
  endDate: Date;
  price: number;
  trainerAmount: number;
  participants: User[];
  comments: CommentModel[];
  trainer: User;
}


