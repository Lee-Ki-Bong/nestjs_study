import { Module } from '@nestjs/common';
import { BoardsModule } from './apis/boards/boards.module';
import { ProductsModule } from './apis/products/products.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    BoardsModule,

    // 이걸 추가해주어야한다. 이건 버전에 따라 다름 dosc 를 참고하자.
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      // 이걸 추가하면 스키마를 자동생성된다.
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
