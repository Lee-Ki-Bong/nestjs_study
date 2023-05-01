import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productCategory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryService {
  constructor(
    // DB 연결을 위한 Repository를 사용하기위해서
    @InjectRepository(ProductCategory) // 데코레이터추가 (사용테이블)
    private readonly productCategoryRepository: Repository<ProductCategory>, // 타입을 Reporsitory로 받아야한다.
  ) {}

  async create({ name }) {
    // await 붙이려면 함수명앞에 async 따라 붙어야함.
    // 저장이 끝날때까지 대기하기위해 await 붙임
    const res = await this.productCategoryRepository.save({ name });
    console.log(res); // {name: '####'}
    return res;
  }
}
