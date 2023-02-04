import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { User } from './user'

@Entity({
  name: 'board',
})
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  description: string

  @Column({
    nullable: false,
  })
  title: string

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
  })
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt: Date
}
