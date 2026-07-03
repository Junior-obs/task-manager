import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Tâches')
@ApiBearerAuth('JWT-auth')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Créer une tâche',
    description: "Crée une nouvelle tâche pour l'utilisateur connecté",
  })
  @ApiResponse({ status: 201, description: 'Tâche créée avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(createTaskDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Lister ses tâches',
    description:
      "Liste les tâches de l'utilisateur connecté avec pagination et filtres",
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Numéro de page',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: "Nombre d'éléments par page",
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['todo', 'in-progress', 'done'],
    description: 'Filtrer par statut',
  })
  @ApiQuery({
    name: 'priority',
    required: false,
    enum: ['low', 'medium', 'high'],
    description: 'Filtrer par priorité',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['createdAt', 'dueDate', 'title', 'priority'],
    description: 'Champ de tri',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['ASC', 'DESC'],
    description: 'Ordre de tri',
  })
  @ApiResponse({ status: 200, description: 'Liste des tâches retournée' })
  findAll(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
  ) {
    return this.tasksService.findAll(req.user.id, {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      status,
      priority,
      sortBy: sortBy as any,
      sortOrder: sortOrder as any,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  @ApiOperation({
    summary: 'Statistiques des tâches',
    description:
      'Retourne les statistiques (par statut, priorité, catégorie, taux de complétion)',
  })
  @ApiResponse({ status: 200, description: 'Statistiques retournées' })
  getStats(@Request() req) {
    return this.tasksService.getStats(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('all')
  @ApiOperation({
    summary: 'Toutes les tâches (admin)',
    description:
      'Liste toutes les tâches de tous les utilisateurs (admin seulement)',
  })
  @ApiResponse({ status: 200, description: 'Liste de toutes les tâches' })
  @ApiResponse({ status: 403, description: 'Accès refusé (admin requis)' })
  findAllTasks(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
  ) {
    return this.tasksService.findAll(undefined, {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      status,
      priority,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({
    summary: "Détail d'une tâche",
    description: "Retourne les détails d'une tâche spécifique",
  })
  @ApiResponse({ status: 200, description: 'Tâche trouvée' })
  @ApiResponse({ status: 404, description: 'Tâche introuvable' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.tasksService.findOne(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Modifier une tâche',
    description: 'Met à jour une tâche existante',
  })
  @ApiResponse({ status: 200, description: 'Tâche modifiée avec succès' })
  @ApiResponse({ status: 404, description: 'Tâche introuvable' })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    return this.tasksService.update(id, updateTaskDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Supprimer une tâche',
    description: 'Supprime définitivement une tâche',
  })
  @ApiResponse({ status: 204, description: 'Tâche supprimée avec succès' })
  @ApiResponse({ status: 404, description: 'Tâche introuvable' })
  async remove(@Param('id') id: string, @Request() req) {
    await this.tasksService.remove(id, req.user);
  }
}
