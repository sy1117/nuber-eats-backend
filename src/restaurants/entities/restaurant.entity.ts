import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsString, IsBoolean, Length, IsOptional } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => Boolean, { defaultValue: true })
  @IsBoolean()
  @Column({ default: true })
  @IsOptional()
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
