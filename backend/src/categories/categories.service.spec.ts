import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repo: any;

  const mockCategory: Category = {
    id: 1,
    name: 'Test Category',
    description: 'A test category',
    products: [],
  };

  const createMockRepo = () => ({
    create: jest.fn().mockReturnValue(mockCategory),
    save: jest.fn().mockResolvedValue(mockCategory),
    find: jest.fn().mockResolvedValue([mockCategory]),
    findAndCount: jest.fn().mockResolvedValue([[mockCategory], 1]),
    findOne: jest.fn().mockResolvedValue(mockCategory),
    merge: jest.fn().mockReturnValue(mockCategory),
    remove: jest.fn().mockResolvedValue(mockCategory),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useFactory: createMockRepo,
        },
      ],
    }).compile();
    service = module.get<CategoriesService>(CategoriesService);
    repo = module.get(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const dto = { name: 'New Category', description: 'Description' };
      const result = await service.create(dto as any);
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual(mockCategory);
    });
  });

  describe('findAll', () => {
    it('should return all categories with pagination', async () => {
      const result = await service.findAll();
      expect(repo.findAndCount).toHaveBeenCalled();
      expect(result).toEqual({
        data: [mockCategory],
        meta: { total: 1, page: 1, limit: 50, totalPages: 1 },
      });
    });
  });

  describe('findOne', () => {
    it('should return a category by id with products', async () => {
      const result = await service.findOne(1);
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: { products: true },
      });
      expect(result).toEqual(mockCategory);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const dto = { name: 'Updated' };
      const result = await service.update(1, dto as any);
      expect(repo.merge).toHaveBeenCalled();
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual(mockCategory);
    });
  });

  describe('remove', () => {
    it('should delete a category', async () => {
      await service.remove(1);
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: { products: true },
      });
      expect(repo.remove).toHaveBeenCalledWith(mockCategory);
    });
  });
});
