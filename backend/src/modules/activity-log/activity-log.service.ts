import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityLogEntity } from './activity-log.entity';
import { CreateActivityLogDto } from './dto/index';

@Injectable()
export class ActivityLogService {
    constructor(
        @InjectRepository(ActivityLogEntity)
        private readonly activityLogRepository: Repository<ActivityLogEntity>,
    ) { }

    async getActivityLogs(): Promise<ActivityLogEntity[]> {
        const lists = await this.activityLogRepository 
        .find({
            relations: ['task'],
            withDeleted: true,
          });

        return lists;
    }

    async getActivityLogByTaskId(taskId: number): Promise<ActivityLogEntity> {
        const log = await this.activityLogRepository.findOne({
            where: { taskId },
            relations: ['task'],
            withDeleted: true, 
          });

        if (!log) {
            throw new NotFoundException(`ActivityLog with task id ${taskId} not found`);
        }

        return log;
    }

    async createActivityLog(createTaskDto: CreateActivityLogDto): Promise<ActivityLogEntity> {

        const list = this.activityLogRepository.create(createTaskDto);

        await this.activityLogRepository.save(list);
        return list;
    }

}
