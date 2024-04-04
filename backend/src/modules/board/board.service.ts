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

  async getBoardById(boardId: number): Promise<BoardEntity> {
    const board = await this.boardRepository.findOneBy({ id: boardId });

    if (!board) {
      throw new NotFoundException(`Board with id ${boardId} not found`);
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
    console.log('delete')
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
