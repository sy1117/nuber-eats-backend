import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<TResponse> {
    // check new user
    try {
      const exists = await this.users.find({ email });
      if (exists.length) {
        return { ok: true, error: 'There is a user with that email already' };
      }
      await this.users.save(this.users.create({ email, password, role }));
      return { ok: true };
    } catch (error) {
      return { ok: true, error: "Couldn't create account" };
    }
  }

  async login({ email, password }: LoginInput) {
    try {
      const user = await this.users.findOne({ email });
      if (!user) {
        return { ok: false, error: 'User not found' };
      }

      const isCorrect = await user.checkPassword(password);

      if (!isCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }

      return { ok: true, token: 'token smaple' };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
