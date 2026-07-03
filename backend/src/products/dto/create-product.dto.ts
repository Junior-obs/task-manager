import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  IsPositive,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nom du produit',
    example: 'Ordinateur portable',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Description du produit',
    example: 'PC portable 16Go RAM, 512Go SSD',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Prix du produit', example: 899.99 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiPropertyOptional({
    description: 'Stock disponible',
    example: 10,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({ description: 'ID de la catégorie', example: 1 })
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
