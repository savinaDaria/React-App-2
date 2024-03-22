import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListController } from './task-list.controller';
import { TaskListEntity } from './task-list.entity';
import { TaskListService } from './task-list.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskListEntity])
  ],
  controllers: [TaskListController],
  providers: [TaskListService]
})
export class TaskListModule {}