import { getRepository } from 'typeorm'
import { User } from '../entities/user'

export async function getUserById(id: number): Promise<User | undefined> {
  return await getRepository(User).findOne(id)
}

export async function createUser(user: User): Promise<void> {
  await getRepository(User).save(user)
}
