import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostEntity } from 'src/domain/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDto } from '../../../dto/post.dto';
import { GetPostByIdQuery } from '../../impl/get-post-byId.query';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdHandler implements IQueryHandler<GetPostByIdQuery> {
  constructor(
    @InjectRepository(PostEntity)
    private readonly _postRepository: Repository<PostEntity>,
  ) {}

  async execute(query: GetPostByIdQuery): Promise<PostDto> {
    const post = await this._postRepository.findOne({
      where: { id: query.id },
    });

    return post;
  }
}
