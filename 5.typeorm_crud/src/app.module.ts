import { Module } from '@nestjs/common';
import { BoardsModule } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { ProductModule } from './apis/products/product.module';

@Module({
  imports: [
    BoardsModule,
    ProductModule,
    ProductCategoryModule,

    // 이걸 추가해주어야한다. 이건 버전에 따라 다르니 외울 필요는 없다. dosc 를 참고하자.
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      // 이걸 추가하면 스키마를 자동생성된다.
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, // mysql 3306 포트가 디폴트.
      username: 'sample',
      password: 'sam',
      database: 'myproject03',

      // 테이블 들이 들어간다. ** 는 하위 모든 디렉토리 파일들을 말한다. 확장자를 .* 하는 이유는 빌드가 되면 .ts 가 아니라 .js 가 되기 때문이다.
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true, // entities 에 들어갈 객체들과 실제 db와 동기화 시켜줄지 여부. ture 면 동기화.
      logging: true, // log 를 나타내줄지 여부. sql로 어떻게 변경이 되었는지 과정을 알 수 있다.
    }),
  ],
})
export class AppModule {}
