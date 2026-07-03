import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksService } from './tasks.service';
import { Task, TaskStatus, TaskPriority, TaskCategory } from './task.entity';

describe('TasksService', () => {
  let service: TasksService;
  let findOneMock: jest.Mock;

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    category: TaskCategory.WORK,
    dueDate: '2026-07-01',
    userId: 'user1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const createMockRepo = () => {
    findOneMock = jest.fn().mockResolvedValue(mockTask);
    return {
      create: jest.fn().mockReturnValue(mockTask),
      save: jest.fn().mockResolvedValue(mockTask),
      find: jest.fn().mockResolvedValue([mockTask]),
      findOne: findOneMock,
      merge: jest.fn().mockReturnValue(mockTask),
      remove: jest.fn().mockResolvedValue(mockTask),
    };
  };

  const setupModule = async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useFactory: createMockRepo,
        },
      ],
    }).compile();
    return module;
  };

  it('should be defined', async () => {
    const module = await setupModule();
    service = module.get<TasksService>(TasksService);
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const module = await setupModule();
      service = module.get<TasksService>(TasksService);
      const repo = module.get<Repository<Task>>(getRepositoryToken(Task));
      const dto = { title: 'Test Task', description: 'Test' };
      const result = await service.create(dto, 'user1');
      expect(jest.spyOn(repo, 'create')).toHaveBeenCalledWith({
        ...dto,
        userId: 'user1',
      });
      expect(jest.spyOn(repo, 'save')).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const module = await setupModule();
      service = module.get<TasksService>(TasksService);
      const repo = module.get<Repository<Task>>(getRepositoryToken(Task));
      const result = await service.findAll('user1');
      expect(jest.spyOn(repo, 'find')).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual([mockTask]);
    });
  });

  describe('findOne', () => {
    it('should return a task by id', async () => {
      const module = await setupModule();
      service = module.get<TasksService>(TasksService);
      const repo = module.get<Repository<Task>>(getRepositoryToken(Task));
      const result = await service.findOne('1');
      expect(jest.spyOn(repo, 'findOne')).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      const module = await setupModule();
      service = module.get<TasksService>(TasksService);
      const repo = module.get<Repository<Task>>(getRepositoryToken(Task));
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      await expect(service.findOne('999')).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should delete a task', async () => {
      const module = await setupModule();
      service = module.get<TasksService>(TasksService);
      const repo = module.get<Repository<Task>>(getRepositoryToken(Task));
      await service.remove('1');
      expect(jest.spyOn(repo, 'findOne')).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(jest.spyOn(repo, 'remove')).toHaveBeenCalledWith(mockTask);
    });
  });

  describe('getStats', () => {
    it('should return task statistics', async () => {
      const module = await setupModule();
      service = module.get<TasksService>(TasksService);
      const result = await service.getStats('user1');
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('byStatus');
      expect(result).toHaveProperty('byPriority');
      expect(result).toHaveProperty('byCategory');
      expect(result).toHaveProperty('completionRate');
    });
  });
});
