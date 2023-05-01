import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  // aaa() {
  //   return 'Hellow graphQL!!!';
  // }

  findAll() {
    const result = [
      { number: 1, writer: '철수', title: '철수 제목', contents: '철수 내용' },
      { number: 1, writer: '영희', title: '영희 제목', contents: '영희 내용' },
      { number: 1, writer: '훈이', title: '훈이 제목', contents: '훈이 내용' },
    ];
    return result;
  }

  create() {
    // 1. 데이터 등록 로직

    // 2. 저장 결과 응답
    return '게시물 등록에 성공';
  }
}
