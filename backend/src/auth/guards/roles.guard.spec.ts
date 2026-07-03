import { RolesGuard } from './roles.guard';
import { ForbiddenException } from '@nestjs/common';
import { UserRole } from '../../users/entities/user.entity';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: any;

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
    };
    guard = new RolesGuard(reflector);
  });

  const mockContext = (user: any) =>
    ({
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
    }) as any;

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access if no roles required', () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);
    const result = guard.canActivate(mockContext({ role: UserRole.USER }));
    expect(result).toBe(true);
  });

  it('should allow access if user has required role', () => {
    reflector.getAllAndOverride.mockReturnValue([UserRole.ADMIN]);
    const result = guard.canActivate(mockContext({ role: UserRole.ADMIN }));
    expect(result).toBe(true);
  });

  it('should deny access if user does not have required role', () => {
    reflector.getAllAndOverride.mockReturnValue([UserRole.ADMIN]);
    expect(() =>
      guard.canActivate(mockContext({ role: UserRole.USER })),
    ).toThrow(ForbiddenException);
  });

  it('should deny access if no user', () => {
    reflector.getAllAndOverride.mockReturnValue([UserRole.USER]);
    expect(() => guard.canActivate(mockContext(null))).toThrow(
      ForbiddenException,
    );
  });
});
