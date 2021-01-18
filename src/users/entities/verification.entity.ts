import { CoreEntity } from 'src/common/entities/core.entity';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Column, OneToOne, JoinColumn, Entity, BeforeInsert } from 'typeorm';
import { User } from './users.entity';
import * as uuid from 'uuid';

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class Verification extends CoreEntity {
  @Column()
  @Field((types) => String)
  code: string;

  @Field()
  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @BeforeInsert()
  createCode() {
    this.code = uuid.v4();
  }
}
