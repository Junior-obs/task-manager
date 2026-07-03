import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    if (!userData.password) {
      throw new BadRequestException('Le mot de passe est obligatoire.');
    }

    const existingUser = await this.usersRepository.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new BadRequestException('Cet email est déjà utilisé.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);

    delete (savedUser as any).password;
    return savedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
        role: true,
        refreshToken: true,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async updateProfile(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    if (data.email && data.email !== user.email) {
      const existing = await this.usersRepository.findOne({
        where: { email: data.email },
      });
      if (existing) {
        throw new BadRequestException('Cet email est déjà utilisé.');
      }
    }

    if (data.username) user.username = data.username;
    if (data.email) user.email = data.email;

    return this.usersRepository.save(user);
  }

  async deleteAccount(id: string): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    await this.usersRepository.remove(user);
  }

  async updateRole(id: string, role: string): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    user.role = role as any;
    return this.usersRepository.save(user);
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string | null,
  ): Promise<void> {
    await this.usersRepository.update(userId, { refreshToken });
  }

  async findByIdWithRefreshToken(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        refreshToken: true,
      },
    });
  }
}
