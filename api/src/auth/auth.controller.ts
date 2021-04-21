import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) singUpDto: AuthDto): Promise<void> {
    return this.authService.signUp(singUpDto);
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) signIn: AuthDto) {
    return '';
  }
}
