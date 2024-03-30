import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskListEntity } from './task-list.entity';
import { CreateTaskListDto, UpdateTaskListDto } from './dto/index';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskListEntity)
    private readonly listRepository: Repository<TaskListEntity>,
  ) { }

  async getTaskLists(): Promise<TaskListEntity[]> {
    const lists = await this.listRepository.find({ relations: ['tasks'] });

    return lists;
  }

  async getTaskListById(listId: number): Promise<TaskListEntity> {
    const list = await this.listRepository.findOneBy({ id: listId });

    if (!list) {
      throw new NotFoundException(`TaskList with id ${listId} not found`);
    }

    return list;
  }

  async createTaskList(createTaskDto: CreateTaskListDto): Promise<TaskListEntity> {

    const list = this.listRepository.create({
      ...createTaskDto,
      tasks: []
    });

    await this.listRepository.save(list);
    return list;
  }

  async deleteTaskList(id: number): Promise<void> {
    const list = await this.getTaskListById(id);

    if (!list) {
      throw new NotFoundException(`List with the ID "${id}" was not found.`);
    }

    await this.listRepository.delete(id)
  }

  async updateTaskList(id: number, UpdateTaskListDto: UpdateTaskListDto): Promise<TaskListEntity> {
    const list = await this.getTaskListById(id);

    if (!list) {
      throw new NotFoundException(`List with the ID "${id}" was not found.`);
    }

    Object.assign(list, UpdateTaskListDto);
    return this.listRepository.save(list);
  }
}
