import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from './auth.decorator';
import { ISignIn } from './auth.interface';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { User } from './user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) singUpDto: AuthDto): Promise<void> {
    return this.authService.signUp(singUpDto);
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body(ValidationPipe) signInDto: AuthDto): Promise<ISignIn> {
    return this.authService.signIn(signInDto);
  }

  /**
   * test privet url
   */

  @Post('/test')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    return user;
  }
}
