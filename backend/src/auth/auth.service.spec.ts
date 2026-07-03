import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
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
    role: 'user' as User['role'],
  };

  const mockUsersService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findByEmail: jest.fn().mockResolvedValue(mockUser),
    findById: jest.fn().mockResolvedValue(mockUser),
    findByIdWithRefreshToken: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    updateRefreshToken: jest.fn().mockResolvedValue(undefined),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('test-token'),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('test-value'),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const dto = {
        email: 'test@test.com',
        username: 'testuser',
        password: 'password123',
      };
      const result = await service.register(dto);
      expect(mockUsersService.create).toHaveBeenCalledWith(dto);
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
