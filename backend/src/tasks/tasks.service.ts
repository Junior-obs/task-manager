import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId?: string): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      userId,
    });
    return this.tasksRepository.save(task);
  }

  async findAll(userId?: string): Promise<Task[]> {
    const where = userId ? { userId } : {};
    return this.tasksRepository.find({ where, order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`La tâche avec l'ID ${id} n'existe pas`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    this.tasksRepository.merge(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.tasksRepository.remove(task);
  }

  async getStats(userId?: string) {
    const where = userId ? { userId } : {};
    const tasks = await this.tasksRepository.find({ where });

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
