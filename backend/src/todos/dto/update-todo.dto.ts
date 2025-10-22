import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty({ description: 'The title of the todo', example: 'Buy groceries', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The description of the todo', example: 'Milk, eggs, bread, cheese', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Whether the todo is completed', example: true, required: false })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
