import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivityTypeBasic } from './enums/index';
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
        return this.tasksRepository.find({ order: { dateCreated: 'ASC' } });
    }

    async getTaskById(id: number): Promise<TaskEntity> {

        const foundTask = await this.tasksRepository
        .createQueryBuilder('task')
        .leftJoin('task.list', 'list')
        .leftJoin('list.board', 'board') 
        .select([
          'task',
          'list.name',
          'board.id' 
        ])
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
        const fulltask=await this.getTaskById(task.id);
        await this.logActivity(ActivityTypeBasic.ADD, task.id,fulltask.list.board.id)
        return task;
    }

    async deleteTask(id: number): Promise<void> {
        const task = await this.getTaskById(id);

        if (!task) {
            throw new NotFoundException(`Task with the ID "${id}" was not found.`);
        }

        await this.tasksRepository.softDelete(id)
        await this.logActivity(ActivityTypeBasic.DELETE, id, task.list.board.id)
    }

    async hardDeleteTask(id: number): Promise<void> {
        const task = await this.getTaskById(id);

        if (!task) {
            throw new NotFoundException(`Task with the ID "${id}" was not found.`);
        }

        await this.tasksRepository.delete(id)
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
        const task = await this.getTaskById(id);

        if (!task) {
            throw new NotFoundException(`Task with the ID "${id}" was not found.`);
        }

        const oldValues = { ...task };

        await this.tasksRepository.update(id, updateTaskDto);
        const newTask = await this.getTaskById(id);

        for (const prop in updateTaskDto) {
            if (updateTaskDto.hasOwnProperty(prop)) {
                let newValue: string, oldValue: string;
                if (prop === 'listId') {
                    newValue = newTask.list.name;
                    oldValue = oldValues.list.name;
                }
                else {
                    newValue = typeof updateTaskDto[prop] == 'string' ? updateTaskDto[prop] : updateTaskDto[prop];
                    oldValue = typeof oldValues[prop] == 'string' ? oldValues[prop] : oldValues[prop];
                }
                await this.logActivity(
                    ActivityTypeBasic.UPDATE,
                    oldValues.id,
                    oldValues.list.board.id,
                    oldValue,
                    newValue,
                    prop
                );
            }
        }

        return await this.getTaskById(id);
    }

    private async logActivity(
        actionType: string,
        id: number,
        boardId: number,
        oldValue?: string,
        newValue?: string,
        property?: string,
    ): Promise < void> {

    const createActivityLogDto: CreateActivityLogDto = {
        taskId: id,
        boardId,
        actionType,
        oldValue,
        newValue,
        property
    };

    await this.activityLogService.createActivityLog(createActivityLogDto);
}

}