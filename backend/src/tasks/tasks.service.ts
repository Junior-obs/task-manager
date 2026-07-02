import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User, UserRole } from '../users/entities/user.entity';

interface FindAllOptions {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  sortBy?: 'createdAt' | 'dueDate' | 'title' | 'priority';
  sortOrder?: 'ASC' | 'DESC';
}

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      userId,
    });
    return this.tasksRepository.save(task);
  }

  async findAll(userId: string | undefined, options?: FindAllOptions) {
    const where: any = {};
    if (userId) {
      where.userId = userId;
    }
    if (options?.status) {
      where.status = options.status;
    }
    if (options?.priority) {
      where.priority = options.priority;
    }

    const page = options?.page || 1;
    const limit = options?.limit || 50;
    const skip = (page - 1) * limit;

    const order: any = {};
    if (options?.sortBy) {
      const sortField = options.sortBy === 'priority'
        ? `CASE WHEN priority = 'high' THEN 3 WHEN priority = 'medium' THEN 2 ELSE 1 END`
        : options.sortBy;
      order[sortField] = options.sortOrder || 'DESC';
    } else {
      order.createdAt = 'DESC';
    }

    const [tasks, total] = await this.tasksRepository.findAndCount({
      where,
      order,
      skip,
      take: limit,
    });

    return {
      data: tasks,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`La tâche avec l'ID ${id} n'existe pas`);
    }
    if (user.role !== UserRole.ADMIN && task.userId !== user.id) {
      throw new ForbiddenException(
        "Vous n'avez pas accès à cette tâche",
      );
    }
    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = await this.findOne(id, user);
    this.tasksRepository.merge(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: string, user: User): Promise<void> {
    const task = await this.findOne(id, user);
    await this.tasksRepository.remove(task);
  }

  async getStats(userId: string) {
    const tasks = await this.tasksRepository.find({
      where: { userId },
    });

    const total = tasks.length;
    const byStatus = { todo: 0, 'in-progress': 0, done: 0 };
    const byPriority = { low: 0, medium: 0, high: 0 };
    const byCategory = {
      personal: 0,
      work: 0,
      shopping: 0,
      health: 0,
      other: 0,
    };

    for (const task of tasks) {
      byStatus[task.status]++;
      byPriority[task.priority]++;
      byCategory[task.category]++;
    }

    const doneCount = byStatus['done'];
    const completionRate =
      total > 0 ? Math.round((doneCount / total) * 100) : 0;

    return { total, byStatus, byPriority, byCategory, completionRate };
  }
}
