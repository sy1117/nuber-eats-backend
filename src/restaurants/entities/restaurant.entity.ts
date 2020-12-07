import { ObjectType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field((_) => Number)
  id: number;

  @Field((_) => String)
  @Column()
  name: string;

  @Field((_) => Boolean, { nullable: true })
  @IsBoolean()
  @Column()
  isVegan: boolean;

  @Field((type) => String)
  @IsString()
  address: string;

  @Field((type) => String)
  @IsString()
  @Column()
  ownerName: string;

  @Field((type) => String)
  @Column()
  categoryName: string;
}
