import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh token pour générer un nouveau JWT' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
