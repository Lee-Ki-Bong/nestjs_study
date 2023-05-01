import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 상품 거래위치
 */
@Entity()
@ObjectType() // GraphQL 을 위해 추가
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String) // GraphQL 을 위해 추가
  id: string;

  @Column({ unique: true })
  @Field(() => String) // GraphQL 을 위해 추가
  name: string;
}
