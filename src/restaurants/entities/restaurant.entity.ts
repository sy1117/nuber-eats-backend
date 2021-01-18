import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Entity, Column, ManyToOne } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Category } from 'src/restaurants/entities/category.entity';
import { User } from 'src/users/entities/users.entity';

@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => String)
  @Column()
  @IsString()
  bgImage: string;

  @Field((type) => String)
  @IsString()
  @Column()
  ownerName: string;

  @Field((type) => Category, { nullable: true })
  @ManyToOne((type) => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field((type) => User)
  @ManyToOne((type) => User, (owner) => owner.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  owner: User;
}
