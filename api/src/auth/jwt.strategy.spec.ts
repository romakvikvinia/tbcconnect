import { JwtStrategy } from './jwt.strategy';
import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

describe('jwt.strategy', () => {
  let jwtStrategy: JwtStrategy;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();
    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('validate', () => {
    it('vlidates and returns user object', async () => {
      const user = new User();
      user.username = 'testuser';

      userRepository.findOne.mockResolvedValue(user);

      expect(userRepository.findOne).not.toHaveBeenCalled();

      const result = await jwtStrategy.validate({ username: 'testuser' });

      expect(userRepository.findOne).toHaveBeenCalledWith({
        username: 'testuser',
      });
      expect(result).toEqual(user);
    });
    it('thorws an uthoraiz exception', () => {
      userRepository.findOne.mockResolvedValue(null);
      expect(userRepository.findOne).not.toHaveBeenCalled();
      expect(
        jwtStrategy.validate({ username: 'testuser' }),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });
});
