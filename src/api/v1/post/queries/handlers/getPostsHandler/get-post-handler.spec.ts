import { PostEntity } from '../../../../../../domain/entities/post.entity';
import { GetPostsHandler } from './get-posts.handler';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetPostsQuery } from '../../impl/get-posts.query';
import { Repository } from 'typeorm';
import { PageOptionsDto } from 'src/api/v1/dto/page-options.dto';

describe('GetPosts Unit test', () => {
  let getPostsHandler: GetPostsHandler;
  let postRepository: Repository<PostEntity>;

  const POST_REPOSITORY_TOKEN = getRepositoryToken(PostEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPostsHandler,
        {
          provide: POST_REPOSITORY_TOKEN,
          useValue: {
            findAndCount: jest.fn(),
          },
        },
      ],
    }).compile();

    postRepository = module.get<Repository<PostEntity>>(POST_REPOSITORY_TOKEN);
    getPostsHandler = module.get<GetPostsHandler>(GetPostsHandler);
  });

  it('should be defined', () => {
    expect(getPostsHandler).toBeDefined();
  });

  it('should be defined', () => {
    expect(postRepository).toBeDefined();
  });

  describe('find all Posts', () => {
    it('should return zero posts', async () => {
      jest
        .spyOn(postRepository, 'findAndCount')
        .mockReturnValueOnce([[], 0] as any);
      const posts = await getPostsHandler.execute(
        new PageOptionsDto() as GetPostsQuery,
      );
      expect(posts).toEqual({
        data: [],
        meta: {
          hasNextPage: false,
          hasPreviousPage: false,
          itemsCount: 0,
          limit: 10,
          offset: 0,
          pageCount: 0,
        },
      });
    });

    it('should return one post', async () => {
      jest
        .spyOn(postRepository, 'findAndCount')
        .mockReturnValueOnce([
          [{ id: 1, title: 'title', content: 'content' }] as PostEntity[],
          0,
        ] as any);
      const posts = await getPostsHandler.execute(
        new PageOptionsDto() as GetPostsQuery,
      );
      expect(posts).toEqual({
        data: [{ id: 1, title: 'title', content: 'content' }],
        meta: {
          hasNextPage: false,
          hasPreviousPage: false,
          itemsCount: 0,
          limit: 10,
          offset: 0,
          pageCount: 0,
        },
      });
    });

    it('should return some post', async () => {
      jest.spyOn(postRepository, 'findAndCount').mockReturnValueOnce([
        [
          { id: 1, title: 'title', content: 'content' },
          { id: 2, title: 'title', content: 'content' },
          { id: 3, title: 'title', content: 'content' },
        ] as PostEntity[],
        0,
      ] as any);
      const posts = await getPostsHandler.execute(
        new PageOptionsDto() as GetPostsQuery,
      );
      expect(posts).toEqual({
        data: [
          { id: 1, title: 'title', content: 'content' },
          { id: 2, title: 'title', content: 'content' },
          { id: 3, title: 'title', content: 'content' },
        ],
        meta: {
          hasNextPage: false,
          hasPreviousPage: false,
          itemsCount: 0,
          limit: 10,
          offset: 0,
          pageCount: 0,
        },
      });
    });
  });
});
