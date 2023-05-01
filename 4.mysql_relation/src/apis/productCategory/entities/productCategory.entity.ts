import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 상품 거래위치
 */
@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
