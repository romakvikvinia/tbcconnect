import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { TemplateDto } from './dto/template.dto';
import { TemplateRepository } from './template.repository';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateRepository)
    private templateRepository: TemplateRepository,
  ) {}
  async create(templateDto: TemplateDto, user: User) {
    return this.templateRepository.createTemplate(templateDto, user);
  }
}
