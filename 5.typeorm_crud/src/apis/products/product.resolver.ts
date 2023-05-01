import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  // ## 조회
  @Query(() => Product)
  fetchProduct(@Args('productId') productId: string) {
    return this.productService.findOne(productId);
  }

  @Query(() => [Product])
  fetchProductList() {
    return this.productService.findAll();
  }

  // ## 생성
  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create({ createProductInput });
  }

  // ## 수정
  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매완료여부
    await this.productService.checkSoldout({ productId });

    return this.productService.update(productId, updateProductInput);
  }

  // ## 삭제
  @Mutation(() => Boolean)
  deleteProduct(@Args('productId') productId: string) {
    return this.productService.delete({ productId });
  }
}
