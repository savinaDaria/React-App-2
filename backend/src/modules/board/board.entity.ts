import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { TaskListEntity } from '../task-list/task-list.entity';

@Entity('board')
export class BoardEntity {
  @PrimaryGeneratedColumn({ name: 'board_id' }) 
  id: number;

  @Column({ nullable: false })
  name: string;

  @CreateDateColumn({ type: 'timestamp', name: 'date_created' })
  dateCreated: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'date_updated' })
  dateUpdated: Date;

  @OneToMany(() => TaskListEntity, (list) => list.board, { cascade: true})
  lists: TaskListEntity[];
}
