import { Board } from '../entities/board'
import { createQueryBuilder, getRepository } from 'typeorm'
import {
  CreateBoardDto,
  UpdateBoardDto,
  UpdatedBoardDto,
} from '../dto/boardsDto'
import { List } from '../entities/list'
import { Task } from '../entities/task'
import { HttpException } from '../common/httpException'

type BoardWithCounts = Board & { listsCount: number; tasksCount: number }
export async function getBoardsWithCount(
  userId: number
): Promise<BoardWithCounts[]> {
  return (await getRepository(Board)
    .createQueryBuilder('board')
    .select('board.*')
    .addSelect('count(distinct lists.id)', 'listsCount')
    .addSelect('count(tasks.id)', 'tasksCount')
    .leftJoin('board.lists', 'lists')
    .leftJoin('lists.tasks', 'tasks')
    .where('board.user = :userId', { userId })
    .groupBy('board.id')
    .getRawMany()) as BoardWithCounts[]
}

export async function getBoardById(
  id: number,
  userId: number
): Promise<Board | undefined> {
  return await getRepository(Board)
    .createQueryBuilder('board')
    .leftJoinAndSelect('board.lists', 'lists')
    .leftJoinAndSelect('lists.tasks', 'tasks')
    .where(`board.id = :id`, { id })
    .andWhere('board.user = :userId', { userId })
    .getOne()
}

export async function deleteBoardById(board: Board): Promise<void> {
  await Board.softRemove(board)
}

export async function createBoard(board: Board): Promise<Board> {
  return await getRepository(Board).save(board)
}

export async function updateBoard(board: Board): Promise<Board> {
  return await getRepository(Board).save(board)
}
