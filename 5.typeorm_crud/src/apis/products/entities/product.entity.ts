import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductSalesloction } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';
import { ProductTags } from 'src/apis/productTags/entities/productTags.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * 상품
 */
@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar' }) // 이런식으로 자료형을 세부적으로 지정할 수 있다.
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  // [delete 방법2]
  // @Column({ default: false })
  // @Field(() => Boolean)
  // isDeleted: boolean;

  // [delete 방법3]
  // @Column({ default: null })
  // @Field(() => Date)
  // deleteAt: Date;

  // [delete 방법4] 방법3을 typeorm 에서 제공해줌.
  // 이러면 조회할때 자동으로 이 컬럼값 유무로 where 을 추가해 준다. wow
  @DeleteDateColumn()
  deleteAt: Date;

  // 상품 거래위치와 1:1 fk
  @JoinColumn()

  // 반대편이 항상 1 이 된다고 생각하면 쉽다.
  @Field(() => ProductSalesloction)
  @OneToOne(() => ProductSalesloction) // ProductSalesloction 와 1:1 을 명시
  productSaleslocation: ProductSalesloction; // 그냥 타입명시.

  @ManyToOne(() => ProductCategory) // 상품이 N 카테고리가 1 이기 때문에
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User) // 상품이 N 유저가 1 이기 때문에
  @Field(() => User)
  user: User;

  // 상품과 상품 태그는 N:M
  // 자신과 상대 편에도 데코레이터가 필요
  // (내 기준에서의 상대와, 상대 기준에서의 나) 로 생각하면 쉽다.
  @JoinTable() // 이건 양쪽에서 하나만 있으면되며, 중간 테이블(관계 테이블)이 만들어진다.
  @ManyToMany(() => ProductTags, (ProductTags) => ProductTags.products)
  @Field(() => [ProductTags]) // graphql 에선 ProductTags[] 배열을 이렇게 한다.
  productTags: ProductTags[];
}
