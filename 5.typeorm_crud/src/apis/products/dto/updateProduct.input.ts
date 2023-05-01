import { InputType, OmitType, PartialType, PickType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input';

// CreateProductInput 를 이용하여 불필요 소스 중복 선언 안해도되게끔 상속.
// 그러나 PartialType 각 필드 {nullable: true} 추가
@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}

/**
 * PartialType 같은 다른 것 소개
 * OmitType(CreateProductInput, ["제외할필드1", "제외할필드2"]) // 특정 필드제외
 * PickType(CreateProductInput, ["가져올필드1", "가져올필드2"]) // 특정필드만 가져올때
 */
