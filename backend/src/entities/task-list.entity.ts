import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { TaskEntity } from './task.entity'; 

@Entity('task_list')
export class TaskListEntity {
  @PrimaryGeneratedColumn({ name: 'list_id' }) 
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @CreateDateColumn({ type: 'timestamp', name: 'date_created' })
  dateCreated: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'date_updated' })
  dateUpdated: Date;

  @OneToMany(() => TaskEntity, (task) => task.list)
  tasks: TaskEntity[];
}
