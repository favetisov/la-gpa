import { mockDataQuests } from '@src/mock-data/mock-data';

export class QuestsService {
  async getQuestsList() {
    return mockDataQuests;
  }

  async getQuest(questId: number) {
    return mockDataQuests.find(q => q.id == questId);
  }
}
