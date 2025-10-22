import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  const mockTodosService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockTodosService,
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      mockTodosService.findAll.mockResolvedValue(mockTodos);

      const result = await controller.findAll();

      expect(result).toEqual(mockTodos);
      expect(service.findAll).toHaveBeenCalled();
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

      mockTodosService.findOne.mockResolvedValue(mockTodo);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockTodo);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
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

      mockTodosService.create.mockResolvedValue(mockTodo);

      const result = await controller.create(createTodoDto);

      expect(result).toEqual(mockTodo);
      expect(service.create).toHaveBeenCalledWith(createTodoDto);
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Todo',
        completed: true,
      };

      const mockTodo: Todo = {
        id: 1,
        title: 'Updated Todo',
        description: 'Test Description',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTodosService.update.mockResolvedValue(mockTodo);

      const result = await controller.update('1', updateTodoDto);

      expect(result).toEqual(mockTodo);
      expect(service.update).toHaveBeenCalledWith(1, updateTodoDto);
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      mockTodosService.remove.mockResolvedValue(undefined);

      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
