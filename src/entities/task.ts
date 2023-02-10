import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { List } from './list'

@Entity()
export class Task extends BaseEntity {
  constructor(task: Partial<Task>) {
    super()
    Object.assign(this, task)
  }
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false,
  })
  title: string

  @Column()
  description: string

  @ManyToOne(() => List, (list) => list.tasks)
  list: List

  @Column()
  completed: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt: Date
}
