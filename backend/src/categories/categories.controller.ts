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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Catégories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Créer une catégorie (admin)',
    description: 'Crée une nouvelle catégorie (admin seulement)',
  })
  @ApiResponse({ status: 201, description: 'Catégorie créée' })
  @ApiResponse({ status: 403, description: 'Accès refusé (admin requis)' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lister les catégories',
    description: 'Liste toutes les catégories',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Liste des catégories' })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.categoriesService.findAll({
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: "Détail d'une catégorie",
    description: "Retourne les détails d'une catégorie avec ses produits",
  })
  @ApiResponse({ status: 200, description: 'Catégorie trouvée' })
  @ApiResponse({ status: 404, description: 'Catégorie introuvable' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Modifier une catégorie (admin)',
    description: 'Met à jour une catégorie (admin seulement)',
  })
  @ApiResponse({ status: 200, description: 'Catégorie modifiée' })
  @ApiResponse({ status: 403, description: 'Accès refusé (admin requis)' })
  @ApiResponse({ status: 404, description: 'Catégorie introuvable' })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Supprimer une catégorie (admin)',
    description: 'Supprime une catégorie (admin seulement)',
  })
  @ApiResponse({ status: 204, description: 'Catégorie supprimée' })
  @ApiResponse({ status: 403, description: 'Accès refusé (admin requis)' })
  async remove(@Param('id') id: string) {
    await this.categoriesService.remove(+id);
  }
}
