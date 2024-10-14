import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from './page-options.dto';

export class PageMetaDto {
  @ApiProperty()
  readonly offset: number;

  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly itemsCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor(pageOptionsDto: PageOptionsDto, itemCount: number) {
    this.offset = pageOptionsDto.offset;
    this.limit = pageOptionsDto.limit;
    this.itemsCount = itemCount;
    this.pageCount = Math.ceil(this.itemsCount / this.limit);
    this.hasPreviousPage = this.offset > 1;
    this.hasNextPage = this.offset < this.pageCount - 1;
  }
}
