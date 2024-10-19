import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddPostCommand } from '../impl/add-post.command';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/domain/entities/post.entity';
import { Repository } from 'typeorm';

@CommandHandler(AddPostCommand)
export class AddPostHandler implements ICommandHandler<AddPostCommand> {
  constructor(
    @InjectRepository(PostEntity)
    private readonly _postRepository: Repository<PostEntity>,
  ) {}

  async execute({ content, title }: AddPostCommand): Promise<number> {
    const post = new PostEntity();
    post.content = content;
    post.title = title;
    const res = await this._postRepository.insert(post);
    return res.identifiers[0].id;
  }
}
