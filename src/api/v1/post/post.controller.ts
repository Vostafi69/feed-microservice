import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPostsQuery } from './queries/impl/get-posts.query';
import { PageOptionsDto } from '../dto/page-options.dto';
import { PageDto } from '../dto/page.dto';
import { ApiTags } from '@nestjs/swagger';
import { PostDto } from './dto/post.dto';
import { ApiPaginatedResponse } from 'src/main/config/docs/api-paginated-response';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(private readonly _queryBus: QueryBus) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(PostDto)
  async getAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<PostDto>> {
    return await this._queryBus.execute(new GetPostsQuery(pageOptionsDto));
  }
}
