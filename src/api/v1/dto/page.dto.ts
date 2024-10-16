import { IsArray } from 'class-validator';
import { PageMetaDto } from './page-meta.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PostDto } from '../post/dto/post.dto';

export class PageDto<T> {
  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  @IsArray()
  @ApiProperty({ type: () => PostDto, isArray: true })
  readonly data: T[];

  constructor(meta: PageMetaDto, data: T[]) {
    this.meta = meta;
    this.data = data;
  }
}
