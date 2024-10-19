import { AddPostDto } from 'src/api/v1/dto/add-post.dto';

export class AddPostCommand {
  readonly content: string;
  readonly title: string;

  constructor({ content, title }: AddPostDto) {
    this.content = content;
    this.title = title;
  }
}
