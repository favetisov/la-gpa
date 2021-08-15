import { Quest } from '@src/models/quest.model';
import { User, UserServerInterface } from '@src/models/user.model';

export class Task {
  id: number;
  user?: User;
  completed: boolean;
  quest?: Quest;
  marks: Array<string> = [];

  constructor(model: TaskServerInterface) {
    this.id = model.id;
    this.completed = model.completed;
    this.marks = model.marks || [];
    if (model.user) this.user = new User(model.user);
  }
}

export class TaskServerInterface {
  id: number;
  completed: boolean;
  user?: UserServerInterface;
  marks?: Array<string>;
}
