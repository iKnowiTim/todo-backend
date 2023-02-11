import { getRepository } from 'typeorm'
import { User } from '../entities/user'

export async function getUserById(id: number): Promise<User | undefined> {
  return await getRepository(User).findOne(1)
}

export async function createUser(user: User): Promise<void> {
  await getRepository(User).save(user)
}
