import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Adresse email', example: 'user@example.com' })
  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide.' })
  email: string;

  @ApiProperty({ description: 'Mot de passe', example: 'password123' })
  @IsString()
  @MinLength(6, {
    message: 'Le mot de passe doit faire au moins 6 caractères.',
  })
  password: string;
}
