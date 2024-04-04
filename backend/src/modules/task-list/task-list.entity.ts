import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { TaskEntity } from '../task/task.entity'; 
import { BoardEntity } from '../board/board.entity';

@Entity('task_list')
export class TaskListEntity {
  @PrimaryGeneratedColumn({ name: 'list_id' }) 
  id: number;

  @Column('integer', { name: 'board_id' })
  boardId: number;

  @Column({ nullable: false })
  name: string;

  @CreateDateColumn({ type: 'timestamp', name: 'date_created' })
  dateCreated: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'date_updated' })
  dateUpdated: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'date_deleted', nullable: true })
  dateDeleted: Date; 

  @OneToMany(() => TaskEntity, (task) => task.list, { eager:true,cascade: true })
  tasks: TaskEntity[];

  @ManyToOne(() => BoardEntity, (board) => board.lists)
  @JoinColumn({ name: 'board_id' })
  board: BoardEntity;
}
