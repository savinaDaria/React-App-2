import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { TaskListEntity } from '../task-list/task-list.entity';
import { ActivityLogEntity } from '../activity-log/activity-log.entity';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn({ name: 'task_id' })
  id: number;

  @Column('integer', { name: 'list_id' })
  listId: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  priority: string;

  @Column({ nullable: true, name: 'duedate' })
  dueDate: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'date_created' })
  dateCreated: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'date_updated' })
  dateUpdated: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'date_deleted', nullable: true })
    dateDeleted: Date; 

  @ManyToOne(() => TaskListEntity, (list) => list.tasks)
  @JoinColumn({ name: 'list_id' })
  list: TaskListEntity;

  @OneToMany(() => ActivityLogEntity, (log) => log.task)
  logs: ActivityLogEntity[];
}
