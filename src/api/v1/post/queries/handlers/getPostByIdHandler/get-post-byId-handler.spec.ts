import { PostEntity } from '../../../../../../domain/entities/post.entity';
import { GetPostByIdHandler } from './get-post-byId.handler';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('GetPosts Unit test', () => {
  let getPostByIdHandler: GetPostByIdHandler;
  let postRepository: Repository<PostEntity>;

  const POST_REPOSITORY_TOKEN = getRepositoryToken(PostEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPostByIdHandler,
        {
          provide: POST_REPOSITORY_TOKEN,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    postRepository = module.get<Repository<PostEntity>>(POST_REPOSITORY_TOKEN);
    getPostByIdHandler = module.get<GetPostByIdHandler>(GetPostByIdHandler);
  });

  it('should be defined', () => {
    expect(getPostByIdHandler).toBeDefined();
  });

  it('should be defined', () => {
    expect(postRepository).toBeDefined();
  });

  describe('find post by id', () => {
    it('should return zero posts', async () => {
      jest.spyOn(postRepository, 'findOne').mockReturnValueOnce(null);
      const post = await getPostByIdHandler.execute({ id: 1 });
      expect(post).toEqual(null);
    });

    it('should call repo with 5', async () => {
      await getPostByIdHandler.execute({ id: 5 });
      expect(postRepository.findOne).toHaveBeenCalledWith({ where: { id: 5 } });
    });
  });
});
