import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskPriority } from './enums/index';
import { CreateTaskDto, UpdateTaskDto  } from './dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';


@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskEntity)
        private tasksRepository: Repository<TaskEntity>
    ) {}
    
    async getAllTasks(): Promise<TaskEntity[]> {
        return this.tasksRepository.find();
    }

    async getTaskById(id: number): Promise<TaskEntity> {
        const foundTask = await this.tasksRepository.findOneBy({ id: id });

        if(!foundTask) {
            throw new NotFoundException(`Task with the given ID "${id}" was not found.`);
        }

        return foundTask;
    }
    
    async createTasks(createTaskDto: CreateTaskDto): Promise<TaskEntity> {

        const task = this.tasksRepository.create(createTaskDto);

        await this.tasksRepository.save(task);
        return task;
    }

    async deleteTasks(id: number): Promise<void> {
        await this.tasksRepository.delete(id)
    }

    async updateTask(id: number, UpdateTaskDto: UpdateTaskDto): Promise<TaskEntity>{
        const task = await this.getTaskById(id);
        
        if (!task) {
            throw new NotFoundException(`Task with the ID "${id}" was not found.`);
        }

        Object.assign(task, UpdateTaskDto);
        

      return this.tasksRepository.save(task);
    }
    
}