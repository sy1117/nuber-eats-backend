import { Entity, Column } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';

type TUserRole = 'client' | 'owner' | 'delivery';

@Entity()
export class User extends CoreEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: TUserRole;
}
