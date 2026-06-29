import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class UpdateProfileDto {
  @ApiPropertyOptional({ description: 'Nouveau nom d\'utilisateur' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ description: 'Nouvel email' })
  @IsOptional()
  @IsEmail({}, { message: 'Email invalide' })
  email?: string;
}

export class UpdateRoleDto {
  @ApiProperty({ enum: UserRole, description: 'Nouveau rôle' })
  @IsEnum(UserRole)
  role: UserRole;
}
