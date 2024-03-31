import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto  } from './dto/index';
import { TaskEntity } from './task.entity';

@Controller('tasks')
export class TaskController {
    constructor(private tasksService: TaskService) {}

    @Get()
    async getAllTasks(): Promise<TaskEntity[]> {
        return this.tasksService.getAllTasks();
        
    }

    @Get('/:id')
    getTaskById(@Param('id') id: number): Promise<TaskEntity> {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto
    ): Promise<TaskEntity> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: number): Promise<void>{
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id')
    async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
  
        return this.tasksService.updateTask(id, updateTaskDto);
    }

}