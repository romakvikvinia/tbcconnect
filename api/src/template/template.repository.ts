import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { TemplateDto } from './dto/template.dto';
import { Template } from './template.entity';

@EntityRepository(Template)
export class TemplateRepository extends Repository<Template> {
  async createTemplate(templateDto: TemplateDto, author: User) {
    try {
      const { title, text } = templateDto;
      const template = this.create({ title, text, author });
      await template.save();
    } catch (error) {}
  }
}
