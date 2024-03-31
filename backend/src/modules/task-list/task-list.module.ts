import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListController } from './task-list.controller';
import { TaskListEntity } from './task-list.entity';
import { TaskListService } from './task-list.service';
import { TaskModule } from '../task/task.module';
import { TaskEntity } from '../task/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskListEntity,TaskEntity]),
    TaskModule
  ],
  controllers: [TaskListController],
  providers: [TaskListService]
})
export class TaskListModule {}