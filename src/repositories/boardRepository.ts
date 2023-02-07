import { Board } from '../entities/board'
import { createQueryBuilder, getRepository } from 'typeorm'
import {
  CreateBoardDto,
  UpdateBoardDto,
  UpdatedBoardDto,
} from '../dto/boardsDto'
import { List } from '../entities/list'
import { Task } from '../entities/task'
import { userRepository } from './userRepository'
import { HttpException } from '../common/httpException'

type BoardWithCounts = Board & { listsCount: number; tasksCount: number }
export async function getBoardsWithCount(): Promise<BoardWithCounts[]> {
  return (await getRepository(Board)
    .createQueryBuilder('board')
    .loadRelationCountAndMap('board.listsCount', 'board.lists')
    .loadRelationCountAndMap('board.tasksCount', 'board.lists.tasks')
    .getMany()) as BoardWithCounts[]
}

export async function getBoardById(id: number): Promise<Board | undefined> {
  return await getRepository(Board)
    .createQueryBuilder('board')
    .where(`board.id = ${id}`)
    .leftJoinAndMapMany('board.lists', List, 'list', 'list.boardId = board.id')
    .leftJoinAndMapMany('list.tasks', Task, 'task', 'task.listId = list.id')
    .getOne()
}

export async function deleteBoardById(id: number): Promise<void> {
  const board = await getRepository(Board).findOne(id)

  if (!board) {
    throw new HttpException(404, 'not found')
  }

  await Board.softRemove(board)
}

export async function createBoard(boardDto: CreateBoardDto): Promise<any> {
  const user = await userRepository.GetUserById(1)

  if (!user) {
    throw new HttpException(404, 'not found')
  }

  const result = await createQueryBuilder()
    .insert()
    .into(Board)
    .values({
      title: boardDto.title,
      description: boardDto.description,
      user: user,
    })
    .returning('*')
    .execute()

  return result.raw[0]
}

export async function updateBoard(
  id: number,
  boardDto: UpdateBoardDto
): Promise<any> {
  const result = await getRepository(Board)
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

  return result.raw[0]
}
