import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [
    // DB 연결을 위한 TypeOrmModule 을 imports에 추가하고, 사용할 테이블(엔티티)들 배열에 추가
    TypeOrmModule.forFeature([
      //
      Product,
    ]),
  ],
  providers: [
    //
    ProductResolver,
    ProductService,
  ],
})
export class ProductModule {}
