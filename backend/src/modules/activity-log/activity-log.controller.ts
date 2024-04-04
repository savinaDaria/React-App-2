import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { CreateActivityLogDto } from './dto/index';
import { ActivityLogEntity } from './activity-log.entity';

@Controller('activity-logs')
export class ActivityLogController {
    constructor(private taskListService: ActivityLogService) {}

    @Get()
    async getAllActivityLogs(): Promise<ActivityLogEntity[]> {
        return this.taskListService.getActivityLogs();
        
    }

    @Get('/:id')
    getActivityLogById(@Param('id') id: number): Promise<ActivityLogEntity> {
        return this.taskListService.getActivityLogByTaskId(id)
    }

    @Post()
    createActivityLog(@Body() createLogDto: CreateActivityLogDto
    ): Promise<ActivityLogEntity> {
        return this.taskListService.createActivityLog(createLogDto);
    }

}