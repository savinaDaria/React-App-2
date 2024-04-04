import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardEntity } from './board.entity';
import { BoardService } from './board.service';
import { TaskModule } from '../task/task.module';
import { TaskEntity } from '../task/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardEntity,TaskEntity]),
    TaskModule
  ],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}