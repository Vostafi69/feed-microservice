import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPostsQuery } from './queries/impl/get-posts.query';
import { PageOptionsDto } from '../dto/page-options.dto';
import { PageDto } from '../dto/page.dto';
import { PostEntity } from 'src/domain/entities/post.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(private readonly _queryBus: QueryBus) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<PostEntity>> {
    return await this._queryBus.execute(new GetPostsQuery(pageOptionsDto));
  }
}
