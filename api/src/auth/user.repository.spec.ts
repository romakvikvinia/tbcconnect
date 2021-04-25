import { Test } from '@nestjs/testing';
import { AuthDto } from './dto/auth.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';

const mockCredentialsDTO: AuthDto = {
  username: 'username',
  password: 'Rocketman123!',
};

describe(`UserRepository`, () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('createUser', () => {
    let save;
    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
      userRepository.hashPassword = jest.fn().mockResolvedValue('someValue');
    });

    it(`Successfully created`, () => {
      save.mockResolvedValue(undefined);

      expect(userRepository.createUser(mockCredentialsDTO)).resolves.toEqual(
        undefined,
      );
    });
  });

  describe(`validateUserPassword`, () => {
    let user;

    beforeEach(() => {
      userRepository.findOne = jest.fn();

      user = new User();
      user.username = 'testuser';
      user.validatePassword = jest.fn();
    });
    it('returns the username  as validation is successfully ', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(true);

      const result = await userRepository.validateUserPassword({
        username: 'testuser',
        password: 'Test123!',
      });
      expect(result).toEqual('testuser');
    });

    it(`returns null as usere can not be found`, async () => {
      userRepository.findOne.mockResolvedValue(null);
      const result = await userRepository.validateUserPassword({
        username: 'testuser',
        password: 'Test123!',
      });

      expect(user.validatePassword).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it(`returns null as password is invalid`, async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(false);
      const result = await userRepository.validateUserPassword({
        username: 'testuser',
        password: 'Test123!',
      });
      expect(user.validatePassword).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('hashPassword', () => {
    it('calls bcrypt.has to generate hash', async () => {
      bcrypt.hash = jest.fn().mockResolvedValue('testHash');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await userRepository.hashPassword(
        'testpassword',
        'testSalt',
      );
      expect(bcrypt.hash).toHaveBeenCalledWith('testpassword', 'testSalt');
      expect(result).toEqual('testHash');
    });
  });
});
