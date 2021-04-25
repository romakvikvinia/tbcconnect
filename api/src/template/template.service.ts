import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

import { TemplateDto, TemplateFilterDto } from './dto/template.dto';
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
  async findAll(templateFilterDto: TemplateFilterDto) {
    return await this.templateRepository.findTemplates(templateFilterDto);
  }

  async get(id: string) {
    return await this.templateRepository.findTemplate(id);
  }

  async update(id: string, templateDto: TemplateDto, user: User) {
    return this.templateRepository.updateTemplate(id, templateDto, user);
  }

  async delete(id: string, user: User) {
    return this.templateRepository.destroy(id, user);
  }
}
