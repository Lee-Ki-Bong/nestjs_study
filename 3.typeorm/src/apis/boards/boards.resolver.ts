import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/createBoard.Input';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  // @nestjs/graphql 이걸로 해야함. 주의.
  // @Query(() => String) // 이러면 getHellow: String 이 자동으로 만들어짐.
  // public getHellow() {
  //   return this.boardsService.aaa();
  // }

  @Query(() => [Board]) // list 를 반환할경우 [] 배열 반환, row 하나면 Board.
  fetchBoards() {
    return this.boardsService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    // ## 하나하나 받아올때
    @Args({ name: 'writer', nullable: true }) writer: string, // 이러면 nullable: true 로 인해서 .gql 파일에 필수값이 해제된걸 볼 수 있다.  ! 제거됨.
    @Args('title') title: string,
    @Args('contents') contents: string,

    // ## 한꺼번에 받아올때
    @Args('createBoardInput') createBoardInput: CreateBoardInput, // .gql 파일에 input CreateBoardInput 가 추가된걸 확인.
  ) {
    console.log(writer);
    console.log(title);
    console.log(contents);

    console.log(createBoardInput);

    return this.boardsService.create();
  }
}
