import {User} from "./user.model";
import {CommentModel} from "./comment.model";
import {FileHandle} from "./file-handler.model";
import {RequestModel} from "./request.model";

export interface Training {
  trainingId: number;
  name: string;
  description: string;
  image: FileHandle;
  startDate: Date;
  endDate: Date;
  numberOfParticipants: number;
  price: number;
  trainerAmount: number;
  participants: User[];
  comments: CommentModel[];
  requests: RequestModel[];
  trainer: User;
}


