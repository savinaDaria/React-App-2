import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivityTypeBasic, TaskPriority } from './enums/index';
import { CreateTaskDto, UpdateTaskDto } from './dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { CreateActivityLogDto } from '../activity-log/dto';


@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskEntity)
        private tasksRepository: Repository<TaskEntity>,
        private readonly activityLogService: ActivityLogService,
    ) { }

    async getAllTasks(): Promise<TaskEntity[]> {
        return this.tasksRepository.find();
    }

    async getTaskById(id: number): Promise<TaskEntity> {

        const foundTask = await this.tasksRepository
        .createQueryBuilder('task')        
        .leftJoin('task.list', 'list')
        .select(['task', 'list.name']) 
        .leftJoinAndSelect('task.logs', 'logs')
        .where('task.id = :id', { id })
        .getOne();

        if (!foundTask) {
            throw new NotFoundException(`Task with the given ID "${id}" was not found.`);
        }

        return foundTask;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {

        const task = this.tasksRepository.create(createTaskDto);

        await this.tasksRepository.save(task);
        await this.logActivity(ActivityTypeBasic.ADD, task.id)
        return task;
    }

    async deleteTask(id: number): Promise<void> {
        await this.tasksRepository.softDelete(id)
        await this.logActivity(ActivityTypeBasic.DELETE, id)
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
        const task = await this.getTaskById(id);

        if (!task) {
            throw new NotFoundException(`Task with the ID "${id}" was not found.`);
        }

        const oldValues = { ...task };

        for (const prop in updateTaskDto) {
            if (Object.prototype.hasOwnProperty.call(updateTaskDto, prop)) {
                task[prop] = updateTaskDto[prop];

                await this.logActivity(ActivityTypeBasic.UPDATE, task.id, JSON.stringify(oldValues[prop]), (JSON.stringify(task[prop])), prop);
            }
        }
        Object.assign(task, updateTaskDto);


        return this.tasksRepository.save(task);
    }

    private async logActivity(
        actionType: string,
        id: number,
        oldValue?: any,
        newValue?: any,
        property?: string,
    ): Promise<void> {
        const createActivityLogDto: CreateActivityLogDto = {
            taskId: id,
            actionType,
            oldValue,
            newValue,
            property
        };

        await this.activityLogService.createActivityLog(createActivityLogDto);
    }

}