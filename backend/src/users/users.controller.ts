import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './entities/user.entity';
import { UpdateProfileDto, UpdateRoleDto } from './dto/update-profile.dto';

@ApiTags('Utilisateurs')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({
    summary: 'Profil utilisateur',
    description: "Retourne le profil de l'utilisateur connecté",
  })
  @ApiResponse({ status: 200, description: 'Profil retourné' })
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @ApiOperation({
    summary: 'Modifier son profil',
    description: "Met à jour le nom d'utilisateur et/ou l'email",
  })
  @ApiResponse({ status: 200, description: 'Profil mis à jour' })
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(req.user.id, updateProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Supprimer son compte',
    description: "Supprime définitivement le compte de l'utilisateur connecté",
  })
  @ApiResponse({ status: 204, description: 'Compte supprimé' })
  async deleteAccount(@Request() req) {
    await this.usersService.deleteAccount(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  @ApiOperation({
    summary: 'Liste des utilisateurs (admin)',
    description: 'Retourne la liste de tous les utilisateurs',
  })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs' })
  @ApiResponse({ status: 403, description: 'Accès refusé (admin requis)' })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/role')
  @ApiOperation({
    summary: 'Changer le rôle (admin)',
    description: "Modifie le rôle d'un utilisateur (admin seulement)",
  })
  @ApiResponse({ status: 200, description: 'Rôle mis à jour' })
  @ApiResponse({ status: 403, description: 'Accès refusé (admin requis)' })
  @ApiResponse({ status: 404, description: 'Utilisateur introuvable' })
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.usersService.updateRole(id, updateRoleDto.role);
  }
}
