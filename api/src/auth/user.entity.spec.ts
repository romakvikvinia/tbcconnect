import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

describe('User Entity', () => {
  let user: User;
  beforeEach(() => {
    user = new User();
    user.password = 'testPassword';
    user.salt = '123';
    bcrypt.compare = jest.fn();
  });
  describe('validatePassword', () => {
    it(`returns true as password is valid`, async () => {
      bcrypt.compare.mockResolvedValue(true);

      expect(bcrypt.compare).not.toHaveBeenCalled();
      const result = await user.validatePassword('testPassword');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'testPassword',
        user.password,
      );
      expect(result).toEqual(true);
    });
    it(`returns false as password is invalid`, async () => {
      bcrypt.compare.mockResolvedValue(false);
      expect(bcrypt.compare).not.toHaveBeenCalled();
      const result = await user.validatePassword('testPassword');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'testPassword',
        user.password,
      );
      expect(result).toEqual(false);
    });
  });
});
