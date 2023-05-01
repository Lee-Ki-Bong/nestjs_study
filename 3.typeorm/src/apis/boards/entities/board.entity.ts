import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Mysql 을 위해 추가
@ObjectType() // GraphQL 을 위해 추가
export class Board {
  @PrimaryGeneratedColumn('increment') // Mysql 을 위해 추가
  @Field(() => Int) // GraphQL 을 위해 추가
  number: number;

  @Column() // Mysql 을 위해 추가
  @Field(() => String) // GraphQL 을 위해 추가
  writer: string;

  @Column() // Mysql 을 위해 추가
  @Field(() => String) // GraphQL 을 위해 추가
  title: string;

  @Column() // Mysql 을 위해 추가
  @Field(() => String) // GraphQL 을 위해 추가
  contents: string;
}
