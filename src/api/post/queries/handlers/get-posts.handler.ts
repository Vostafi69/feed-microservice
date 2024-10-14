import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostsQuery } from '../impl/get-posts.query';
import { PostEntity } from 'src/domain/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageMetaDto } from '../../../dto/page-meta.dto';
import { PageDto } from '../../../dto/page.dto';

@QueryHandler(GetPostsQuery)
export class GetPostsHandler implements IQueryHandler<GetPostsQuery> {
  constructor(
    @InjectRepository(PostEntity)
    private readonly _postRepository: Repository<PostEntity>,
  ) {}

  async execute(query: GetPostsQuery): Promise<PageDto<PostEntity>> {
    const skip = query.limit * query.offset;

    const [posts, count] = await this._postRepository.findAndCount({
      take: query.limit,
      skip: skip,
      order: {
        id: {
          direction: query.order,
        },
      },
    });

    const pageMetaDto = new PageMetaDto(query, count);

    return new PageDto(posts, pageMetaDto);
  }
}
