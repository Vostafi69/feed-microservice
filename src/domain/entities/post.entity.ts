import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'post' })
export class PostEntity extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'content' })
  content: string;
}
