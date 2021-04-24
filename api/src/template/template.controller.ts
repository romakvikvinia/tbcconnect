import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
    return this.templateService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  store(@GetUser() user: User, @Body(ValidationPipe) templateDto: TemplateDto) {
    return this.templateService.create(templateDto, user);
  }

  @Patch('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body(ValidationPipe) templateDto: TemplateDto,
  ) {
    return this.templateService.update(id, templateDto, user);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  destroy(@GetUser() user: User, @Param('id') id: string) {
    return this.templateService.delete(id, user);
  }
}
