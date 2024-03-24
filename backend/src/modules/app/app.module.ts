import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from '~/utils/database-config/typeorm.config';
import { TaskModule } from '~/modules/task/task.module';
import { TaskListModule } from '~/modules/task-list/task-list.module';
import { ActivityLogModule } from '~/modules/activity-log/activity-log.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        envFilePath: '.env', 
      })],
      useFactory: async (config: ConfigService) => getTypeOrmConfig(config),
      inject: [ConfigService],
    }),
    ActivityLogModule,
    TaskModule,
   TaskListModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
