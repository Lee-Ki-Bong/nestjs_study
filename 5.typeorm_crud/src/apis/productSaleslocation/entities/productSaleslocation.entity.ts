import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 상품 거래위치
 */
@Entity()
@ObjectType()
export class ProductSalesloction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  addressDetail: string;

  @Column()
  @Field(() => Float)
  lat: number; // 위치 좌표 (위도 latitude)

  @Column()
  @Field(() => Float)
  lng: number; // 위치 좌표 (경도 longitude)

  @Column()
  @Field(() => Date)
  meetingTime: Date;
}
