import { getRepository } from 'typeorm'
import { HttpException } from '../common/httpException'
import {
  LoginDto,
  PayloadDto,
  SignUpDto,
  TokenDto,
  UserDto,
} from '../dto/userDto'
import { User } from '../entities/user'
import bcrypt from 'bcrypt'
import { settings } from '../common/settings'
import * as userRepository from '../repositories/userRepository'
import * as jwt from 'jsonwebtoken'
import { logger } from '../common/logger'

export async function signUp(userDto: SignUpDto): Promise<void> {
  const userExisting = await checkUserExistsSignUp(userDto)

  if (userExisting) {
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

export async function login(userDto: LoginDto): Promise<TokenDto> {
  const user = await checkUserExistsLogin(userDto)

  if (!user) {
    throw new HttpException(400, 'Login or password entered incorrectly')
  }

  const passwordValid = await bcrypt.compareSync(
    userDto.password,
    user.password
  )

  if (!passwordValid) {
    throw new HttpException(400, 'Incorrect password')
  }

  const token = generateAccessToken(user.id, user.username)
  return {
    token,
  }
}

export async function me(payloadDto: PayloadDto): Promise<UserDto> {
  const user = await userRepository.getUserById(payloadDto.id)

  if (!user) {
    logger.error(user)
    throw new HttpException(500, 'Server error', {
      id: payloadDto.id,
    })
  }

  return {
    id: user.id,
    username: user.username,
    login: user.login,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

async function checkUserExistsSignUp(
  userDto: SignUpDto
): Promise<User | undefined> {
  return await getRepository(User)
    .createQueryBuilder('user')
    .where('username = :username', { username: userDto.username })
    .orWhere('login = :login', { login: userDto.login })
    .getOne()
}

async function checkUserExistsLogin(
  userDto: LoginDto
): Promise<User | undefined> {
  return await getRepository(User)
    .createQueryBuilder('user')
    .where('login = :login', { login: userDto.login })
    .getOne()
}

function generateAccessToken(id: number, username: string): string {
  const payload = {
    id,
    username,
  }

  return jwt.sign(payload, settings.secretKey, { expiresIn: '24h' })
}
