import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('templates')
@Unique(['title'])
export class Template extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @Column()
  json: string;

  @ObjectIdColumn({ name: 'authorId' })
  authorId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  /**
   * Relations
   */

  // @ManyToOne((type) => User, (author) => author.templates)
  // author: User;
}
