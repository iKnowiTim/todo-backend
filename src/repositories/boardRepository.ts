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
    .select('board.*')
    .addSelect('count(distinct lists.id)', 'listsCount')
    .addSelect('count(tasks.id)', 'tasksCount')
    .leftJoin('board.lists', 'lists')
    .leftJoin('lists.tasks', 'tasks')
    .groupBy('board.id')
    .getRawMany()) as BoardWithCounts[]
}

export async function getBoardById(id: number): Promise<Board | undefined> {
  return await getRepository(Board)
    .createQueryBuilder('board')
    .leftJoinAndSelect('board.lists', 'lists')
    .leftJoinAndSelect('lists.tasks', 'tasks')
    .where(`board.id = :id`, { id })
    .getOne()
}

export async function deleteBoardById(board: Board): Promise<void> {
  await Board.softRemove(board)
}

export async function createBoard(boardDto: CreateBoardDto): Promise<Board> {
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
): Promise<Board> {
  const result = await getRepository(Board)
    .createQueryBuilder()
    .update(Board)
    .set({
      title: boardDto.title,
      description: boardDto.description,
      updatedAt: new Date(),
    })
    .where(`id = :id`, { id })
    .returning('*')
    .execute()

  return result.raw[0]
}
