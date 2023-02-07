import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'
import { List } from './list'
import { User } from './user'

@Entity({
  name: 'board',
})
export class Board extends BaseEntity {
  constructor(board: Partial<Board>) {
    super()
    Object.assign(this, board)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  description: string

  @Column({
    nullable: false,
  })
  title: string

  @ManyToOne(() => User, (user) => user.boards, {
    nullable: false,
  })
  user: User

  @OneToMany(() => List, (list) => list.board)
  lists: List[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt: Date
}
