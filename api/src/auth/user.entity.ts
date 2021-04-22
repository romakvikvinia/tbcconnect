import {
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Template } from 'src/template/template.entity';

@Entity('users')
@Unique(['username'])
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  /**
   *
   * Relations
   */

  @OneToMany((type) => Template, (template) => template.author, {
    cascade: true,
  })
  templates: Template[];

  /**
   *
   * @param password
   * @returns string
   */
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
