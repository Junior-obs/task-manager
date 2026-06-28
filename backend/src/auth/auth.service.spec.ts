import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true),
  genSalt: jest.fn().mockResolvedValue('salt'),
  hash: jest.fn().mockResolvedValue('hashedpassword'),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  const mockUser: Partial<User> = {
    id: '1',
    email: 'test@test.com',
    username: 'testuser',
    password: 'hashedpassword',
    role: 'user' as any,
  };

  const mockUsersService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findByEmail: jest.fn().mockResolvedValue(mockUser),
    findById: jest.fn().mockResolvedValue(mockUser),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('test-token'),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const dto = {
        email: 'test@test.com',
        username: 'testuser',
        password: 'password123',
      };
      const result = await service.register(dto);
      expect(usersService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('login', () => {
    it('should return access token on valid login', async () => {
      const dto = { email: 'test@test.com', password: 'password123' };
      const result = await service.login(dto);
      expect(result.access_token).toBe('test-token');
      expect(result.user.email).toBe('test@test.com');
    });

    it('should throw UnauthorizedException on invalid email', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      const dto = { email: 'wrong@test.com', password: 'password123' };
      await expect(service.login(dto)).rejects.toThrow();
    });
  });
});
