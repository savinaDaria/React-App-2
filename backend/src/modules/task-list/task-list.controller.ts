import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { CreateTaskListDto, UpdateTaskListDto  } from './dto/index';
import { TaskListEntity } from './task-list.entity';

@Controller('task-list')
export class TaskListController {
    constructor(private taskListService: TaskListService) {}

    @Get()
    async getAllTaskLists(): Promise<TaskListEntity[]> {
        return this.taskListService.getTaskLists();
        
    }

    @Get('/:id')
    getTaskListById(@Param('id') id: number): Promise<TaskListEntity> {
        return this.taskListService.getTaskListById(id)
    }

    @Post()
    createTaskList(@Body() createTaskDto: CreateTaskListDto
    ): Promise<TaskListEntity> {
        return this.taskListService.createTaskList(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: number): Promise<void>{
        return this.taskListService.deleteTaskList(id);
    }

    @Patch('/:id')
    async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskListDto): Promise<TaskListEntity> {
        return this.taskListService.updateTaskList(id, updateTaskDto);
    }

}