import { getRepository } from 'typeorm'
import { User } from '../entities/user'

export class userRepository {
  static async GetUserById(id: number): Promise<User | undefined> {
    return await getRepository(User).findOne(1)
  }
}
