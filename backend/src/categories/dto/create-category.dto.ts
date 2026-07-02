import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Nom de la catégorie', example: 'Informatique' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Description de la catégorie', example: 'Produits et accessoires informatiques' })
  @IsOptional()
  @IsString()
  description?: string;
}
