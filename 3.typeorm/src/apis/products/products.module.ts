import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.resolver';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
