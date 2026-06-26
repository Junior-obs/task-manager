import { Injectable, BadRequestException } from '@nestjs/common';
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

  // Crée un utilisateur avec hachage du mot de passe (Inscription)
  async create(userData: Partial<User>): Promise<User> {
    // 1. Vérifier que le mot de passe est bien fourni pour le hachage
    if (!userData.password) {
      throw new BadRequestException('Le mot de passe est obligatoire.');
    }

    // 2. Vérifier si l'adresse email est déjà prise
    const existingUser = await this.usersRepository.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new BadRequestException('Cet email est déjà utilisé.');
    }

    // 3. Hachage sécurisé du mot de passe avec bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // 4. Création de l'entité finale avec le mot de passe haché
    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });
    
    const savedUser = await this.usersRepository.save(user);
    
    // 5. Supprimer le mot de passe de l'objet renvoyé par sécurité
    delete (savedUser as any).password;
    return savedUser;
  }

  // Utilisé par le module d'authentification pour vérifier les identifiants au login
 // Utilisé par le module d'authentification pour vérifier les identifiants au login
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
        role: true
      }, // Force la sélection du password pour la vérification bcrypt
    });
  }

  // Utilisé par la stratégie JWT pour valider l'utilisateur connecté via son token
  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
}