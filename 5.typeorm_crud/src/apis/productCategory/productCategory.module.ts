import { Module } from '@nestjs/common';
import { ProductCategoryResolver } from './productCategory.resolver';
import { ProductCategoryService } from './productCategory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Module({
  imports: [
    // DB 연결을 위한 TypeOrmModule 을 imports에 추가하고, 사용할 테이블(엔티티)들 배열에 추가
    TypeOrmModule.forFeature([
      //
      ProductCategory,
    ]),
  ],
  providers: [
    //
    ProductCategoryResolver,
    ProductCategoryService,
  ],
})
export class ProductCategoryModule {}
