import { ObjectType, Field } from '@nestjs/graphql';
import { IsString, Length, IsBoolean } from 'class-validator';

@ObjectType()
export class Restaurant {
  @Field((_) => String)
  name: string;

  @Field((_) => Boolean, { nullable: true })
  @IsBoolean()
  isVegan: boolean;

  @Field((type) => String)
  @IsString()
  address: string;

  @Field((type) => String)
  @IsString()
  ownerName: string;
}
