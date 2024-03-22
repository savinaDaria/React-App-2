import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TaskEntity } from '../task/task.entity';

@Entity('activity_log')
export class ActivityLogEntity {
  @PrimaryGeneratedColumn({ name: 'log_id' }) 
  id: number;

  @Column({ name: 'task_id', nullable: false })
  taskId: number;

  @Column({ name: 'action_type', nullable: false })
  actionType: string;

  @Column({ name: 'old_value'})
  oldValue: string;

  @Column({ name: 'new_value' })
  newValue: string;

  @CreateDateColumn({ type: 'timestamp', name: 'date_created' })
  dateCreated: Date;
  
  @ManyToOne(() => TaskEntity, (task) => task.logs)
  @JoinColumn({ name: 'task_id' })
  task: TaskEntity;
}
