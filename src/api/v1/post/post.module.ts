import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { GetPostsHandler } from './queries/handlers/getPostsHandler/get-posts.handler';
import { PostEntity } from 'src/domain/entities/post.entity';
import { GetPostByIdHandler } from './queries/handlers/getPostByIdHandler/get-post-byId.handler';
import { AddPostHandler } from './commands/handlers/add-post.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController],
  providers: [GetPostsHandler, GetPostByIdHandler, AddPostHandler],
})
export class PostModule {}
