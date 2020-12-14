import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,

    // dependency Injection (ConfigService)
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<TResponse> {
    // check new user
    try {
      const exists = await this.users.findOne(
        { email },
        { select: ['id', 'password'] },
      );
      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }
      const user = await this.users.save(
        this.users.create({ email, password, role }),
      );
      await this.verifications.save(this.verifications.create({ user }));
      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
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

      const token = this.jwtService.sign({ id: user.id });
      return { ok: true, token };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findById(id: number): Promise<User> {
    try {
      const user = await this.users.findOne({ id });
      if (!user) {
        throw new Error('User not Found');
      }
      return user;
    } catch (error) {}
  }

  async editProfile(
    id: number,
    { email, password }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      let user = await this.users.findOne({ id });
      if (email) {
        await this.verifications.save(this.verifications.create(user));
        user.email = email;
        user.verified = false;
      }
      if (password) user.password = password;

      await this.users.save(user);
      return {
        ok: true,
        user: user,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async verifyEmail(code: string) {
    try {
      const verification = await this.verifications.findOne(
        { code },
        { relations: ['user'] },
      );
      if (verification) {
        verification.user.verified = true;
        this.users.save(verification.user);
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: 'Wrong Code',
        };
      }
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
