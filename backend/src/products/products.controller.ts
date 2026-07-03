import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Produits')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Créer un produit (admin)',
    description: 'Crée un nouveau produit (admin seulement)',
  })
  @ApiResponse({ status: 201, description: 'Produit créé' })
  @ApiResponse({ status: 403, description: 'Accès refusé (admin requis)' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lister les produits',
    description: 'Liste tous les produits avec pagination',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Liste des produits' })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.productsService.findAll({
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: "Détail d'un produit",
    description: "Retourne les détails d'un produit",
  })
  @ApiResponse({ status: 200, description: 'Produit trouvé' })
  @ApiResponse({ status: 404, description: 'Produit introuvable' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Modifier un produit (admin)',
    description: 'Met à jour un produit existant (admin seulement)',
  })
  @ApiResponse({ status: 200, description: 'Produit modifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé (admin requis)' })
  @ApiResponse({ status: 404, description: 'Produit introuvable' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Supprimer un produit (admin)',
    description: 'Supprime un produit (admin seulement)',
  })
  @ApiResponse({ status: 204, description: 'Produit supprimé' })
  @ApiResponse({ status: 403, description: 'Accès refusé (admin requis)' })
  async remove(@Param('id') id: string) {
    await this.productsService.remove(+id);
  }
}
