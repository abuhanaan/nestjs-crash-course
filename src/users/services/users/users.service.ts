import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/CreateUserType';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { username: 'ade', email: 'ade@email.com' },
    { username: 'mustopha', email: 'mustopha@email.com' },
    { username: 'ayo', email: 'ayo@email.com' },
  ];

  fetchUsers() {
    return this.fakeUsers;
  }

  createUser(userData: CreateUserType) {
    this.fakeUsers.push(userData);
    return this.fakeUsers;
  }

  fetchUserById(id: number) {
    if (id === 321) return { id: 321, username: 'ade', email: 'ade@email.com' };
  }
}
