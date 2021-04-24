import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { TemplateDto } from './dto/template.dto';
import { Template } from './template.entity';

@EntityRepository(Template)
export class TemplateRepository extends Repository<Template> {
  async createTemplate(templateDto: TemplateDto, author: User) {
    try {
      const { title, description, body } = templateDto;
      const template = this.create({
        title,
        description,
        body,
        authorId: author._id,
      });
      await template.save();
    } catch (error) {}
  }

  async findTemplates() {
    return this.find();
  }

  async updateTemplate(id: string, templateDto: TemplateDto, author: User) {
    try {
      const { title, description, body } = templateDto;
      const item = await this.findOne({
        where: { _id: new ObjectID(id), authorId: new ObjectID(author._id) },
      });

      if (!item) {
        throw new NotFoundException(`Template not found ${id}`);
      }
      item.title = title;
      item.description = description;
      item.body = body;
      await item.save();
    } catch (error) {
      throw new InternalServerErrorException('Error');
    }
  }

  async destroy(id: string, author: User) {
    try {
      return await this.delete({
        _id: new ObjectID(id),
        authorId: new ObjectID(author._id),
      });
    } catch (error) {
      throw new InternalServerErrorException('Error');
    }
  }
}
