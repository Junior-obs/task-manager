import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Adresse email', example: 'user@example.com' })
  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide.' })
  email: string;

  @ApiProperty({ description: "Nom d'utilisateur", example: 'johndoe' })
  @IsString()
  @IsNotEmpty({ message: 'Le nom d’utilisateur est obligatoire.' })
  username: string;

  @ApiProperty({
    description: 'Mot de passe (min 6 caractères)',
    example: 'password123',
  })
  @IsString()
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères.',
  })
  password: string;
}
