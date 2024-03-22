import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskListEntity } from './task-list.entity';
import { CreateTaskListDto, UpdateTaskListDto  } from './dto/index';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskListEntity)
    private readonly listRepository: Repository<TaskListEntity>,
  ) {}

  async getTaskLists(): Promise<TaskListEntity[]> {
    const lists = await this.listRepository.find();

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
    const { name } = createTaskDto;

    const list = this.listRepository.create({
        name
    });

    await this.listRepository.save(list);
    return list;
}

async deleteTaskList(id: number): Promise<void> {
    await this.listRepository.delete(id)
}

async updateTaskList(id: number, UpdateTaskDto: UpdateTaskListDto): Promise<TaskListEntity>{
    const list = await this.getTaskListById(id);
    
    if (!list) {
        throw new NotFoundException(`Task with the ID "${id}" was not found.`);
    }

    list.name = UpdateTaskDto.name;

    return this.listRepository.save(list);
}
}
