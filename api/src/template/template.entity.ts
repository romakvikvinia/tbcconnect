import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('templates')
export class Template {
  @ObjectIdColumn()
  _id: string;

  @Column()
  title: string;

  @Column()
  text: string;
}
