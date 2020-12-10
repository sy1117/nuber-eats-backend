import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({ email, password, role }: CreateAccountInput) {
    // check new user
    try {
      const exists = await this.users.find({ email });
      if (exists) {
        return;
      }
      await this.users.save(this.users.create({ email, password, role }));
      return true;
    } catch (error) {}
  }
}
