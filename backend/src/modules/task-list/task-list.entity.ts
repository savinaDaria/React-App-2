import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

import { TaskEntity } from '../task/task.entity'; 

@Entity('task_list')
export class TaskListEntity {
  @PrimaryGeneratedColumn({ name: 'list_id' }) 
  id: number;

  @Column({ nullable: false })
  name: string;

  @CreateDateColumn({ type: 'timestamp', name: 'date_created' })
  dateCreated: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'date_updated' })
  dateUpdated: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'date_deleted', nullable: true })
  dateDeleted: Date; 

  @OneToMany(() => TaskEntity, (task) => task.list, { eager:true })
  tasks: TaskEntity[];
}
