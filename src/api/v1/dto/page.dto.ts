import { IsArray } from 'class-validator';
import { PageMetaDto } from './page-meta.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PostDto } from '../post/dto/post.dto';

export class PageDto<T> {
  @IsArray()
  @ApiProperty({ type: () => PostDto, isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
