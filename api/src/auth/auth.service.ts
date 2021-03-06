import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtConfig } from 'src/config';
import { AuthDto } from './dto/auth.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpDto: AuthDto): Promise<void> {
    return this.userRepository.createUser(signUpDto);
  }
  async signIn(signInDto: AuthDto) {
    const username = await this.userRepository.validateUserPassword(signInDto);

    if (!username) {
      throw new UnauthorizedException(`Invalid credentials`);
    }
    const payload: { username: string } = { username };

    const token = await this.jwtService.sign(payload);
    const { expiresIn } = JwtConfig.signOptions;

    return { token, expiresIn };
  }
}
