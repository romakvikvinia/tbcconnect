import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(signUp: AuthDto): Promise<void> {
    try {
      const { username, password } = signUp;
      const user = this.create();
      user.salt = await bcrypt.genSalt();
      user.username = username;
      user.password = await this.hashPassword(password, user.salt);
      await user.save();
    } catch (error) {
      //11000 duplicate username

      if (error.code === 11000) {
        throw new ConflictException(`User already exists`);
      } else {
        throw new InternalServerErrorException('Error');
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
  async validateUserPassword(signInDto: AuthDto): Promise<string> {
    const { username, password } = signInDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    }
    return null;
  }
}
