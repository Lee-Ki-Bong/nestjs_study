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
    let prdRow = await this.productRepository.findOne({
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

  // ## 삭제
  async delete({ productId }) {
    // [delete 방법1] hard delete
    // const res = await this.productRepository.delete({ id: productId });
    // return res.affected ? true : false; // affected 는 쿼리 실행후 변화감지여부. 즉, 성공여부.
    // save 는 객체반환, update는 변화감지 등.. 반환. 차리가 있다.

    // [delete 방법3] (id, 바꿀정보) - isDeleted
    // this.productRepository.update({ id: productId }, { isDeleted: true });

    // [delete 방법3] (id, 바꿀정보) 개선 - deleteAt
    // this.productRepository.update({ id: productId }, { deleteAt: new Date() });

    // [delete 방법4]  (id, 바꿀정보) 개선 - typeorm deleteAt @DeleteDateColumn
    // this.productRepository.softRemove({ id: productId }); // id 로만 삭제 가능.

    // [delete 방법4]  (id, 바꿀정보) 개선 - typeorm deleteAt @DeleteDateColumn
    const res = await this.productRepository.softDelete({ id: productId }); // 다른 조건으로 삭제 가능.
    return res.affected ? true : false; // affected 는 쿼리 실행후 변화감지여부. 즉, 성공여부.
  }
}
