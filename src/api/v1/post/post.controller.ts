import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  Version,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPostsQuery } from './queries/impl/get-posts.query';
import { PageOptionsDto } from '../dto/page-options.dto';
import { PageDto } from '../dto/page.dto';
import { ApiTags } from '@nestjs/swagger';
import { PostDto } from './dto/post.dto';
import { ApiPaginatedResponse } from 'src/main/config/docs/decorators/api-paginated-response';
import { GetPostByIdQuery } from './queries/impl/get-post-byId.query';

Version('1');
@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(private readonly _queryBus: QueryBus) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(PostDto)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<PostDto>> {
    return await this._queryBus.execute(new GetPostsQuery(pageOptionsDto));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async find(@Param('id', ParseIntPipe) id: number): Promise<PostDto> {
    return await this._queryBus.execute(new GetPostByIdQuery(id));
  }
}
