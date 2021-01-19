import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import {
  ObjectType,
  InputType,
  Field,
  registerEnumType,
} from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum, IsString, IsBoolean } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

enum UserRole {
  Owner,
  Client,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });
@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsEmail()
  email: string;

  // @Column({ select: false })
  @Column()
  @Field((type) => String)
  @IsString()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Field((type) => Boolean, { defaultValue: false, nullable: true })
  @Column({ default: false })
  @IsBoolean()
  verified: boolean;

  @Field((type) => [Restaurant])
  @OneToMany((type) => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException(error);
      }
    }
  }

  async checkPassword(password: string): Promise<boolean> {
    try {
      console.log(password, this.password);
      const ok = await bcrypt.compare(password, this.password);
      return ok;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
