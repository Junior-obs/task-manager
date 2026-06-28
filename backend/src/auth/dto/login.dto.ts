import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide.' })
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'Le mot de passe doit faire au moins 6 caractères.',
  })
  password: string;
}
