import { Order, PageOptionsDto } from '../../../dto/page-options.dto';

export class GetPostsQuery {
  readonly order: Order;
  readonly limit: number;
  readonly offset: number;

  constructor({ order, limit, offset }: PageOptionsDto) {
    this.order = order;
    this.limit = limit;
    this.offset = offset;
  }
}
