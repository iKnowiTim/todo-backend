import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Board } from './board'

@Entity()
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super()
    Object.assign(this, user)
  }
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false,
    unique: true,
  })
  username: string

  @Column({
    nullable: false,
    unique: true,
  })
  login: string

  @Column({
    nullable: false,
  })
  password: string

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt: Date
}
