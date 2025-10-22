import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ description: 'The title of the todo', example: 'Buy groceries' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the todo', example: 'Milk, eggs, bread', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Whether the todo is completed', example: false, required: false, default: false })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
