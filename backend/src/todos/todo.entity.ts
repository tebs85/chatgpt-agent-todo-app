import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('todos')
export class Todo {
  @ApiProperty({ description: 'The unique identifier of the todo', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The title of the todo', example: 'Buy groceries' })
  @Column()
  title: string;

  @ApiProperty({ description: 'The description of the todo', example: 'Milk, eggs, bread', nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ description: 'Whether the todo is completed', example: false, default: false })
  @Column({ default: false })
  completed: boolean;

  @ApiProperty({ description: 'The date the todo was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'The date the todo was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}
