import { IsEnum, IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus, TaskPriority, TaskCategory } from '../task.entity';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Titre de la tâche',
    example: 'Finaliser le rapport',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Description détaillée',
    example: 'Terminer la rédaction et la relecture',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    description: 'Statut de la tâche',
    default: TaskStatus.TODO,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    enum: TaskPriority,
    description: 'Priorité',
    default: TaskPriority.MEDIUM,
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiPropertyOptional({
    enum: TaskCategory,
    description: 'Catégorie',
    default: TaskCategory.OTHER,
  })
  @IsOptional()
  @IsEnum(TaskCategory)
  category?: TaskCategory;

  @ApiPropertyOptional({
    description: "Date d'échéance (YYYY-MM-DD)",
    example: '2026-07-15',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
