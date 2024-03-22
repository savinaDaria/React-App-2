import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLogController } from './activity-log.controller';
import { ActivityLogEntity } from './activity-log.entity';
import { ActivityLogService } from './activity-log.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityLogEntity])
  ],
  controllers: [ActivityLogController],
  providers: [ActivityLogService]
})
export class ActivityLogModule {}