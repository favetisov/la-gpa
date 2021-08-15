import { Quest } from '@src/models/quest.model';
import { QuestState } from '@src/models/quest-state.model';
import { RoleLevel } from '@src/models/role-level.model';

export const mockDataUsers = [
  { id: 1, token: 'abc', name: 'Иван Иванов', roles: [RoleLevel.junior] },
  { id: 2, token: 'def', name: 'Пётр Петров', roles: [RoleLevel.senior] },
];

export const mockDataQuests = [
  new Quest({ id: 1, title: 'Люлина Дарья', createdAt: 1628963262944, state: QuestState.created, tasks: [] }),
  new Quest({
    id: 2,
    title: 'Ребров Данила',
    createdAt: 1628963262944,
    state: QuestState.active,
    tasks: [
      { id: 1, user: mockDataUsers[0], completed: true },
      { id: 2, user: mockDataUsers[0], completed: true, marks: ['test'] },
      { id: 3, user: mockDataUsers[0], completed: false },
      { id: 4, completed: false },
    ],
  }),
  new Quest({ id: 3, title: 'Костюнин Павел', createdAt: 1628963262944, state: QuestState.active, tasks: [] }),
  new Quest({ id: 4, title: 'Зверева Анна', createdAt: 1628963262944, state: QuestState.closed, tasks: [] }),
];
