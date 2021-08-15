import { QuestState } from '@src/models/quest-state.model';
import dayjs from 'dayjs';
import { Task, TaskServerInterface } from '@src/models/task.model';

export class Quest {
  id: number;
  title: string;
  createdAt: dayjs.Dayjs;
  state: QuestState;
  tasks: Task[];

  constructor(model: QuestServerInterface) {
    this.id = model.id;
    this.title = model.title;
    this.createdAt = dayjs(model.createdAt);
    this.state = model.state;
    this.tasks = model.tasks.map(t => new Task(t));
  }
}

export interface QuestServerInterface {
  id: number;
  title: string;
  createdAt: number;
  state: QuestState;
  tasks: TaskServerInterface[];
}
