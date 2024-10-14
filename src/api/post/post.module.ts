import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { GetPostsHandler } from './queries/handlers/get-posts.handler';
import { PostEntity } from 'src/domain/entities/post.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController],
  providers: [GetPostsHandler],
})
export class PostModule {}
