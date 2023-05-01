import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    // DB 연결을 위한 Repository를 사용하기위해서
    @InjectRepository(Product) // 데코레이터추가 (사용테이블)
    private readonly productRepository: Repository<Product>, // 타입을 Reporsitory로 받아야한다.
  ) {}

  // ## 조회
  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(productId) {
    return await this.productRepository.findOne({ where: { id: productId } });
  }

  // ## 생성
  async create({ createProductInput }) {
    const res = await this.productRepository.save({
      // 스프레드 연산자로 아래 코드를 스프레드 시킨다. 아래 코드 생력.
      ...createProductInput,

      // 하나하나 직접 나열하는 방식
      // name: createProductInput.name,
      // description: createProductInput.description,
      // price: createProductInput.price,
    });
    console.log(res);
    return res;
  }

  // ## 수정
  async update(productId, updateProductInput) {
    return await this.productRepository.save({
      id: productId,
      ...updateProductInput,
    });
  }

  async checkSoldout({ productId }) {
    const prdRow = await this.productRepository.findOne({
      where: { id: productId },
    });

    // if (prdRow.isSoldout) {
    //   throw new HttpException('판매완료된 상품', HttpStatus.CONFLICT);
    // }

    // 위 HttpException 형태를 nest js 에서 아래로 제공함.
    if (prdRow.isSoldout) {
      throw new UnprocessableEntityException('판매완료된 상품');
    }
  }
}
