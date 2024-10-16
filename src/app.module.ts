import { Module } from '@nestjs/common';
import { ConfigureModule } from './infrastructure/configure/configure.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { PostModule } from './api/v1/post/post.module';

@Module({
  imports: [ConfigureModule, DatabaseModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
