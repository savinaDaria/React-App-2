import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TaskEntity } from '../task/task.entity';
import { BoardEntity } from '../board/board.entity';

@Entity('activity_log')
export class ActivityLogEntity {
  @PrimaryGeneratedColumn({ name: 'log_id' }) 
  id: number;

  @Column({ name: 'task_id', nullable: false })
  taskId: number;

  @Column({ name: 'board_id', nullable: false })
  boardId: number;

  @Column({ name: 'action_type', nullable: false })
  actionType: string;

  @Column({ name: 'property'})
  property: string;

  @Column({ name: 'old_value'})
  oldValue: string;

  @Column({ name: 'new_value' })
  newValue: string;

  @CreateDateColumn({ type: 'timestamp', name: 'date_created' })
  dateCreated: Date;
  
  @ManyToOne(() => TaskEntity, (task) => task.logs)
  @JoinColumn({ name: 'task_id' })
  task: TaskEntity;

  @ManyToOne(() => BoardEntity, (board) => board.logs)
  @JoinColumn({ name: 'board_id' })
  board: BoardEntity;
}
