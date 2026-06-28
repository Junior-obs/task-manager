import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Le nom d’utilisateur est obligatoire.' })
  username: string;

  @IsString()
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères.',
  })
  password: string;
}
