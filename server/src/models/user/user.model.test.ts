import { IUser } from './user.interfaces';
import User from './user.model';

describe('User Model', () => {
  let newUser: IUser;

  beforeEach(() => {
    newUser = {
      password: 'password1',
    };
  });

  test('should correctly validate a valid user', async () => {
    await expect(new User(newUser).validate()).resolves.toBeUndefined();
  });

  test('should throw a validation error if password is unknown', async () => {
    newUser.password = 'invalidPassword';
    await expect(new User(newUser).validate()).rejects.toThrow();
  });
});
