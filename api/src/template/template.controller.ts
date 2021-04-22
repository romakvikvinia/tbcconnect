import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/auth.decorator';
import { User } from 'src/auth/user.entity';
import { TemplateDto } from './dto/template.dto';
import { TemplateService } from './template.service';

@ApiTags('Templates')
@Controller('templates')
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @Get()
  index() {
    return 'hello';
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  store(@GetUser() user: User, @Body(ValidationPipe) templateDto: TemplateDto) {
    return this.templateService.create(templateDto, user);
  }
}
