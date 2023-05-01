import { Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';

@Resolver('boards')
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  // @nestjs/graphql 이걸로 해야함. 주의.
  @Query(() => String) // 이러면 getHellow: String 이 자동으로 만들어짐.
  public getHellow() {
    return this.boardsService.aaa();
  }
}
