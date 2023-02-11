import { getRepository } from 'typeorm'
import { HttpException } from '../common/httpException'
import { SignUpDto } from '../dto/userDto'
import { User } from '../entities/user'
import bcrypt from 'bcrypt'
import { settings } from '../common/settings'
import * as userRepository from '../repositories/userRepository'

export async function signUp(userDto: SignUpDto): Promise<void> {
  const existingUser = await getRepository(User)
    .createQueryBuilder('user')
    .where('username = :username', { username: userDto.username })
    .orWhere('login = :login', { login: userDto.login })
    .getOne()

  if (existingUser) {
    throw new HttpException(400, 'Username or login already exists')
  }

  const passwordHash = await bcrypt.hash(userDto.password, settings.saltRounds)

  const user = new User({
    username: userDto.username,
    login: userDto.login,
    password: passwordHash,
  })

  await userRepository.createUser(user)
}
