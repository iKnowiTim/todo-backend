import { Board } from '../entities/board'
import { createQueryBuilder, getRepository, In } from 'typeorm'
import {
  CreateBoardDto,
  UpdateBoardDto,
  UpdatedBoardDto,
} from '../dto/boardsDto'
import { List } from '../entities/list'
import { Task } from '../entities/task'
import { userRepository } from './userRepository'

type BoardWithCounts = Board & { listsCount: number; tasksCount: number }
export class BoardRepository {
  static async getBoardsWithCount(): Promise<BoardWithCounts[]> {
    return (await getRepository(Board)
      .createQueryBuilder('board')
      .loadRelationCountAndMap('board.listsCount', 'board.lists')
      .loadRelationCountAndMap('board.tasksCount', 'board.lists.tasks')
      .getMany()) as BoardWithCounts[]
  }

  static async getBoardById(id: number): Promise<Board | undefined> {
    return await getRepository(Board)
      .createQueryBuilder('board')
      .where(`board.id = ${id}`)
      .leftJoinAndMapMany(
        'board.lists',
        List,
        'list',
        'list.boardId = board.id'
      )
      .leftJoinAndMapMany('list.tasks', Task, 'task', 'task.listId = list.id')
      .getOne()
  }

  static async deleteBoardById(id: number): Promise<void> {
    await getRepository(Board)
      .findOne(id)
      .then(async (board) => {
        if (board) await Board.remove(board)
      })
  }

  static async createBoard(boardDto: CreateBoardDto): Promise<any> {
    const board = await userRepository.GetUserById(1).then(async (user) => {
      return await createQueryBuilder()
        .insert()
        .into(Board)
        .values({
          title: boardDto.title,
          description: boardDto.description,
          user: user,
        })
        .returning('*')
        .execute()
        .then((result) => {
          return result.raw[0]
        })
    })

    return board
  }

  static async updateBoard(id: number, boardDto: UpdateBoardDto): Promise<any> {
    const board = await getRepository(Board)
      .createQueryBuilder()
      .update(Board)
      .set({
        title: boardDto.title,
        description: boardDto.description,
        updatedAt: new Date(),
      })
      .where(`id = ${id}`)
      .returning('*')
      .execute()
      .then((result) => {
        return result.raw[0]
      })

    return board
  }
}
