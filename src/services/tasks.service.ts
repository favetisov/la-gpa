import { mockDataQuests } from '@src/mock-data/mock-data';

export class TasksService {
  getTask(taskId: number) {
    for (const quest of mockDataQuests) {
      for (const task of quest.tasks) {
        if (task.id == taskId) {
          task.quest = quest;
          return task;
        }
      }
    }
  }
}
