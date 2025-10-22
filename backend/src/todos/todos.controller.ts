import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiOperation({ summary: 'Get all todos', description: 'Retrieve all todos ordered by creation date (newest first)' })
  @ApiResponse({ status: 200, description: 'List of todos retrieved successfully', type: [Todo] })
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by id', description: 'Retrieve a specific todo by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the todo', type: 'number', example: 1 })
  @ApiResponse({ status: 200, description: 'Todo retrieved successfully', type: Todo })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo', description: 'Create a new todo item' })
  @ApiResponse({ status: 201, description: 'Todo created successfully', type: Todo })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo', description: 'Update an existing todo by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the todo to update', type: 'number', example: 1 })
  @ApiResponse({ status: 200, description: 'Todo updated successfully', type: Todo })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a todo', description: 'Delete a todo by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the todo to delete', type: 'number', example: 1 })
  @ApiResponse({ status: 204, description: 'Todo deleted successfully' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
