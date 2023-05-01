import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 상품 태그
 */
@Entity()
export class ProductTags {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // (내 기준에서의 상대와, 상대 기준에서의 나) 로 생각하면 쉽다.
  @ManyToMany(() => Product, (Product) => Product.productTags)
  products: Product[];
}
