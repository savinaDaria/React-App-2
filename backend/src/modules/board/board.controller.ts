import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto, UpdateBoardDto  } from './dto/index';
import { BoardEntity } from './board.entity';

@Controller('boards')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get()
    async getAllBoards(): Promise<BoardEntity[]> {
        return this.boardService.getBoards();        
    }

    @Get('/:id')
    async getBoardById(@Param('id') id: number): Promise<BoardEntity> {
        return this.boardService.getBoardById(id);
    }

    @Post()
    async createBoard(@Body() createTaskDto: CreateBoardDto
    ): Promise<BoardEntity> {
        return this.boardService.createBoard(createTaskDto);
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id: number): Promise<void>{
        return this.boardService.deleteBoard(id);
    }

    @Patch('/:id')
    async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateBoardDto): Promise<BoardEntity> {
        return this.boardService.updateBoard(id, updateTaskDto);
    }

}