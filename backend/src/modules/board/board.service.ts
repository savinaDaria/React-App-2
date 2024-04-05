import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './board.entity';
import { CreateBoardDto, UpdateBoardDto } from './dto/index';
import { TaskEntity } from '../task/task.entity';
import { TaskService } from '../task/task.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly taskService: TaskService,
  ) { }

  async getBoards(): Promise<BoardEntity[]> {
    const boards = await this.boardRepository.find({ order: { dateCreated: 'DESC' } },);

    return boards;
  }

  async getBoardById(id: number): Promise<BoardEntity> {
    const board = await this.boardRepository
    .createQueryBuilder('board')
    .leftJoinAndSelect('board.logs', 'logs')
    .leftJoinAndSelect('logs.task', 'task') // Join logs with tasks
    .leftJoinAndSelect('board.lists', 'lists')
    .leftJoinAndSelect('lists.tasks', 'listTasks') // You may need to join lists with tasks if logs are associated with list tasks
    .select([
      'board',
      'logs',
      'lists',
      'task.name', // Select the name directly from task
      'listTasks' // Select list tasks if needed
    ])
    .where('board.id = :id', { id })
    .getOne();

    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }

    return board;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardEntity> {

    const board = this.boardRepository.create({
      ...createBoardDto,
      lists: []
    });

    await this.boardRepository.save(board);
    return board;
  }

  async deleteBoard(id: number): Promise<void> {
    const board = await this.getBoardById(id);

    if (!board) {
      throw new NotFoundException(`Board with the ID "${id}" was not found.`);
    }
    await this.boardRepository.delete(id)
  }

  async updateBoard(id: number, UpdateBoardDto: UpdateBoardDto): Promise<BoardEntity> {
    const board = await this.getBoardById(id);

    if (!board) {
      throw new NotFoundException(`Board with the ID "${id}" was not found.`);
    }

    Object.assign(board, UpdateBoardDto);
    return this.boardRepository.save(board);
  }
}
