import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USERNAME'),
        password: config.get<string>('DATABASE_PASSWORD'),
        host: config.get<string>('DATABASE_HOST'),
        database: config.get<string>('DATABASE'),
        synchronize: false,
        logging: false,
        autoLoadEntities: false,
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
      }),
    }),
  ],
})
export class DatabaseModule {}
