import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { User, UserRole } from '../users/entities/user.entity';

describe('TasksService', () => {
  let service: TasksService;
  let repo: any;

  const mockUser: User = {
    id: 'user1',
    email: 'test@test.com',
    username: 'test',
    password: 'hash',
    role: UserRole.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
    tasks: [],
  };

  const mockAdmin: User = {
    ...mockUser,
    id: 'admin1',
    role: UserRole.ADMIN,
  };

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    category: TaskCategory.WORK,
    dueDate: '2026-07-01',
    userId: 'user1',
    user: mockUser,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const createMockRepo = () => ({
    create: jest.fn().mockReturnValue(mockTask),
    save: jest.fn().mockResolvedValue(mockTask),
    find: jest.fn().mockResolvedValue([mockTask]),
    findAndCount: jest.fn().mockResolvedValue([[mockTask], 1]),
    findOne: jest.fn().mockResolvedValue(mockTask),
    merge: jest.fn().mockReturnValue(mockTask),
    remove: jest.fn().mockResolvedValue(mockTask),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useFactory: createMockRepo,
        },
      ],
    }).compile();
    service = module.get<TasksService>(TasksService);
    repo = module.get(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task with userId', async () => {
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
    it('should return paginated tasks for a user', async () => {
      const result = await service.findAll('user1');
      expect(repo.findAndCount).toHaveBeenCalled();
      expect(result.data).toEqual([mockTask]);
      expect(result.meta).toHaveProperty('total');
      expect(result.meta).toHaveProperty('page');
      expect(result.meta).toHaveProperty('limit');
    });
  });

  describe('findOne', () => {
    it('should return a task by id for owner', async () => {
      const result = await service.findOne('1', mockUser);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual(mockTask);
    });

    it('should return a task for admin even if not owner', async () => {
      const otherUserTask = { ...mockTask, userId: 'other-user' };
      jest.spyOn(repo, 'findOne').mockResolvedValue(otherUserTask);
      const result = await service.findOne('1', mockAdmin);
      expect(result).toEqual(otherUserTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      await expect(service.findOne('999', mockUser)).rejects.toThrow();
    });

    it('should throw ForbiddenException if not owner', async () => {
      const otherUserTask = { ...mockTask, userId: 'other-user' };
      jest.spyOn(repo, 'findOne').mockResolvedValue(otherUserTask);
      await expect(service.findOne('1', mockUser)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const dto = { title: 'Updated' };
      const result = await service.update('1', dto, mockUser);
      expect(repo.merge).toHaveBeenCalled();
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });
  });

  describe('remove', () => {
    it('should delete a task', async () => {
      await service.remove('1', mockUser);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(repo.remove).toHaveBeenCalledWith(mockTask);
    });
  });

  describe('getStats', () => {
    it('should return task statistics', async () => {
      const result = await service.getStats('user1');
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('byStatus');
      expect(result).toHaveProperty('byPriority');
      expect(result).toHaveProperty('byCategory');
      expect(result).toHaveProperty('completionRate');
    });
  });
});
