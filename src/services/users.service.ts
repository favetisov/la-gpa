import { userState } from '@src/stores/user.store';
import { mockDataUsers } from '@src/mock-data/mock-data';

export class UsersService {
  async login(passPhrase: string) {
    if (passPhrase == 'junior') {
      return mockDataUsers[0];
    } else {
      return mockDataUsers[1];
    }
  }

  async loadProfile() {
    return mockDataUsers.find(u => u.token == userState.token);
  }
}
