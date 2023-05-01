import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 상품 태그
 */
@Entity()
@ObjectType()
export class ProductTags {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  // (내 기준에서의 상대와, 상대 기준에서의 나) 로 생각하면 쉽다.
  @ManyToMany(() => Product, (Product) => Product.productTags)
  @Field(() => [Product])
  products: Product[];
}
