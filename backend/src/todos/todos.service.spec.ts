import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodosService', () => {
  let service: TodosService;
  let repository: Repository<Todo>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    repository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const mockTodos: Todo[] = [
        {
          id: 1,
          title: 'Test Todo',
          description: 'Test Description',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockRepository.find.mockResolvedValue(mockTodos);

      const result = await service.findAll();

      expect(result).toEqual(mockTodos);
      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      const mockTodo: Todo = {
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(mockTodo);

      const result = await service.findOne(1);

      expect(result).toEqual(mockTodo);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException when todo is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'Todo with ID 999 not found',
      );
    });
  });

  describe('create', () => {
    it('should create and return a new todo', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'New Todo',
        description: 'New Description',
      };

      const mockTodo: Todo = {
        id: 1,
        ...createTodoDto,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.create.mockReturnValue(mockTodo);
      mockRepository.save.mockResolvedValue(mockTodo);

      const result = await service.create(createTodoDto);

      expect(result).toEqual(mockTodo);
      expect(mockRepository.create).toHaveBeenCalledWith(createTodoDto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockTodo);
    });
  });

  describe('update', () => {
    it('should update and return a todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Todo',
        completed: true,
      };

      const existingTodo: Todo = {
        id: 1,
        title: 'Old Title',
        description: 'Old Description',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedTodo: Todo = {
        ...existingTodo,
        ...updateTodoDto,
      };

      mockRepository.findOne.mockResolvedValue(existingTodo);
      mockRepository.save.mockResolvedValue(updatedTodo);

      const result = await service.update(1, updateTodoDto);

      expect(result.title).toEqual(updateTodoDto.title);
      expect(result.completed).toEqual(updateTodoDto.completed);
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when updating non-existent todo', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const updateTodoDto: UpdateTodoDto = { title: 'Updated' };

      await expect(service.update(999, updateTodoDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      const mockTodo: Todo = {
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(mockTodo);
      mockRepository.remove.mockResolvedValue(mockTodo);

      await service.remove(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepository.remove).toHaveBeenCalledWith(mockTodo);
    });

    it('should throw NotFoundException when removing non-existent todo', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
