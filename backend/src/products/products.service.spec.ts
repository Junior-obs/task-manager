import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: any;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'A test product',
    price: 29.99,
    stock: 10,
    categoryId: 1,
    category: null,
  };

  const createMockRepo = () => ({
    create: jest.fn().mockReturnValue(mockProduct),
    save: jest.fn().mockResolvedValue(mockProduct),
    find: jest.fn().mockResolvedValue([mockProduct]),
    findAndCount: jest.fn().mockResolvedValue([[mockProduct], 1]),
    findOne: jest.fn().mockResolvedValue(mockProduct),
    merge: jest.fn().mockReturnValue(mockProduct),
    remove: jest.fn().mockResolvedValue(mockProduct),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useFactory: createMockRepo,
        },
      ],
    }).compile();
    service = module.get<ProductsService>(ProductsService);
    repo = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const dto = {
        name: 'Test Product',
        price: 29.99,
        stock: 10,
        categoryId: 1,
      };
      const result = await service.create(dto);
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return all products with pagination', async () => {
      const result = await service.findAll();
      expect(repo.findAndCount).toHaveBeenCalled();
      expect(result).toEqual({
        data: [mockProduct],
        meta: { total: 1, page: 1, limit: 50, totalPages: 1 },
      });
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const result = await service.findOne(1);
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: { category: true },
      });
      expect(result).toEqual(mockProduct);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const dto = { name: 'Updated', price: 39.99 };
      const result = await service.update(1, dto);
      expect(repo.merge).toHaveBeenCalled();
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual(mockProduct);
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      await service.remove(1);
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: { category: true },
      });
      expect(repo.remove).toHaveBeenCalledWith(mockProduct);
    });
  });
});
