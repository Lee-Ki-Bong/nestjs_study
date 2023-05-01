import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 상품 거래위치
 */
@Entity()
export class ProductSalesloction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  addressDetail: string;

  @Column()
  lat: number; // 위치 좌표 (위도 latitude)

  @Column()
  lng: number; // 위치 좌표 (경도 longitude)

  @Column()
  meetingTime: Date;
}
